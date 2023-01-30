from pathlib import Path
import pandas as pd
import os


class TrialDataPreprocessor:
    def __init__(self, raw_data_path: str, new_data_path: str):
        self.raw_data_path = Path(f"{raw_data_path}")
        self.new_data_path = Path(f"{new_data_path}")
        self.raw_data_df = pd.read_csv(self.raw_data_path, dtype={"item_id": str, "item_content": str,
                                                                  "response_true": str})

    # Check if the directory for the divided files exists, if not, make one
    def _make_directory_for_divided_data(self) -> None:
        if not os.path.exists(self.new_data_path):
            os.mkdir(self.new_data_path)

    def split_sentence_into_words(self) -> None:
        self._make_directory_for_divided_data()
        self.raw_data_df = self.raw_data_df.\
            assign(item_content=self.raw_data_df['item_content'].str.split()).explode('item_content')
        self.raw_data_df['word_nr'] = self.raw_data_df.groupby("item_id").cumcount()
        self.raw_data_df.to_csv(self.new_data_path / f'preprocessed_trial_data.csv', index=False, float_format=None)

    def filtered_new_df(self) -> None:
        df_new = self.raw_data_df[['item_id', 'item_content', 'word_nr', 'response_true']]
        df_new = df_new.rename(columns={'item_id': 'para_nr', 'item_content': 'word'})
        df_new.to_csv(self.new_data_path / 'filtered_preprocessed_trial_data.csv', index=False)


# objPreprocessor = TrialDataPreprocessor("../testTrials.csv", "../preprocessed_trialData")
# objPreprocessor.split_sentence_into_words()
# objPreprocessor.filtered_new_df()



