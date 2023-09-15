import csv
import os
from typing import List, Dict
from statistics import mean


class FixationMerger:
    def __init__(self, raw_data_divided_path, merged_fixation_path, lower_threshold: int, upper_threshold: int):
        self.in_data_path = raw_data_divided_path
        self.out_data_path = merged_fixation_path
        self.out_data_merged_name = raw_data_divided_path.stem+'_merged.csv'
        self.out_data_merged_denoise_name = raw_data_divided_path.stem + '_clean.csv'
        self.threshold_lower = lower_threshold
        self.threshold_upper = upper_threshold
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
                           # 'wb': str(row['wordPositionBottom']), 'wt': str(row['wordPositionTop']),
                           # 'wl': str(row['wordPositionLeft']), 'wr': str(row['wordPositionRight']),
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
                        # 'wb': self.mouse_data[i]['wb'], 'wt': self.mouse_data[i]['wt'],
                        # 'wl': self.mouse_data[i]['wl'], 'wr': self.mouse_data[i]['wr'],
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
        #self.fixations = sorted(self.fixations, key=lambda x: (x[0]['expr_id'], x[0]['para_nr']))
        self.fixations = sorted(self.fixations, key=lambda x: x[0]['para_nr'] if x else float('inf'))

    def _clear_noises_before_reading(self):
        for i in range(len(self.fixations)):
            while self.fixations[i] and (self.fixations[i][0]['word_nr'] not in self.start_sent):
                self.fixations[i].pop(0)

    def write_out_denoise_merged_fixations(self) -> None:
        self.__make_directory_for_merged_fixations()
        self._clear_noises_before_reading()

        with open(f'{self.out_data_path}/{self.out_data_merged_denoise_name}', 'w', newline='') as out_csvfile:

            # to avoid errors given by mess data, we manually type fieldnames here later.
            fieldnames = ['sbm_id', 'expr_id', 'cond_id', 'para_nr', 'word_nr', 'word', 'duration', 'start_t', 'end_t',
                          'x_mean', 'y_mean', 'response']
            # fieldnames = ['sbm_id', 'expr_id', 'cond_id', 'para_nr', 'word_nr', 'word', 'duration', 'start_t', 'end_t',
            #               'x_mean', 'y_mean', 'wb', 'wt', 'wl', 'wr', 'response']
            writer = csv.DictWriter(out_csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for item in self.fixations:
                for fixation_on_word in item:
                    if self.threshold_lower < fixation_on_word['duration'] < self.threshold_upper and fixation_on_word['word_nr'] != -1:
                        writer.writerow(fixation_on_word)
