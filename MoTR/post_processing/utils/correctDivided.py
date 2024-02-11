from pathlib import Path
import pandas as pd

def correct_mouse_data(directory_path):
    # Convert directory_path to a Path object for easier path handling
    directory = Path(directory_path)

    # List all CSV files in the directory
    csv_files = directory.glob('*.csv')

    for file_path in csv_files:
        # Read the CSV file into a DataFrame
        df = pd.read_csv(file_path)

        # Check if there are negative values in "mousePositionX"
        if (df['mousePositionX'] < -1).any():
            print(f"I am correcting file: {file_path}")

            # df for corrections where "mousePositionX" is negative --> words are split between two lines
            negative_mouse_positions = df['mousePositionX'] < 0
            only_to_correct_word_position = (
                    df['wordPositionLeft'].notnull() &
                    df['wordPositionTop'].notnull() &
                    (df['mousePositionX'] > 94) &
                    (df['mousePositionY'] > 20)
            )

            combined_positions = negative_mouse_positions | only_to_correct_word_position

            # df for corrections if "wordPositionLeft" and "wordPositionTop" are not None and "mousePositionX" and "mousePositionY" are offset --> normal words
            normal_mouse_positions = (
                    df['wordPositionLeft'].notnull() &
                    df['wordPositionTop'].notnull() &
                    (df['mousePositionX'] <= df['wordPositionRight']-df['wordPositionLeft'] ) |
                    (df['mousePositionY'] <= df['wordPositionBottom']-df['wordPositionTop'])
            )
            blank_mouse_positions = (
                (df['mousePositionX'] < 90) & (df['mousePositionY'] < 20)
            ) & ~(combined_positions | normal_mouse_positions)

            # Correct the "mousePositionX" and "mousePositionY" values
            df.loc[normal_mouse_positions, 'mousePositionX'] += df['wordPositionLeft']
            df.loc[normal_mouse_positions, 'mousePositionY'] += df['wordPositionTop']
            df.loc[combined_positions, ['wordPositionBottom', 'wordPositionTop']] += 40
            # Find the offset value for the "wordPositionLeft" and "wordPositionRight" columns
            for index in df[combined_positions].index:
                offset_value = df.at[index, 'wordPositionLeft'] - 94
                df.at[index, 'wordPositionLeft'] -= offset_value
                df.at[index, 'wordPositionRight'] -= offset_value
            # Pre-calculate the next valid 'wordPositionLeft' for each row
            last_valid_index = None
            for i in reversed(range(len(df))):  # Start from the second last row
                if pd.notnull(df.at[i, 'wordPositionLeft']):
                    last_valid_index = i
                elif last_valid_index is not None and blank_mouse_positions[i]:
                    # Update mousePositionX for the current row using wordPositionLeft from the nearest valid row below
                    df.at[i, 'mousePositionX'] += df.at[last_valid_index, 'wordPositionLeft']
                    df.at[i, 'mousePositionY'] += df.at[last_valid_index, 'wordPositionTop']
            # Re-evaluate blank_mouse_positions after initial corrections
            blank_mouse_positions = df['mousePositionX'] < 0
            # Additional adjustments for rows with mousePositionX < 0 after initial corrections
            df.loc[blank_mouse_positions, 'mousePositionX'] += 739
            df.loc[blank_mouse_positions, 'mousePositionY'] += 67

            # Save the corrected DataFrame back to the CSV
            df.to_csv(f'../provo_corrected2/{file_path.stem}.csv', index=False)

    print(f"All files in '{directory_path}' have been processed.")

correct_mouse_data('../provo_divided_by_reader')