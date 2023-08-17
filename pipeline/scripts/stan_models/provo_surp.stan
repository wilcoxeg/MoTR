// generated with brms 2.19.0
functions {
  
}
data {
  int<lower=1> N; // total number of observations -- 2250
  vector[N] Y; // response variable
  // data for splines
  int Ks; // number of linear effects
  matrix[N, Ks] Xs; // design matrix for the linear effects
  // data for spline s(surp, bs = "cr", k = 6)
  int nb_1; // number of bases
  array[nb_1] int knots_1; // number of knots
  // basis function matrices
  matrix[N, knots_1[1]] Zs_1_1;
  // data for spline s(prev_surp, bs = "cr", k = 6)
  int nb_2; // number of bases
  array[nb_2] int knots_2; // number of knots
  // basis function matrices
  matrix[N, knots_2[1]] Zs_2_1;
  // data for spline t2(freq, len, bs = "cr")
  int nb_3; // number of bases
  array[nb_3] int knots_3; // number of knots
  // basis function matrices
  matrix[N, knots_3[1]] Zs_3_1;
  matrix[N, knots_3[2]] Zs_3_2;
  matrix[N, knots_3[3]] Zs_3_3;
  // data for spline t2(prev_freq, prev_len, bs = "cr")
  int nb_4; // number of bases
  array[nb_4] int knots_4; // number of knots
  // basis function matrices
  matrix[N, knots_4[1]] Zs_4_1;
  matrix[N, knots_4[2]] Zs_4_2;
  matrix[N, knots_4[3]] Zs_4_3;
  int prior_only; // should the likelihood be ignored?
}
transformed data {
  
}
parameters {
  real Intercept; // temporary intercept for centered predictors
  vector[Ks] bs; // spline coefficients
  // parameters for spline s(surp, bs = "cr", k = 6)
  // standarized spline coefficients
  vector[knots_1[1]] zs_1_1;
  real<lower=0> sds_1_1; // standard deviations of spline coefficients
  // parameters for spline s(prev_surp, bs = "cr", k = 6)
  // standarized spline coefficients
  vector[knots_2[1]] zs_2_1;
  real<lower=0> sds_2_1; // standard deviations of spline coefficients
  // parameters for spline t2(freq, len, bs = "cr")
  // standarized spline coefficients
  vector[knots_3[1]] zs_3_1;
  // standarized spline coefficients
  vector[knots_3[2]] zs_3_2;
  // standarized spline coefficients
  vector[knots_3[3]] zs_3_3;
  real<lower=0> sds_3_1; // standard deviations of spline coefficients
  real<lower=0> sds_3_2; // standard deviations of spline coefficients
  real<lower=0> sds_3_3; // standard deviations of spline coefficients
  // parameters for spline t2(prev_freq, prev_len, bs = "cr")
  // standarized spline coefficients
  vector[knots_4[1]] zs_4_1;
  // standarized spline coefficients
  vector[knots_4[2]] zs_4_2;
  // standarized spline coefficients
  vector[knots_4[3]] zs_4_3;
  real<lower=0> sds_4_1; // standard deviations of spline coefficients
  real<lower=0> sds_4_2; // standard deviations of spline coefficients
  real<lower=0> sds_4_3; // standard deviations of spline coefficients
  real<lower=0> shape; // shape parameter
}
transformed parameters {
  // actual spline coefficients
  vector[knots_1[1]] s_1_1;
  // actual spline coefficients
  vector[knots_2[1]] s_2_1;
  // actual spline coefficients
  vector[knots_3[1]] s_3_1;
  // actual spline coefficients
  vector[knots_3[2]] s_3_2;
  // actual spline coefficients
  vector[knots_3[3]] s_3_3;
  // actual spline coefficients
  vector[knots_4[1]] s_4_1;
  // actual spline coefficients
  vector[knots_4[2]] s_4_2;
  // actual spline coefficients
  vector[knots_4[3]] s_4_3;
  real lprior = 0; // prior contributions to the log posterior
  // compute actual spline coefficients
  s_1_1 = sds_1_1 * zs_1_1;
  // compute actual spline coefficients
  s_2_1 = sds_2_1 * zs_2_1;
  // compute actual spline coefficients
  s_3_1 = sds_3_1 * zs_3_1;
  // compute actual spline coefficients
  s_3_2 = sds_3_2 * zs_3_2;
  // compute actual spline coefficients
  s_3_3 = sds_3_3 * zs_3_3;
  // compute actual spline coefficients
  s_4_1 = sds_4_1 * zs_4_1;
  // compute actual spline coefficients
  s_4_2 = sds_4_2 * zs_4_2;
  // compute actual spline coefficients
  s_4_3 = sds_4_3 * zs_4_3;
  lprior += normal_lpdf(Intercept | 5.5, 0.5);
  lprior += normal_lpdf(bs | 0, 0.5);
  lprior += cauchy_lpdf(sds_1_1 | 0, 0.5) - 1 * cauchy_lccdf(0 | 0, 0.5);
  lprior += cauchy_lpdf(sds_2_1 | 0, 0.5) - 1 * cauchy_lccdf(0 | 0, 0.5);
  lprior += cauchy_lpdf(sds_3_1 | 0, 0.5) - 1 * cauchy_lccdf(0 | 0, 0.5);
  lprior += cauchy_lpdf(sds_3_2 | 0, 0.5) - 1 * cauchy_lccdf(0 | 0, 0.5);
  lprior += cauchy_lpdf(sds_3_3 | 0, 0.5) - 1 * cauchy_lccdf(0 | 0, 0.5);
  lprior += cauchy_lpdf(sds_4_1 | 0, 0.5) - 1 * cauchy_lccdf(0 | 0, 0.5);
  lprior += cauchy_lpdf(sds_4_2 | 0, 0.5) - 1 * cauchy_lccdf(0 | 0, 0.5);
  lprior += cauchy_lpdf(sds_4_3 | 0, 0.5) - 1 * cauchy_lccdf(0 | 0, 0.5);
  lprior += exponential_lpdf(shape | 3);
}
model {
  // likelihood including constants
  if (!prior_only) {
    // initialize linear predictor term
    vector[N] mu = rep_vector(0.0, N);
    mu += Intercept + Xs * bs + Zs_1_1 * s_1_1 + Zs_2_1 * s_2_1
          + Zs_3_1 * s_3_1 + Zs_3_2 * s_3_2 + Zs_3_3 * s_3_3 + Zs_4_1 * s_4_1
          + Zs_4_2 * s_4_2 + Zs_4_3 * s_4_3;
    mu = exp(mu);
    target += gamma_lpdf(Y | shape, shape ./ mu);
  }
  // priors including constants
  target += lprior;
  target += std_normal_lpdf(zs_1_1);
  target += std_normal_lpdf(zs_2_1);
  target += std_normal_lpdf(zs_3_1);
  target += std_normal_lpdf(zs_3_2);
  target += std_normal_lpdf(zs_3_3);
  target += std_normal_lpdf(zs_4_1);
  target += std_normal_lpdf(zs_4_2);
  target += std_normal_lpdf(zs_4_3);
}
generated quantities {
  // actual population-level intercept
  real b_Intercept = Intercept;
}


