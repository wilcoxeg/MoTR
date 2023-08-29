# Mouse Tracking for Reading (MoTR)
This repository contains necessary materials for implementing a Mouse tracking for Reading (MoTR) experiment, and for post-processing MoTR data to derive word-by-word reading measures. Additionally, the repository contains materials and scripts used in the two experiments reported in "Mouse Tracking for Reading: A New Naturalistic Incremental Processing Measurement"

The directory has the following structure:

* MoTR
  * Running MoTR in Magpie
    * Contains: Any files necessary to implement MoTR in Magpie
  * Post Processing
    * Contains: All of our post-processing scripts
* Restructure/Experiments
    * attachment
      * Contains: Data necessary for running the attachment ambiguity experiments
    * provo
      * Contains: Data necessary for running the provo experiments
    * scripts
      * Contains: Scripts, images, etc.


## MoTR
### Running MoTR in Magpie
#### Contents
- `provo` contains the  codes (in subdirectory `src`) and the trial data (in subdirectory `trials`) for running a MoTR experiment for Provo.
- `attachment` contains the codes (in subdirectory `src`) and the trial data (in subdirectory `trials`) for running a MoTR experiment for attachment preference in English.

#### Workflow for Running a Basic MoTR Trial
- Download Node.js v16.20.2 (in this [link](https://nodejs.org/en/download/releases)) and install
- Clone the repository
- Open a local terminal or IDE, navigate to MoTR/experiments/provo/ (or MoTR/experiments/attachment/)
- run ```npm install```
- run ```npm run serve```
- Click either of the links shown in the terminal starting with "-Local:" or "-Network:"
- Enjoy!

### Post Processing

#### Contents
- `postprocessing.py` is the main script to run which will take the command line interface arguments and post process the MoTR data.
- `utils` contains modules which will be used by `postprocessing.py`
  - `divideCsv.py` can divide the large raw MoTR data file into separate files for different readers, each containing their respective reading data. We assume you will get a csv file containing the data for multiple participants by running a MoTR experiment. 
  - `preprocessTrialData.py` preprocesses the trial data file by splitting sentences into words and extracting relevant information from these files. We assume that the items in your trial data are sentences, paragraphs or passages, rather than words. Otherwise, you don't need this step.
  - `mergeFixations.py` takes the divided raw data files and merge the adjacent data points into fixations if they are on the same words, and filter noises.
  - `extractLingusticFeatures.py` compute the common reading measures from fixations, such as Gaze Duration, Total Duration, Go Past Time, First-Pass Regression Probability etc.
  - `tsv_csv_json_convert.py` is the script we used to convert the original trial data from Witzel et al., (2012) and Boyce et al., (2020) to a csv/tsv file which can then be used as input to magpie.
  - `trial_splits.py` is the script for breaking the large number of items into three sub experiments for attachment preference study, ensuring that same item under different conditions will not appear in one sub experiment.

#### Running the Post Processing Pipeline

To run the post-processing pipeline, you will need to provide either a single MoTR reading data file or a folder containing multiple files. Additionally, you should have your trial data available, which can either be in its original form or preprocessed, with sentences already split into words. 

By default, the resulting divided raw data, fixations, reading measures, and preprocessed trial data will be placed in their respective default directories if you do not specify customized paths for them (`./divided`,`./fixations`, `./reading_measures`, `./processed_trial`, respectively ). You could set your own lower boundary and upper boundary to define a fixation, if not specified, it is **160 ms** and **4000 ms**, by default. We suggest that you check the sampling rate in the `experiments` folder before choosing the boundaries. For our study, the sampling rate is **40 HZ**.

 We provide some sample calls for you to follow.

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

