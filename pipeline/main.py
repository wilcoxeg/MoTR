#!/usr/bin/env python3
"""
Computes reading measures based on fixation data
Call: python3 computeReadingMeasures.py
Working directory has to be top repository folder
"""
from pathlib import Path
import pandas as pd

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

    # file_divider = FileDivider("./pilot_data_3.csv", "./raw_data_divided/")
    # file_divider.divide_raw_file()

    # Step 2: preprocess the trial data file by splitting sentences into words and extract useful info from these files

    # # trial_Preprocessor = TrialDataPreprocessor("./trials/localCoherence_items.tsv", "./preprocessed_trialData")
    # trial_Preprocessor = TrialDataPreprocessor("./trials/provo_items.tsv", "./preprocessed_trialData")
    # trial_Preprocessor.split_sentence_into_words()
    # trial_Preprocessor.filtered_new_df()

    # Step 3: for each divided raw data file, merge the fixations, filter noises

    # input_paths_f = Path('./raw_data_divided').glob('*.csv')
    # output_path_f = Path('./fixations_merged/f160')
    # for input_path in input_paths_f:
    #     # print('I am working on :', input_path)
    #     # 70 -> threshold for fixation;
    #     # 35 for filtering space between line. -> change from 30 to 40 has big influences in filtering. More loose.
    #     objMerger = FixationMerger(input_path, output_path_f, 160)
    #     objMerger.sort_fixations_by_itemid()
    #     # objMerger.write_out_all_merged_fixations()
    #     objMerger.write_out_denoise_merged_fixations()

    # Step 4: for each merged fixation file, combine fixations to get linguistic features.

    # If deal with multiple experiment trial data together, to combine the trial data:
    # input_paths_trial_1 = Path('./preprocessed_trialData/filtered_preprocessed_localCoherence_items.csv')
    # input_paths_trial_2 = Path('./preprocessed_trialData/filtered_preprocessed_provo_items.csv')
    # df1 = pd.read_csv(input_paths_trial_1)
    # df2 = pd.read_csv(input_paths_trial_2)
    # combined_df = pd.concat([df1, df2])
    # combined_df.to_csv('./preprocessed_trialData/localCoherence_provo_combined.csv', index=False)

#     input_paths_trial = Path('./preprocessed_trialData/localCoherence_provo_combined.csv')
#     input_paths_l = Path('./fixations_merged/f160').glob('*_denoised.csv')
#     output_path_l = Path('./reading_measures/cleaned_f160')
# 
#     for input_path in input_paths_l:
#         print("I am working on: ", input_path)
#         # 70 is still the threshold for fixation --> the same as above but for different structure of experiment.
#         objFeatureExtractor = FeatureExtractor(input_paths_trial,
#                                                input_path,
#                                                output_path_l, 160)
#         objFeatureExtractor.check_comprehension_answer()
#         objFeatureExtractor.get_first_duration()
#         objFeatureExtractor.get_total_duration()
#         objFeatureExtractor.get_gaze_duration()
#         objFeatureExtractor.get_right_bounded_rt()
#         objFeatureExtractor.get_right_bounded_rt_manual()
#         objFeatureExtractor.get_go_pass_time()
#         objFeatureExtractor.get_binary()
#         objFeatureExtractor.write_out()
