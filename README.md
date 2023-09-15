# Mouse Tracking for Reading (MoTR)
This repository contains necessary materials for implementing a Mouse tracking for Reading (MoTR) experiment, and for post-processing MoTR data to derive word-by-word reading measures. Additionally, the repository contains materials and scripts used in the two experiments reported in "Mouse Tracking for Reading: A New Naturalistic Incremental Processing Measurement".

The directory has the following structure:

```
└──motr
      ├── run_motr_in_magpie
          contains files necessary to implement MoTR in Magpie
      └── post_processing
          Constains postprocessing scripts to turn raw MoTR data into reading time measurements
└── experiments
      ├── attachment
          contains data necessary to run our attachment ambiguity experiments
      ├── provo
          contins data necessary to run our provo experiments
      └── scripts
          contains analysis scripts and images
```

## MoTR

### Running MoTR in Magpie

#### Contents
- `provo` contains the  codes (in subdirectory `src`) and the trial data (in subdirectory `trials`) for running a MoTR experiment for Provo.
- `attachment` contains the codes (in subdirectory `src`) and the trial data (in subdirectory `trials`) for running a MoTR experiment for attachment preference in English.

#### Workflow for Running a Basic MoTR Trial

The following workflow should enable you to run a MoTR experiment, locally, in your browser.

- Download Node.js v16.20.2 (in this [link](https://nodejs.org/en/download/releases)) and install.
- Clone this repository.
- Open a local terminal or IDE, navigate to MoTR/restructure/motr/run_motr_in_magpie/provo/ (or MoTR/restructure/motr/run_motr_in_magpie/attachment/).
- run ```npm install```.
- run ```npm run serve```.
- Click either of the links shown in the terminal starting with "-Local:" or "-Network:".
- Enjoy!

For more information about how to deploy Magpie experiments onto the web, and run them with human participants, please see the [Magpie documentation](https://magpie-experiments.org/). 

### Post Processing

#### Contents
- `postprocessing.py` is the main script to run which will take the command line interface arguments and post process the MoTR data.
- `utils` contains modules which will be used by `postprocessing.py`.
  - `divideCsv.py` can divide the large raw MoTR data file into separate files for different subjects, each containing their respective reading data. We assume you will get a csv file containing the data for multiple participants by running a MoTR experiment. 
  - `preprocessTrialData.py` preprocesses the trial data file by splitting sentences into words and extracting relevant information from these files. We assume that the items in your trial data are sentences, paragraphs or passages, rather than words. Otherwise, you don't need this step.
  - `mergeFixations.py` takes the divided raw data files and merges the adjacent data points into fixations if they are on the same words. It also filters out noise.
  - `extractLingusticFeatures.py` computes reading measures from fixations, including Gaze Duration, Total Duration, Go Past Time, First-Pass Regression Probability etc.
  - `tsv_csv_json_convert.py`  (specific to our experiments) is the script we used to convert the original trial data from Witzel et al., (2012) and Boyce et al., (2020) to a csv/tsv file which can then be used as input to magpie.
  - `trial_splits.py` is the script for breaking the large number of items into sub experiments for our attachment preference study, ensuring that same item under different conditions will not appear in the same sub experiment.

#### Running the Post Processing Pipeline

- Prepare your raw MoTR data. You can also access our raw data from this experiment, please [click on this link](https://osf.io/4g7pr/?view_only=d628c9fda891434bb9ad4aa13b5d21ab). 
  - Data can be a single MoTR reading data file or a folder containing multiple files. 
- Prepare your trial data.
  - Data can either be in its original form or preprocessed, with sentences already split into words. 
- Run the `postprocessing.py` script and specify customized paths for the resulting divided raw data, fixations, reading measures, and preprocessed trial data. 
  - If you do not specify your paths, they will be placed in the default directories (`./divided`,`./fixations`, `./reading_measures`, `./processed_trial`, respectively ). It is possible to set your own lower boundary and upper boundary to define a fixation. If not specified, it is **160 ms** and **4000 ms**, by default. We suggest that you check the sampling rate in the `experiments` folder before choosing the boundaries. For our two experiments, the sampling rate is **40 HZ**.
  - We provide some sample calls bellow.

 ```bash
 python3 postprocessing.py --in_file local_coherence_reading_data.csv --trial_file trials/localCoherence.tsv
 ```

 This call takes a raw MoTR data file called `local_coherence_reading_data.csv` and the trial item data `localCoherence.tsv` in the folder `trials`, output the divided raw data files, files for fixation sequences, files for reading measures and processed trial data file into `./divided`,`./fixations`, `./reading_measures`, `./processed_trial`, respectively.

 ```bash
 python3 postprocessing.py --in_file local_coherence_reading_data.csv --processed_trial_file trials/localCoherence_sent_region.csv
 ```

This call takes a raw MoTR data file called `local_coherence_reading_data.csv` and the already processed trial data `localCoherence_sent_region.csv` in the folder `trials`, output the divided raw data files, files for fixation sequences, files for reading measures into `./divided`,`./fixations`, `./reading_measures`, respectively.

```bash
python3 postprocessing.py --in_folder data --processed_trial_file trials/localCoherence_sent_region.csv
```

This call takes a folder which can contain multiple raw MoTR data files called `data` and the already processed trial data `localCoherence_sent_region.csv` in the folder `trials`, output the divided raw data files, files for fixation sequences, files for reading measures into `./divided`,`./fixations`, `./reading_measures`, respectively.

```bash
python3 postprocessing.py --in_file provo_reading_data.csv --trial_file trials/provo_items.tsv --divided_dir divide_by_reader --processed_trial_dir ../stimuli --fixation_dir fixations --rt_dir reading_metrics --low_thres 200 --up_thres 3000
```

This call takes a raw MoTR data file called `provo_reading_data.csv` and the trial item data `provo_items.tsv` in the folder `trials`, output the divided raw data files, files for fixation sequences, files for reading measures and processed trial data file into `./divide_by_reader`,`./fixations`, `./reading_metrics`, `../stimuli`, respectively. It will extract fixations ranging from 200 ms to 3000 ms.

```bash
python3 postprocessing.py --in_folder data2 --trial_file trials/provo_items.tsv --divided_dir divide_by_reader --fixation_dir fixations --rt_dir reading_metrics --low_thres 200 --up_thres 3000
```

This call takes a folder which can contain multiple raw MoTR data files called `data2` and the trial data file `provo_items.tsv` in the folder `trials`, output the divided raw data files, files for fixation sequences, files for reading measures into `./divide_by_reader`,`./fixations`, `./reading_metrics`, `../stimuli`, respectively. It will extract fixations ranging from 200 ms to 3000 ms.

## Experiments

### Provo

#### Data

- `provo_items.tsv` contains the materials for this experiment, i.e. the provo corpus broken down into its individual sections (one per row). This file also includes the comprehension questions, with their associated correct and incorreect responses.

- `provo_stats.tsv` contains by-word statistics for the provo corpus, including surprisal and frequency.

 - `provo_eyetracking.tsv` contains the raw eyetracking data for the provo corpus.

- `/results_f160/` contains the output of the postprocessing script, with results for each participant in separate files. For this file 160 milliseconds is the minimum threshold for a fixation duration.

- To access the raw data from this experiment, please [click on this link](https://osf.io/4g7pr/?view_only=d628c9fda891434bb9ad4aa13b5d21ab).

#### Scripts

- `correlation_analysis.Rmd` is R code to run the Bayesian correlation analysis, both to correlate eye tracking data with MoTR data, as well as to correlate each with various word-level properties (length, frequency, surprisal).

- `ranked_correlation_fpr_analysis.Rmd` is R code to run the ranked correlation analysis we use to compare MoTR first pass regression data with eye tracking first pass regression data.

- `surprial_motr_link_analysis.Rmd` is R code to run the cross methodological replication of Smith and Levy (2013), looking at the functional relationship between by-word MoTR reading times and by-word surprisal values.

##### Bayesian Models

- This folder contains fitted models from the various scripts in its parent directory. 

- `bayesian_models_correlation` contains the fitted models for correlations for MoTR and eye tracking, MoTR and word level statistical properties.

- `bayesian_models_surprisal` contains the fitted models for reading time slow down due to surprisal effects analysis.

##### Stan Models

- This folder contains the stan scripts used in its parent directory to model the correlations.

#### Visualizations

- Contains figures for the paper from the Provo experiment.

### Attachment

#### Data

- `/items/` contains the experimental items. These are broken down into our three sub-experiments, and the practice items which were shared across sub experiments. Each `.tsv` file in this directory contains experiment ID, condition ID, and text of each item, along with comprehension questions and the correct response.

- `/results_f160/` contains the output of the postprocessing script, with results for each participant in seperate files. For this file 160 milliseconds is the minimum threshold for a fixation duration.

- `a_maze.rds`, `g_maze.rds`, and `spr.rds` contain maze and self-paced reading data from Boyce et al., (2020), which we compare to MoTR data. Files were downloaded [from this repository.](https://github.com/vboyce/Maze/tree/master/experiment/Data/Processed).

- `witzel_eyetr_data` is a tabularized machine-readable version of the data presented in Tables 1-6 of Witzel et al., (2012), which reports eyetracking data for these same materials.

#### Scripts

- `analysis_attachment.Rmd` is R code to run Bayesian hierarchical models to study the by-item differences between high attachment and low attachment conditions.

- To access the Bayesian models from this experiment, please [click on this link](https://osf.io/4g7pr/?view_only=d628c9fda891434bb9ad4aa13b5d21ab).


#### Visualizations

- Contains figures for the paper from the attachment experiment.

