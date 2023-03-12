from pathlib import Path
import pandas as pd
import os


class FileDivider:
    """
    divide the raw data file which contains the reading data for all participants to separate files of different
    participants.
    """
    def __init__(self, raw_data_path: str, new_data_path: str):
        self.raw_data_path = Path(f"{raw_data_path}")
        self.new_data_path = Path(f"{new_data_path}")
        self.raw_data_df = pd.read_csv(self.raw_data_path, dtype={"Index": str, "ItemId": str,
                                                                  "Condition": str, "Experiment": str,
                                                                  "mousePositionX": str, "mousePositionY": str})

    # Check if the directory for the divided files exists, if not, make one
    def _make_directory_for_divided_data(self) -> None:
        if not os.path.exists(self.new_data_path):
            os.mkdir(self.new_data_path)

    def divide_raw_file(self) -> None:
        self._make_directory_for_divided_data()
        self._fill_nan_response_column()
        grouped_data = self.raw_data_df.groupby('submission_id')
        for submission_id, group in grouped_data:
            group.to_csv(self.new_data_path / f'reader_{submission_id}.csv', index=False, float_format=None)

    def _fill_nan_response_column(self) -> None:
        self.raw_data_df['response'].fillna(method='bfill', inplace=True)
        self.raw_data_df['ItemId'].fillna(method='ffill', inplace=True)
        # self.raw_data_df['Experiment'].fillna(method='ffill', inplace=True)
        # self.raw_data_df['Condition'].fillna(method='ffill', inplace=True)
        self.raw_data_df['Index'].fillna(value=-100, inplace=True)
        # self.raw_data_df['Word'].fillna(value="NULL", inplace=True)
        self.raw_data_df['mousePositionX'].fillna(value=425, inplace=True)
        self.raw_data_df['mousePositionY'].fillna(value=285, inplace=True)



