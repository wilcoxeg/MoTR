data {
  int<lower=1> N;
  vector[2] x[N];
}

parameters {
  vector[2] xi; 
  vector<lower=0>[2] omega; 
  vector[2] alpha; 
  cholesky_factor_corr[2] L; 
}

// transformed parameters {
//     // Covariance matrix
//     cov_matrix[2] cov = diag_pre_multiply(omega, L);
// }

model {
  // prior
  target += normal_lpdf(xi[1]| 150, 50) - normal_lccdf(0 | 150, 50);
  target += normal_lpdf(xi[2]| 150, 50) - normal_lccdf(0 | 150, 50);
  target += cauchy_lpdf(omega[1] | 0, 3) - cauchy_lcdf(0 | 0, 3);
  target += cauchy_lpdf(omega[2] | 0, 3) - cauchy_lcdf(0 | 0, 3);
  target += normal_lpdf(alpha[1]| 0, 100);
  target += normal_lpdf(alpha[2]| 0, 100);
  target += lkj_corr_cholesky_lpdf(L | 1);
  
  // likelihood
  target += multi_normal_cholesky_lpdf(x | xi, diag_pre_multiply(omega, L)); 
  // for (i in 1:N)
  // target += normal_lcdf(dot_product(alpha, omega) | 150, 100); 
    for (i in 1:N)
  target += normal_lcdf(dot_product(alpha, x[i]) | 200, 50);
 
  
  // xi ~ normal(150, 50);
  // omega ~ cauchy(0, 3);
  // L ~ lkj_corr_cholesky(1);
  // alpha ~ normal(0, 100);
  
}

generated quantities {
  vector[2] x_rand; // Generated samples
  matrix[2,2] cov = diag_pre_multiply(omega, L);
  corr_matrix[2] rho = L * L';
  
  // Generate predictions for the data points
  x_rand = multi_normal_cholesky_rng(xi, cov);
}
