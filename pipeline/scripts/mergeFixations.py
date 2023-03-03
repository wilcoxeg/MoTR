import csv
import os
from typing import List, Dict
from statistics import mean


class FixationMerger:
    def __init__(self, raw_data_divided_path, merged_fixation_path, denoise_threshold: int):
        self.in_data_path = raw_data_divided_path
        self.out_data_path = merged_fixation_path
        self.out_data_merged_name = raw_data_divided_path.stem+'_merged.csv'
        self.out_data_merged_denoise_name = raw_data_divided_path.stem + '_merged_denoise.csv'
        self.threshold = denoise_threshold
        self.start_sent = ('0', '1', '2', '3')
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
            mouse_data = [{'sbm_id': str(row['submission_id']), 'para_nr': str(row['ItemId']),
                           'word_nr': str(row['Index']), 'word': str(row['Word']), 't': int(row['responseTime']),
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
                        'sbm_id': self.mouse_data[i]['sbm_id'], 'para_nr': self.mouse_data[i]['para_nr'],
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
        self.fixations = sorted(self.fixations, key=lambda x: x[0]['para_nr'])
        # print(self.fixations)

    def _clear_noises(self):
        for i in range(len(self.fixations)):
            while self.fixations[i] and self.fixations[i][0]['word_nr'] not in self.start_sent:
                self.fixations[i].pop(0)
        # for item in self.fixations:
        #     print(item)
        #     print(len(item))

    def write_out_denoise_merged_fixations(self) -> None:
        self.__make_directory_for_merged_fixations()
        self._clear_noises()
        with open(f'{self.out_data_path}/{self.out_data_merged_denoise_name}', 'w', newline='') as out_csvfile:
            # to avoid errors given by mess data, we can manually type fieldnames here later.
            writer = csv.DictWriter(out_csvfile, fieldnames=self.fixations[0][0].keys())
            writer.writeheader()
            for item in self.fixations:
                for fixation_on_word in item:
                    if fixation_on_word['duration'] > self.threshold:
                        writer.writerow(fixation_on_word)








