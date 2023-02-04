#!/usr/bin/env python3
"""
Computes reading measures based on fixation data
Call: python3 computeReadingMeasures.py
Working directory has to be top repository folder
"""
from pathlib import Path

from scripts.divideCsv import FileDivider
from scripts.mergeFixations import FixationMerger
from scripts.preprocessTrialData import TrialDataPreprocessor
from scripts.extractLingusticFeatures import FeatureExtractor


def get_first_fixation():
    pass


def get_gaze_duration():
    pass


def get_total_duration():
    pass


if __name__ == '__main__':
    print('Welcome!')

    # Step 1: divide the raw data file to separate files for different participants by calling FileDivider
    # file_divider = FileDivider("./mouse_tracking_test.csv", "./raw_data_divided/")
    # file_divider.divide_raw_file()

    # Step 2: preprocess the trial data file by splitting sentences into words and extract useful info from these files
    # trial_Preprocessor = TrialDataPreprocessor("./localCoherences.csv", "./preprocessed_trialData")
    # trial_Preprocessor.split_sentence_into_words()
    # trial_Preprocessor.filtered_new_df()

    # Step 3: for each divided raw data file, merge the fixations, filter noises
    # input_paths_f = Path('./raw_data_divided').glob('*.csv')
    # output_path_f = Path('./fixations_merged')
    # for input_path in input_paths_f:
    #     objMerger = FixationMerger(input_path, output_path_f, 100)
    #     objMerger.sort_fixations_by_itemid()
    #     # objMerger.write_out_all_merged_fixations()
    #     objMerger.write_out_denoise_merged_fixations()

    # Step 4: for each merged fixation file, combine fixations to get linguistic features.
    input_paths_trial = Path('./preprocessed_trialData/filtered_preprocessed_trial_data.csv')
    input_paths_l = Path('./fixations_merged').glob('*_denoise.csv')
    output_path_l = Path('./reading_measures')
    for input_path in input_paths_l:
        print("I am working on: ", input_path)
        objFeatureExtractor = FeatureExtractor(input_paths_trial,
                                               input_path,
                                               output_path_l, 150)
        objFeatureExtractor.check_comprehension_answer()
        objFeatureExtractor.get_first_duration()
        objFeatureExtractor.get_total_duration()
        objFeatureExtractor.get_gaze_duration()
        objFeatureExtractor.get_right_bounded_rt()
        # objFeatureExtractor.get_right_bounded_rt_manual()
        objFeatureExtractor.get_go_pass_time()
        objFeatureExtractor.get_binary()
        objFeatureExtractor.write_out()


