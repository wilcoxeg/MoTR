# Mouse Tracking for Reading (MoTR)

Mouse Tracking for Reading is a new method for incremental processing measurement. In a MoTR study participants are presented with a text that is blurred, except for a small region around the tip of the mouse, which is in focus. The participant is instructed to move the mouse in order to reveal and read the text. Participant mouse location is recorded, and analyzed similarly to gaze coordinates obtained with eye tracking.

## Experiments Implementation

### Attachment Preference Study:
#### https://wilcoxeg.github.io/MoTR/experiments/motr-localCoherence/

We validated the MoTR paradigm in two suites of experiments. 
In the first suite of experiments we assessed MoTR ’s ability to replicate previous findings in controlled psycholinguistics experiments, using the material for studying attachment preference in English that have been used to compare Maze, SPR and eye tracking [Witzel et al., 2012 ](https://www.infona.pl/resource/bwmeta1.element.springer-a0eade60-6d60-3340-ac43-051227e7c69a) as well as  Maze and SPR [Boyce et al., 2020](https://www.sciencedirect.com/science/article/pii/S0749596X19301147).

### Provo Study:
#### https://wilcoxeg.github.io/MoTR/experiments/motr-provo/

we collected MoTR data for a corpus of written English texts (the Provo Corpus; [Luke and Christianson, 2018](https://link.springer.com/article/10.3758/s13428-017-0908-4)) to test whether MoTR can be used to investigate naturalistic reading in
English.

### Pilot Study:
#### https://wilcoxeg.github.io/MoTR/experiments/motr-pilot/

We ran a pilot study which consisted of a subset of items from the two studies. 

### SB-SAT Study (an example of a more flexible implementation):
#### https://wilcoxeg.github.io/MoTR/experiments/motr-SB-SAT/

Since the three implementations above present one paragraph per screen and ask one comprehension question after each paragraph, we also provide an implementation where multiple paragraphs are presented together on one screen. Participants read the passages across multiple screens and answer several comprehension questions afterward. We used the same items as in [Ahn et al.](https://dl.acm.org/doi/10.1145/3379156.3391335).

### Running the Experiment
1. Online link: By clicking the link provided alongside each experiment description, you can try them. 
2. Offline: Clone the repository, navigate to the directory for the experiment, run `npm install` and `npm run serve`. For more detail, please check [Magpie manual](https://magpie-experiments.org/00_getting_started/01_installation/#creating-a-project).
3. Save your results locally: If you want to see the results of the experiment, before running the experiment offline, please go to the directory and open the `magpie.config.js` under `src`, change the value of `mode` from `'prolific'` to `'debug'` or `'directLink'`.

## Post Processing

### Description
The post-processing involves four steps:
1. Divide the large raw MoTR data file into separate files for different readers, each containing their respective reading data. We assume you will get a csv file containing the data for multiple participants by running these experiments. 
2. Preprocessing the trial data file by splitting sentences into words and extracting relevant information from these files. We assume that the items in your trial data are sentences, paragraphs or passages, rather than words. Otherwise, you don't need this step.
3. For each divided raw data file in step 1, we merge the adjacent data points into fixations if they are on the same words, and filter noises.
4. Compute the common reading measures from fixations, such as Gaze Duration, Total Duration, Go Past Time, First-Pass Regression Probability etc.

### Running the Post Processing Pipeline

To run the post-processing pipeline, you will need to provide either a single MoTR reading data file or a folder containing multiple files. Additionally, you should have your trial data available, which can either be in its original form or preprocessed, with sentences already split into words. 

By default, the resulting divided raw data, fixations, reading measures, and preprocessed trial data will be placed in their respective default directories if you do not specify customized paths for them (`./divided`,`./fixations`, `./reading_measures`, `./processed_trial`, respectively ). You could set your own lower boundary and upper boundary to define a fixation, if not specified, it is **160 ms** and **4000 ms**, by default. We suggest that you check the sampling rate in the `experiments` folder before choosing the boundaries. For our study, the sampling rate is **40 HZ**.

 We provide some sample calls for you to follow.

 ```python3 postprocessing.py --in_file local_coherence_reading_data.csv --trial_file trials/localCoherence.tsv```

 Please replace `local_coherence_reading_data.csv` with the path to your MoTR reading data file and replace `trials/localCoherence.tsv` with the path to your original trial data file.

 ```python3 postprocessing.py --in_file local_coherence_reading_data.csv --processed_trial_file trials/localCoherence_sent_region.csv```

Please replace `local_coherence_reading_data.csv` with the path to your MoTR reading data file and replace `trials/localCoherence_sent_region.csv` with the path to your preprocessed trial data file.

```python3 postprocessing.py --in_folder data --processed_trial_file trials/localCoherence_sent_region.csv```

Please replace `data` with the path to the folder where your MoTR reading data files are stored and replace `trials/localCoherence_sent_region.csv` with the path to your preprocessed trial data file.

```python3 postprocessing.py --in_file provo_reading_data.csv --trial_file trials/provo_items.tsv --divided_dir divide_by_reader --processed_trial_dir ../stimuli --fixation_dir fixations --rt_dir reading_metrics --low_thres 200 --up_thres 3000```

Read one single file, store the results to specific directories and define your own thresholds for fixations.

```python3 postprocessing.py --in_folder data2 --trial_file trials/provo_items.tsv --divided_dir divide_by_reader --fixation_dir fixations --rt_dir reading_metrics --low_thres 200 --up_thres 3000```

Process multiple files in one folder and have customized paths for storing results and for defining fixations.

