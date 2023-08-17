# Mouse Tracking for Reading (MoTR)

## MoTR

## Experiments

### Provo

#### Data

- `provo_items.tsv` contains the materials for this experiment, i.e. the provo corpus broken down into its individual sections (one per row). This file also includes the comprehension questions, with their associated correct and incorreect responses.

- `results_f160` contains the output of the postprocessing script, with results for each participant in seperate files. For this file 160 milliseconds is the minimum threshold for a fixation duration.

- To access the raw data from this experiment, please [click on this link](link-to-raw-data). __TODO: Create OSF repository with raw data__

#### Scripts

- `correlation_analysis.Rmd` is R code to run the Bayesian correlation analysis, both to correlate eye tracking data with MoTR data, as well as to correlate each with various word-level properties (length, frequency, surprisal)

- `ranked_correlation_fpr_analysis.Rmd` is R code to run the ranked correlation analysis we use to compare MoTR first pass regression data with eye tracking first pass regression data.

- `surprial_motr_link_analysis.Rmd` is R code to run the cross methodological replication of Smith and Levy (2013), looking at the functional relationship between by-word MoTR reading times and by-word surprisal values.

##### Bayesian Models

- This folder contains fitted models from the various scripts in its parent directory. __TODO: Add in the necessary models here (can also add in Stan models if we like)__

#### Visualizations

- Contains figures for the paper from the Provo experiment

### Attachment