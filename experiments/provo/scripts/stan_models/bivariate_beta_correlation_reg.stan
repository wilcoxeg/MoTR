data {
    int<lower=1> N;   // Number of observations
    vector<lower=0, upper=1>[2] x[N]; // Data
}

parameters {
    vector<lower=0>[2] alpha;
    vector<lower=0>[2] beta;
    cholesky_factor_corr[2] L;
}

transformed parameters {
    vector<lower=0>[2] mu = exp(alpha);
    vector<lower=0>[2] sigma = exp(beta);
    corr_matrix[2] rho = L * L';
    matrix[2, 2] Sigma;

    Sigma[1, 1] = square(sigma[1]);
    Sigma[2, 2] = square(sigma[2]);
    Sigma[1, 2] = rho[1, 2] * sigma[1] * sigma[2];
    Sigma[2, 1] = Sigma[1, 2];  // ensure Sigma is symmetric
}

model {
    // Non-informative priors for parameters
    alpha ~ normal(0, 1); // for motr
    beta ~ normal(0, 1);  // for motr
    // alpha ~ normal(10, 1);
    // beta ~ normal(0, 1);
    L ~ lkj_corr_cholesky(1);  // for motr
    // L ~ lkj_corr_cholesky(0.8);

    // The Beta distributions for datasets
    x[:, 1] ~ beta(alpha[1], beta[1]);
    x[:, 2] ~ beta(alpha[2], beta[2]);

    // Capture correlation in the shapes of Beta distributions
    alpha ~ multi_normal_cholesky(mu, L);
}

generated quantities {
    vector[2] x_rand; // Generated samples
    x_rand[1] = beta_rng(alpha[1], beta[1]);  // draw from beta distribution for dataset 1
    x_rand[2] = beta_rng(alpha[2], beta[2]);  // draw from beta distribution for dataset 2
}
