transformed data
{
   real mu;
   real          lambda;
   real          alpha;
   real          beta;

   // parameters for normal gamma. change these as you need
   mu     <- -4.3;
   lambda <-  3.1;
   alpha  <-  1.1;
   beta   <-  0.5;
}
parameters
{
   real<lower=0> tau;
   real x;
}
transformed parameters
{
   real<lower=0> sigma;
   sigma <- 1/sqrt(tau*lambda);
}
model
{
   // This is supposed to behave like a normal-gamma distribution
   tau ~ gamma(alpha,beta);
   x   ~ normal(mu,sigma);
}
