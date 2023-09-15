# split the items in the attachment preference corpus into three lists. 
# Same item under different condition will not appear in the same list.
# Each reader will read one list in the experiment.

import pandas as pd


trial_df = pd.read_csv('../localCoherence.tsv', sep='\t')
# print(trial_df.head())

trial_df_1 = trial_df[(trial_df['item_id'].between(1, 8) & (trial_df['condition_id'] == 5)) |
                      (trial_df['item_id'].between(9, 16) & (trial_df['condition_id'] == 6)) |
                      (trial_df['item_id'].between(25, 32) & (trial_df['condition_id'] == 1)) |
                      (trial_df['item_id'].between(33, 40) & (trial_df['condition_id'] == 2)) |
                      (trial_df['item_id'].between(49, 56) & (trial_df['condition_id'] == 3)) |
                      (trial_df['item_id'].between(57, 64) & (trial_df['condition_id'] == 4)) |
                      (trial_df['item_id'].between(111, 118) & (trial_df['condition_id'] == 8))]
# trial_df_1.loc[:, 'list_id'] = 1

trial_df_2 = trial_df[(trial_df['item_id'].between(9, 16) & (trial_df['condition_id'] == 5)) |
                      (trial_df['item_id'].between(17, 24) & (trial_df['condition_id'] == 6)) |
                      (trial_df['item_id'].between(33, 40) & (trial_df['condition_id'] == 1)) |
                      (trial_df['item_id'].between(41, 48) & (trial_df['condition_id'] == 2)) |
                      (trial_df['item_id'].between(57, 64) & (trial_df['condition_id'] == 3)) |
                      (trial_df['item_id'].between(65, 72) & (trial_df['condition_id'] == 4)) |
                      (trial_df['item_id'].between(119, 126) & (trial_df['condition_id'] == 8))]
# trial_df_2.loc[:, 'list_id'] = 2

trial_df_3 = trial_df[(trial_df['item_id'].between(17, 24) & (trial_df['condition_id'] == 5)) |
                      (trial_df['item_id'].between(1, 8) & (trial_df['condition_id'] == 6)) |
                      (trial_df['item_id'].between(41, 48) & (trial_df['condition_id'] == 1)) |
                      (trial_df['item_id'].between(25, 32) & (trial_df['condition_id'] == 2)) |
                      (trial_df['item_id'].between(65, 72) & (trial_df['condition_id'] == 3)) |
                      (trial_df['item_id'].between(49, 56) & (trial_df['condition_id'] == 4)) |
                      (trial_df['item_id'].between(127, 134) & (trial_df['condition_id'] == 8))]
# trial_df_3.loc[:, 'list_id'] = 3

trial_df_practice = trial_df[(trial_df['item_id'].between(101, 103) & (trial_df['condition_id'] == 7))]
# trial_df_practice.loc[:, 'list_id'] = 0

trial_df_1.to_csv('../trials/localCoherence_list1.tsv', sep='\t', index=False)
trial_df_2.to_csv('../trials/localCoherence_list2.tsv', sep='\t', index=False)
trial_df_3.to_csv('../trials/localCoherence_list3.tsv', sep='\t', index=False)
trial_df_practice.to_csv('../trials/localCoherence_practice.tsv', sep='\t', index=False)
