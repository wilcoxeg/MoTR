# Mouse Tracking for Reading (MoTR)

## MoTR

## Experiments

### Provo

#### Data

- `provo_items.tsv` contains the materials for this experiment, i.e. the provo corpus broken down into its individual sections (one per row). This file also includes the comprehension questions, with their associated correct and incorreect responses.

- `provo_stats.tsv` contains by-word statistics for the provo corpus, including surprisal and frequency.

 - `provo_eyetracking.tsv` contains the raw eyetracking data for the provo corpus.

- `/results_f160/` contains the output of the postprocessing script, with results for each participant in separate files. For this file 160 milliseconds is the minimum threshold for a fixation duration.

- To access the raw data from this experiment, please [click on this link](https://osf.io/4g7pr/?view_only=d628c9fda891434bb9ad4aa13b5d21ab). __TODO: need more info on OSF__

#### Scripts

- `correlation_analysis.Rmd` is R code to run the Bayesian correlation analysis, both to correlate eye tracking data with MoTR data, as well as to correlate each with various word-level properties (length, frequency, surprisal)

- `ranked_correlation_fpr_analysis.Rmd` is R code to run the ranked correlation analysis we use to compare MoTR first pass regression data with eye tracking first pass regression data.

- `surprial_motr_link_analysis.Rmd` is R code to run the cross methodological replication of Smith and Levy (2013), looking at the functional relationship between by-word MoTR reading times and by-word surprisal values.

##### Bayesian Models

- This folder contains fitted models from the various scripts in its parent directory. 

- `bayesian_models_correlation` contains the fitted models for correlations for MoTR and eye tracking, MoTR and word level statistical properties.

- `bayesian_models_surprisal` contains the fitted models for reading time slow down due to surprisal effects analysis.

##### Stan Models

- This folder contains the stan scripts used in its parent directory to model the correlations.

#### Visualizations

- Contains figures for the paper from the Provo experiment

### Attachment

#### Data

- `/items/` contains the experimental items. These are broken down into our three sub-experiments, and the practice items which were shared across sub experiments. Each `.tsv` file in this directory contains experiment ID, condition ID, and text of each item, along with comprehension questions and the correct response.

- `/results_f160/` contains the output of the postprocessing script, with results for each participant in seperate files. For this file 160 milliseconds is the minimum threshold for a fixation duration.

- `a_maze.rds`, `g_maze.rds`, and `spr.rds` contain maze and self-paced reading data from Boyce et al., (2020), which we compare to MoTR data. Files were downloaded [from this repository.](https://github.com/vboyce/Maze/tree/master/experiment/Data/Processed)

- `witzel_eyetr_data` is a tabularized machine-readable version of the data presented in Tables 1-6 of Witzel et al., (2012), which reports eyetracking data for these same materials.

#### Scripts

##### Bayesian Models

#### Visualizations


