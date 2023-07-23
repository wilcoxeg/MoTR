data {
    int<lower=1> N;  // number of observations
    vector[2] x[N];  // input data: rows are observations, columns are the two variables
}

parameters {
    // real<lower=0> mu1;          // location of the t distribution for variable 1
    // real<lower=0> sigma1;       // scale of the t distribution for variable 1
    real<lower=0> alpha1;        // shape parameter of the Gamma distribution for variable 1
    real<lower=0> beta1;         // rate parameter of the Gamma distribution for variable 1
    real<lower=1> nu;           // degrees of freedom of the t distribution for variable 1
    real<lower=1> alpha2;        // shape parameter of the Gamma distribution for variable 2
    real<lower=1> beta2;         // rate parameter of the Gamma distribution for variable 2
    real<lower=-1, upper=1> rho;  // correlation coefficient
}

transformed parameters {
    // Covariance matrix
    matrix[2,2] cov;
    // cov[1,1] = sigma1 ^ 2;
    cov[1,1] = alpha1 / beta1^2;
    // cov[1,2] = sigma1 * sqrt(alpha / beta^2) * rho;
    // cov[2,1] = sigma1 * sqrt(alpha / beta^2) * rho;
    cov[1,2] = sqrt(alpha1 / beta1^2) * sqrt(alpha2 / beta2^2) * rho;
    cov[2,1] = sqrt(alpha1 / beta1^2) * sqrt(alpha2 / beta2^2) * rho;
    cov[2,2] = alpha2 / beta2^2;
}

model {
    // vector[2] mu = [mu1, alpha / beta]';
    vector[2] mu = [alpha1 / beta1, alpha2 / beta2]';
    
    // Likelihood
    x ~ multi_normal(mu, cov);
    x[:, 1] ~ gamma(alpha1, beta1);
    x[:, 2] ~ gamma(alpha2, beta2);

    // Noninformative priors on all parameters
    alpha1 ~ normal(0, 100);
    beta1 ~ normal(0, 100);
    nu ~ gamma(2, 0.1);
    alpha2 ~ normal(0, 10);
    beta2 ~ normal(0, 10);
    rho ~ uniform(-1, 1);
}

generated quantities {
    // Random samples from the estimated distributions (for assessment of fit)
    vector[2] x_rand; // Generated samples
    int attempt = 0;
    int max_attempts = 10;
    
    x_rand[1] = gamma_rng(alpha1, beta1);
    x_rand[2] = round(gamma_rng(alpha2, beta2) + 0.5);
    
    while ((x_rand[1] < 0 || x_rand[2] < 0) && attempt < max_attempts) {
        x_rand[1] = gamma_rng(alpha1, beta1);
        x_rand[2] = gamma_rng(alpha2, beta2);
        attempt += 1;
    }
    
    if (attempt == max_attempts) {
        x_rand[1] = 0;
        x_rand[2] = 0;
    }
}
