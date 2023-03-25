import csv
import os
from typing import List, Dict
from statistics import mean


class FixationMerger:
    def __init__(self, raw_data_divided_path, merged_fixation_path, denoise_threshold: int):
        self.in_data_path = raw_data_divided_path
        self.out_data_path = merged_fixation_path
        self.out_data_merged_name = raw_data_divided_path.stem+'_merged.csv'
        self.out_data_merged_denoise_name = raw_data_divided_path.stem + '_merged_denoised.csv'
        self.threshold_fixation = denoise_threshold
        # self.threshold_btw_line = btw_line_threshold
        self.start_sent = (0, 1, 2, 3)
        self.mouse_data = self.__read_file()
        self.fixations = self.merge_fixations()

    # Check if the directory for the files of merged fixations exists, if not, make one
    def __make_directory_for_merged_fixations(self) -> None:
        if not os.path.exists(self.out_data_path):
            os.mkdir(self.out_data_path)

    def __read_file(self) -> List[Dict]:
        """
        Read in the raw mouse tracking data for one participant
        columns in raw mouse tracking file: submission_id, Index, ItemId, SubjectId, Word, experiment_duration,
        experiment_end_time	experiment_start_time, mousePositionX, mousePositionY, response, responseTime,
        wordPositionBottom, wordPositionLeft, wordPositionRight, wordPositionTop
        """
        with open(self.in_data_path, 'r') as csvfile:
            csvreader = csv.DictReader(csvfile)
            mouse_data = [{'sbm_id': str(row['submission_id']),
                           'expr_id': int(row['Experiment']), 'cond_id': int(row['Condition']),
                           'para_nr': int(row['ItemId']),
                           'word_nr': int(row['Index']), 'word': str(row['Word']), 't': int(row['responseTime']),
                           'x': int(row['mousePositionX']), 'y': int(row['mousePositionY']),
                           'response': str(row['response'])} for row in csvreader]
        # print(mouse_data)
        return mouse_data

    def merge_fixations(self) -> List[List[Dict]]:
        """ merge adjacent data points if they are about the same words to get fixations"""
        fixations = []
        fixations_for_one_item = []
        x_coordinates = []
        y_coordinates = []
        for i in range(len(self.mouse_data)-1):
            if self.mouse_data[i+1]['para_nr'] == self.mouse_data[i]['para_nr']:
                if self.mouse_data[i+1]['word_nr'] == self.mouse_data[i]['word_nr']:
                    self.mouse_data[i+1]['t'] = self.mouse_data[i]['t']
                    x_coordinates.append(self.mouse_data[i]['x'])
                    y_coordinates.append(self.mouse_data[i]['y'])

                else:
                    fixed_time = self.mouse_data[i + 1]['t'] - self.mouse_data[i]['t']
                    x_coordinates.append(self.mouse_data[i]['x'])
                    y_coordinates.append(self.mouse_data[i]['y'])
                    merged_fixation_on_word = {
                        'sbm_id': self.mouse_data[i]['sbm_id'],
                        'expr_id': self.mouse_data[i]['expr_id'], 'cond_id': self.mouse_data[i]['cond_id'],
                        'para_nr': self.mouse_data[i]['para_nr'],
                        'word_nr': self.mouse_data[i]['word_nr'], 'word': self.mouse_data[i]['word'],
                        'duration': fixed_time, 'start_t': self.mouse_data[i]['t'], 'end_t': self.mouse_data[i+1]['t'],
                        'x_mean': round(mean(x_coordinates), 2), 'y_mean': round(mean(y_coordinates), 2),
                        'response': self.mouse_data[i]['response']
                    }
                    fixations_for_one_item.append(merged_fixation_on_word)
                    x_coordinates.clear()
                    y_coordinates.clear()
            else:
                fixations.append(fixations_for_one_item)
                fixations_for_one_item = []
                continue
        fixations.append(fixations_for_one_item)
        return fixations

    def write_out_all_merged_fixations(self) -> None:
        self.__make_directory_for_merged_fixations()
        with open(f'{self.out_data_path}/{self.out_data_merged_name}', 'w', newline='') as out_csvfile:
            if self.fixations:
                # to avoid errors given by mess data, we can manually type fieldnames here later.
                writer = csv.DictWriter(out_csvfile, fieldnames=self.fixations[0][0].keys())
                writer.writeheader()
                for item in self.fixations:
                    for fixation_on_word in item:
                        writer.writerow(fixation_on_word)

    def sort_fixations_by_itemid(self) -> None:
        self.fixations = sorted(self.fixations, key=lambda x: (x[0]['expr_id'], x[0]['para_nr']))

    def _clear_noises_before_reading(self):
        for i in range(len(self.fixations)):
            while self.fixations[i] and (self.fixations[i][0]['word_nr'] not in self.start_sent):
                self.fixations[i].pop(0)

    # def _clear_noises_bwt_lines(self):
    #     for i in range(len(self.fixations)):
    #         if self.fixations[i]:
    #             j = 1
    #             while j < len(self.fixations[i]):
    #                 # here is a threshold for denoise:
    #                 # 550 (x-pos)-> whether the word is at the end of a line and the reader will jump to the next line
    #                 # change from 450 to 550 has no big influence in filtering.
    #                 if ((self.fixations[i][j]['word_nr'] == -1) or
    #                         (self.fixations[i][j - 1]['x_mean'] > 550 and
    #                          (self.fixations[i][j]['y_mean'] - self.fixations[i][j - 1][
    #                              'y_mean']) > self.threshold_btw_line)):
    #                     self.fixations[i].pop(j)
    #                     if j < len(self.fixations[i]) and ((self.fixations[i][j]['word_nr'] == -1 or
    #                                                         (self.fixations[i][j - 1]['x_mean'] > 550 and
    #                                                          (self.fixations[i][j]['y_mean'] - self.fixations[i]
    #                                                          [j - 1]['y_mean']) > self.threshold_btw_line))):
    #                         continue
    #                 j += 1

    def write_out_denoise_merged_fixations(self) -> None:
        self.__make_directory_for_merged_fixations()
        self._clear_noises_before_reading()
        # self._clear_noises_bwt_lines()

        with open(f'{self.out_data_path}/{self.out_data_merged_denoise_name}', 'w', newline='') as out_csvfile:
            # for checking whether the length of fixations make sense.

            # print('----------------------------------------------------------')
            # print(self.fixations[16])
            # print(self.fixations[17])
            # print('length of fixations ----> ', len(self.fixations[16]))
            # print('length of fixations ----> ', len(self.fixations[17]))

            # to avoid errors given by mess data, we can manually type fieldnames here later.
            fieldnames = ['sbm_id', 'expr_id', 'cond_id', 'para_nr', 'word_nr', 'word', 'duration', 'start_t', 'end_t',
                          'x_mean', 'y_mean', 'response']
            writer = csv.DictWriter(out_csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for item in self.fixations:
                for fixation_on_word in item:
                    if self.threshold_fixation < fixation_on_word['duration'] < 4000 and fixation_on_word['word_nr'] != -1:
                        writer.writerow(fixation_on_word)









