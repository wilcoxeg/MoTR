#!/usr/bin/env python3
"""
Computes reading measures based on raw mouse tracking for reading (MoTR) data

sample call:
python3 postprocessing.py --in_file local_coherence_1.csv --trial_file trials/localCoherence.tsv
python3 postprocessing.py --in_file local_coherence_31.csv --processed_trial_file trials/localCoherence_sent_region.csv
python3 postprocessing.py --in_folder data --processed_trial_file trials/localCoherence_sent_region.csv
python3 postprocessing.py --in_file provo_full_1.csv --trial_file trials/provo_items.tsv --divided_dir divide_by_reader --processed_trial_dir stimuli --fixation_dir fixations --rt_dir reading_metrics --low_thres 200 --up_thres 3000
python3 postprocessing.py --in_folder data2 --trial_file trials/provo_items.tsv --divided_dir divide_by_reader --fixation_dir fixations --rt_dir reading_metrics --low_thres 200 --up_thres 3000

Working directory has to be in the folder of `pipeline`
"""

import logging
from pathlib import Path
from argparse import ArgumentParser, ArgumentTypeError

from utils.divideCsv import FileDivider
from utils.mergeFixations import FixationMerger
from utils.preprocessTrialData import TrialDataPreprocessor
from utils.extractLingusticFeatures import FeatureExtractor

def get_cli() -> ArgumentParser:
    """Command line interface that allows the user to post process their MoTR data."""
    parser = ArgumentParser("Postprocess",
                            description="Post process the raw MoTR reading data")
    # input file or folder
    parser.add_argument('--in_file',
                        type=str,
                        help="The csv file containing MoTR reading data from multiple participants.")
    parser.add_argument('--in_folder',
                        type=str,
                        help="The fold containing csv files for MoTR reading data from multiple participants.")
    parser.add_argument('--trial_file',
                        type=str,
                        help="The file containing trial infos in their original form, e.g. items in the form of sentences, comprehension questions, etc.")
    parser.add_argument('--processed_trial_file',
                        type=str,
                        help="The file containing preprocessed trial infos, e.g. items divided into tokens, comprehension questions, etc.")
    # processed data folder
    parser.add_argument('--divided_dir',
                        type=str,
                        default="./divided",
                        help="The path to store the divided files for each participants.")
    parser.add_argument('--processed_trial_dir',
                        type=str,
                        default="./processed_trial",
                        help="The path to store the processed trial file.")
    parser.add_argument('--fixation_dir',
                        type=str,
                        default="./fixations",
                        help="The path to store the fixations for each participants.")
    parser.add_argument('--rt_dir',
                        type=str,
                        default="./reading_measures",
                        help="The path to store the reading measures for each participants.")
    parser.add_argument('--low_thres',
                        type=int,
                        default=160,
                        help="The lower threshold defining a fixation.")
    parser.add_argument('--up_thres',
                        type=int,
                        default=4000,
                        help="The upper threshold defining a fixation.")
    return parser

# Set up logging configuration
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def main():
    print('Welcome!')
    # Get the command-line arguments
    parser = get_cli()
    args = parser.parse_args()

    # Log the provided arguments
    logging.debug(f'Provided arguments: {args}')

    # Step 1: divide the raw data file to separate files for different participants by calling FileDivider

    # Check if either 'in_file' or 'in_folder' arguments are provided
    if not args.in_file and not args.in_folder:
        raise ArgumentTypeError("One of 'in_file' or 'in_folder' arguments should be provided.")
    # Process input files if 'in_folder' argument is provided
    if args.in_folder:
        input_files = Path(args.in_folder).glob('*.csv')
        for raw_file in input_files:
            file_divider = FileDivider(raw_file, Path(args.divided_dir))
            file_divider.divide_raw_file()
    else:
        # Process single input file if 'in_file' argument is provided
        raw_file = Path(args.in_file)
        file_divider = FileDivider(raw_file, Path(args.divided_dir))
        file_divider.divide_raw_file()

    # Step 2: preprocess the trial data file by splitting sentences into words and extract useful info from these files

    if not args.trial_file and not args.processed_trial_file:
        raise ArgumentTypeError("One of 'trial_file' or 'processed_trial_file' arguments should be provided.")
    # Make 'processed_trial_file' a Path obj if 'processed_trial_file' argument is provided
    if args.processed_trial_file:
        input_trial_path = Path(args.processed_trial_file)
    else:
        # Preprocess trial data if 'trial_file' argument is provided
        trial_preprocessor = TrialDataPreprocessor(args.trial_file, args.processed_trial_dir)
        trial_preprocessor.split_sentence_into_words()
        trial_preprocessor.filtered_new_df()
        input_trial_path = Path(f'{args.processed_trial_dir}/filtered_preprocessed_{Path(args.trial_file).stem}.csv')

    # Step 3: for each divided raw data file, merge the fixations, filter noises

    input_data_paths = Path(args.divided_dir).glob('*.csv')
    output_fixation_path = Path(args.fixation_dir)
    for input_path in input_data_paths:
        print('I am identifying fixations for :', input_path)
        obj_merger = FixationMerger(input_path, output_fixation_path, args.low_thres, args.up_thres)
        obj_merger.sort_fixations_by_itemid()
        # obj_merger.write_out_all_merged_fixations()
        obj_merger.write_out_denoise_merged_fixations()

    # Step 4: for each merged fixation file, combine fixations to get linguistic features.

    input_fixation_paths = output_fixation_path.glob('*_clean.csv')
    output_rt_path = Path(args.rt_dir)
    for input_fixation_path in input_fixation_paths:
        print("I am computing reading measures for : ", input_fixation_path)
        obj_feature_extractor = FeatureExtractor(input_trial_path,
                                            input_fixation_path,
                                            output_rt_path, args.low_thres)
        if not obj_feature_extractor.input_df_f.empty:
            obj_feature_extractor.check_comprehension_answer()
            obj_feature_extractor.get_first_duration()
            obj_feature_extractor.get_total_duration()
            obj_feature_extractor.get_gaze_duration()
            obj_feature_extractor.get_right_bounded_rt()
            obj_feature_extractor.get_go_past_time()
            obj_feature_extractor.get_binary()
            obj_feature_extractor.write_out()


if __name__ == '__main__':
    try:
        main()
    except ArgumentTypeError as error:
        logging.error(f"Error: {str(error)}")
