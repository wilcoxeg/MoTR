from pathlib import Path
import pandas as pd
import numpy as np
import os
from collections import defaultdict


class FeatureExtractor:
    def __init__(self, input_data_path_trial, input_data_path_associations,
                 output_data_path, association_threshold: int):
        # It is not necessary to set attribute 'association_threshold' because we have set it in `mergeassociations`, but I'd
        # like to keep it here for the flexibility of working with existing association files and for the convenience of testing.
        self.input_path_trial = input_data_path_trial
        self.input_path_associations = input_data_path_associations
        self.input_df_f = pd.read_csv(self.input_path_associations, na_values=['NA'])
        self.input_df_f['index'] = range(len(self.input_df_f))

        self.output_path = output_data_path
        self.output_df = pd.read_csv(self.input_path_trial, na_values=['NA'])
        self.output_name_stem = self.input_path_associations.stem.split('_')[1]
        self.threshold = association_threshold

        self.input_df_ff = self.input_df_f.loc[self.input_df_f['duration'] > self.threshold]

    def _make_directory(self) -> None:
        if not os.path.exists(self.output_path):
            os.mkdir(self.output_path)

    def get_first_duration(self):
        """
        Calculate the first association duration for each word and merge it into the output dataframe.
        """
        # input_df_f_grouped = self.input_df_ff.groupby(['para_nr', 'word_nr'])
        # input_df_f_grouped = self.input_df_ff.groupby(['expr_id', 'para_nr', 'word_nr'])
        input_df_f_grouped = self.input_df_ff.groupby(['cond_id', 'para_nr', 'word_nr'])
        first_association_values = input_df_f_grouped['duration'].first()
        first_association_df = pd.DataFrame(first_association_values).reset_index()
        first_association_df = first_association_df.rename(columns={'duration': 'first_duration'})
        # self.output_df = self.output_df.merge(first_association_df, on=['para_nr', 'word_nr'], how='left')
        # self.output_df = self.output_df.merge(first_association_df, on=['expr_id', 'para_nr', 'word_nr'], how='left')
        self.output_df = self.output_df.merge(first_association_df, on=['cond_id', 'para_nr', 'word_nr'], how='left')
        self.output_df['first_duration'] = self.output_df['first_duration'].fillna(0)

    def get_total_duration(self):
        """
        Calculate the total association duration for each word and merge it into the output dataframe
        """
        # input_df_f_grouped = self.input_df_ff.groupby(['para_nr', 'word_nr'])
        # input_df_f_grouped = self.input_df_ff.groupby(['expr_id', 'para_nr', 'word_nr'])
        input_df_f_grouped = self.input_df_ff.groupby(['cond_id', 'para_nr', 'word_nr'])
        total_duration_values = input_df_f_grouped['duration'].sum()
        total_duration_df = pd.DataFrame(total_duration_values).reset_index()
        total_duration_df = total_duration_df.rename(columns={'duration': 'total_duration'})
        # self.output_df = self.output_df.merge(total_duration_df, on=['para_nr', 'word_nr'], how='left')
        # self.output_df = self.output_df.merge(total_duration_df, on=['expr_id', 'para_nr', 'word_nr'], how='left')
        self.output_df = self.output_df.merge(total_duration_df, on=['cond_id', 'para_nr', 'word_nr'], how='left')
        self.output_df['total_duration'] = self.output_df['total_duration'].fillna(0)

    # gaze duration equals to first-pass reading time: sum of the durations of all first-pass associations on a word
    # (0 if the word was skipped in the first-pass)
    # here our IA is a word, gaze duration also equals to first association
    def get_gaze_duration(self):
        gaze_duration_dict = defaultdict(int)
        # input_df_ff_grouped = self.input_df_ff.groupby(['para_nr'])
        # input_df_ff_grouped = self.input_df_ff.groupby(['expr_id', 'para_nr'])
        input_df_ff_grouped = self.input_df_ff.groupby(['cond_id', 'para_nr'])
        gaze_duration_df = pd.DataFrame()
        for name, group in input_df_ff_grouped:
            for i in group.index:
                # if a word behind it has been focused, its gaze duration is 0
                if (group.loc[:i-1, 'word_nr'] < group.loc[i, 'word_nr']).all():
                    gaze_duration_dict[group.loc[i, 'word_nr']] += group.loc[i, 'duration']
            gaze_duration = pd.DataFrame(
                {
                 # 'para_nr': name,
                 # 'expr_id': name[0],
                 'cond_id': name[0],
                 'para_nr': name[1],
                 'word_nr': gaze_duration_dict.keys(),
                 'gaze_duration': gaze_duration_dict.values()}).sort_values(by='word_nr')
            gaze_duration_df = pd.concat([gaze_duration_df, gaze_duration], ignore_index=True)
            gaze_duration_dict.clear()
        # self.output_df = self.output_df.merge(gaze_duration_df, on=['para_nr', 'word_nr'], how='left')
        # self.output_df = self.output_df.merge(gaze_duration_df, on=['expr_id', 'para_nr', 'word_nr'], how='left')
        self.output_df = self.output_df.merge(gaze_duration_df, on=['cond_id', 'para_nr', 'word_nr'], how='left')
        self.output_df['gaze_duration'] = self.output_df['gaze_duration'].fillna(0)

    # sum of all first pass association durations on a word until a word to the right of this word is fixated
    #  0 if the word was not fixated in the first-pass
    def get_right_bounded_rt(self):
        rrt_dict = defaultdict(int)
        # input_df_ff_grouped = self.input_df_ff.groupby(['para_nr'])
        # input_df_ff_grouped = self.input_df_ff.groupby(['expr_id', 'para_nr'])
        input_df_ff_grouped = self.input_df_ff.groupby(['cond_id', 'para_nr'])
        rrt_df = pd.DataFrame()
        for name, group in input_df_ff_grouped:
            for i in group.index:
                if (group.loc[:i, 'word_nr'] <= group.loc[i, 'word_nr']).all():
                    rrt_dict[group.loc[i, 'word_nr']] += group.loc[i, 'duration']
            rrt = pd.DataFrame(
                {
                 # 'para_nr': name,
                 # 'expr_id': name[0],
                 'cond_id': name[0],
                 'para_nr': name[1],
                 'word_nr': rrt_dict.keys(),
                 'right_bounded_rt': rrt_dict.values()}).sort_values(by='word_nr')
            rrt_df = pd.concat([rrt_df, rrt], ignore_index=True)

            rrt_dict.clear()
        # self.output_df = self.output_df.merge(rrt_df, on=['para_nr', 'word_nr'], how='left')
        # self.output_df = self.output_df.merge(rrt_df, on=['expr_id', 'para_nr', 'word_nr'], how='left')
        self.output_df = self.output_df.merge(rrt_df, on=['cond_id', 'para_nr', 'word_nr'], how='left')
        self.output_df['right_bounded_rt'] = self.output_df['right_bounded_rt'].fillna(0)

    #  sum of all association durations starting from the first first-pass association on a word until association a word to the
    #  right of this word (including all regressive associations on previous words),
    #  0 if the word was not fixated in the first-pass
    def get_go_past_time(self):
        gpt_dict = defaultdict(int)
        # input_df_ff_grouped = self.input_df_ff.groupby(['para_nr'])
        # input_df_ff_grouped = self.input_df_ff.groupby(['expr_id', 'para_nr'])
        input_df_ff_grouped = self.input_df_ff.groupby(['cond_id', 'para_nr'])
        gpt_df = pd.DataFrame()
        for name, group in input_df_ff_grouped:
            for i in group.index:
                if (group.loc[:i-1, 'word_nr'] < group.loc[i, 'word_nr']).all():
                    gpt_dict[group.loc[i, 'word_nr']] += group.loc[i, 'duration']
                    for index in group.loc[i+1:, 'index']:
                        if group.loc[index, 'word_nr'] <= group.loc[i, 'word_nr']:
                            gpt_dict[group.loc[i, 'word_nr']] += group.loc[index, 'duration']
                        else:
                            break
            gpt = pd.DataFrame(
                {
                 # 'para_nr': name,
                 # 'expr_id': name[0],
                 'cond_id': name[0],
                 'para_nr': name[1],
                 'word_nr': gpt_dict.keys(),
                 'go_past_time': gpt_dict.values()}).sort_values(by='word_nr')
            gpt_df = pd.concat([gpt_df, gpt], ignore_index=True)
            gpt_dict.clear()
        # self.output_df = self.output_df.merge(gpt_df, on=['para_nr', 'word_nr'], how='left')
        # self.output_df = self.output_df.merge(gpt_df, on=['expr_id', 'para_nr', 'word_nr'], how='left')
        self.output_df = self.output_df.merge(gpt_df, on=['cond_id', 'para_nr', 'word_nr'], how='left')
        self.output_df['go_past_time'] = self.output_df['go_past_time'].fillna(0)

    def check_comprehension_answer(self):
        """
        Check whether the comprehension question is answered correctly or not. Correct --> 1; Wrong --> 0
        """
        # input_df_ff_grouped = self.input_df_ff.groupby(['para_nr', 'word_nr'])
        # input_df_ff_grouped = self.input_df_ff.groupby(['expr_id', 'para_nr', 'word_nr'])
        input_df_ff_grouped = self.input_df_ff.groupby(['cond_id', 'para_nr', 'word_nr'])
        solution_to_check = input_df_ff_grouped['response'].first()
        solution_df = pd.DataFrame(solution_to_check).reset_index()
        solution_df = solution_df.rename(columns={'response': 'response_chosen'})
        # self.output_df = self.output_df.merge(solution_df, on=['para_nr', 'word_nr'], how='left')
        # self.output_df = self.output_df.merge(solution_df, on=['expr_id', 'para_nr', 'word_nr'], how='left')
        self.output_df = self.output_df.merge(solution_df, on=['cond_id', 'para_nr', 'word_nr'], how='left')
        # solution_to_fill = self.output_df.groupby(['para_nr'])['response_chosen'].first()
        # solution_to_fill = self.output_df.groupby(['expr_id', 'para_nr'])['response_chosen'].first()
        solution_to_fill = self.output_df.groupby(['cond_id', 'para_nr'])['response_chosen'].first()
        solution_to_fill_df = pd.DataFrame(solution_to_fill).reset_index()
        # self.output_df = self.output_df.drop(columns='response_chosen').merge(solution_to_fill_df,
        #                                                                       on=['para_nr'], how='left')
        # self.output_df = self.output_df.drop(columns='response_chosen').merge(solution_to_fill_df,
        #                                                                       on=['expr_id', 'para_nr'], how='left')
        self.output_df = self.output_df.drop(columns='response_chosen').merge(solution_to_fill_df,
                                                                              on=['cond_id', 'para_nr'], how='left')
        self.output_df['response_chosen'] = self.output_df['response_chosen'].fillna('--')
        self.output_df['correctness'] = self.output_df.apply(
            lambda x: 1 if x['response_chosen'] in x['response_true'] else 0, axis=1)

    def get_binary(self):
        """
        Get binary variable FPFix: whether a word is fixed in the first-pass reading, 1, fixed, 0, otherwise;
        FPReg: First Pass Regression Out --> whether there is a regression initiated from a word, 1, yes, 0, no.
        RegIn_incl: whether there is a regression landed on a word, 1, yes, 0, no, including all regressions
        RegIn_excl: whether there is a regression landed on a word, 1, yes, 0, no, only including regressions on words that were fixed in the first pass
        """
        FPFix_dict = defaultdict(int)
        FPReg_dict = defaultdict(int)
        RegIn_incl_dict = defaultdict(int)
        RegIn_excl_dict = defaultdict(int)
        # input_df_ff_grouped = self.input_df_ff.groupby(['para_nr'])
        # input_df_ff_grouped = self.input_df_ff.groupby(['expr_id', 'para_nr'])
        input_df_ff_grouped = self.input_df_ff.groupby(['cond_id', 'para_nr'])
        binary_df = pd.DataFrame()
        for name, group in input_df_ff_grouped:
            for i in group.index:
                if (group.loc[:i, 'word_nr'] <= group.loc[i, 'word_nr']).all():
                    FPFix_dict[group.loc[i, 'word_nr']] = 1
                    for index in group.loc[i+1:, 'index']:
                        if group.loc[index, 'word_nr'] < group.loc[i, 'word_nr']:
                            FPReg_dict[group.loc[i, 'word_nr']] = 1
                        else:
                            break

            # Calculate RegIn_incl and RegIn_excl
            for i in group.index:
                current_word_nr = group.loc[i, 'word_nr']
                for j in group.loc[:i-1].index:
                    if group.loc[j, 'word_nr'] > current_word_nr:
                        # RegIn_incl: Include all regressions
                        RegIn_incl_dict[current_word_nr] = 1
                        # RegIn_excl: Only include if the word was fixed in the first pass
                        if int(FPFix_dict.get(current_word_nr, 0)) == 1:
                            RegIn_excl_dict[current_word_nr] = 1
                        break

            FPFix = pd.DataFrame(
                {
                 # 'para_nr': name,
                 # 'expr_id': name[0],
                 'cond_id': name[0],
                 'para_nr': name[1],
                 'word_nr': FPFix_dict.keys(),
                 'FPFix': FPFix_dict.values()}).sort_values(by='word_nr')
            FPReg = pd.DataFrame(
                {
                 # 'para_nr': name,
                 # 'expr_id': name[0],
                 'cond_id': name[0],
                 'para_nr': name[1],
                 'word_nr': FPReg_dict.keys(),
                 'FPReg': FPReg_dict.values()}).sort_values(by='word_nr')
            RegIn_incl = pd.DataFrame({
                'cond_id': name[0],
                'para_nr': name[1],
                'word_nr': RegIn_incl_dict.keys(),
                'RegIn_incl': RegIn_incl_dict.values()}).sort_values(by='word_nr')
            RegIn_excl = pd.DataFrame({
                'cond_id': name[0],
                'para_nr': name[1],
                'word_nr': RegIn_excl_dict.keys(),
                'RegIn_excl': RegIn_excl_dict.values()}).sort_values(by='word_nr')
            # FPFix = FPFix.merge(FPReg, on=['para_nr', 'word_nr'], how='left')
            # FPFix = FPFix.merge(FPReg, on=['expr_id', 'para_nr', 'word_nr'], how='left')
            FPFix = FPFix.merge(FPReg, on=['cond_id', 'para_nr', 'word_nr'], how='left')
            FPFix = FPFix.merge(RegIn_excl, on=['cond_id', 'para_nr', 'word_nr'], how='left')
            FPFix = FPFix.merge(RegIn_incl, on=['cond_id', 'para_nr', 'word_nr'], how='outer')
            binary_df = pd.concat([binary_df, FPFix], ignore_index=True)
            # binary_df = pd.concat([binary_df, FPReg], ignore_index=True)
            FPFix_dict.clear()
            FPReg_dict.clear()
            RegIn_incl_dict.clear()
            RegIn_excl_dict.clear()
        # self.output_df = self.output_df.merge(binary_df, on=['para_nr', 'word_nr'], how='left')
        # self.output_df = self.output_df.merge(binary_df, on=['expr_id', 'para_nr', 'word_nr'], how='left')
        self.output_df = self.output_df.merge(binary_df, on=['cond_id', 'para_nr', 'word_nr'], how='left')
        self.output_df['FPFix'] = self.output_df['FPFix'].fillna(0).astype(int)
        self.output_df['FPReg'] = self.output_df['FPReg'].fillna(0).astype(int)
        self.output_df['RegIn_incl'] = self.output_df['RegIn_incl'].fillna(0).astype(int)
        self.output_df['RegIn_excl'] = self.output_df['RegIn_excl'].fillna(0).astype(int)

    def write_out(self):
        """
        Write all the above reading measures out to a csv file.
        """
        self._make_directory()
        # Each participant only read one list out of three, so there are a lot of blank rows. We will delete them.
        self.output_df.loc[self.output_df['response_chosen'] == '--', 'correctness':'FPReg'] = np.nan
        filtered_df = self.output_df[self.output_df['response_chosen'] != '--']
        filtered_df.to_csv(self.output_path / f'reader_{self.output_name_stem}_reading_measures.csv', index=False)
