from pathlib import Path
import pandas as pd
import matplotlib.pyplot as plt

input_path_v = Path('../reading_measures/reader_55_reading_measures.csv')

input_file = pd.read_csv(input_path_v)

# grouped_data = input_file.groupby("para_nr")
grouped_data = input_file.groupby(['expr_id', "para_nr"])

# fig_fd = plt.figure()
# fig_fd.suptitle('First Duration')
# fig_gd = plt.figure()
# fig_gd.suptitle('Gaze Duration')
# fig_td = plt.figure()
# fig_td.suptitle('Total Duration')
# for para_nr, group in grouped_data:
#     print(f'-----------------item: {para_nr}--------------------------------------------')
#
#     ax_fd = fig_fd.add_subplot(2, 2, para_nr)
#     ax_fd.bar(group['word_nr'], group['first_duration'])
#     ax_fd.set_title(f"Item ID: {para_nr}")
#
#     ax_gd = fig_gd.add_subplot(2, 2, para_nr)
#     ax_gd.bar(group['word_nr'], group['gaze_duration'])
#     ax_gd.set_title(f"Item ID: {para_nr}")
#
#     ax_td = fig_td.add_subplot(2, 2, para_nr)
#     ax_td.bar(group['word_nr'], group['total_duration'])
#     ax_td.set_title(f"Item ID: {para_nr}")
#     break
# plt.show()

for name, group in grouped_data:
    print(f'------------------------experiment: {name[0]}, text: {name[1]}---------------------------------------')
    word_nr = group['word_nr']
    first_duration = group['first_duration']
    gaze_duration = group['gaze_duration']
    total_duration = group['total_duration']

    x = word_nr
    y1 = first_duration
    y2 = gaze_duration
    y3 = total_duration

    fig, ax = plt.subplots()
    bar_width = 0.25

    bar1 = ax.bar(x, y1, bar_width, color='b')
    bar2 = ax.bar([i + bar_width for i in x], y2, bar_width, color='g')
    bar3 = ax.bar([i + 2 * bar_width for i in x], y3, bar_width, color='r')

    ax.set_xticks([i + bar_width for i in x])
    ax.set_xticklabels(word_nr)

    plt.title(f"experiment: {name[0]}, text: {name[1]}")
    ax.legend((bar1[0], bar2[0], bar3[0]), ('first_duration', 'gaze_duration', 'total_duration'))

    plt.show()
