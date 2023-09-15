# convert the original trial data from Witzel et al., (2012) and Boyce et al., (2020)
# to csv/tsv file which can then be used as input to magpie.

import csv

# Open the JSON file and load the data into a Python object
with open('../spr.js', 'r') as f:
    # Open a CSV file for writing and create a CSV writer object
    with open('../localCoherence.tsv', 'w', newline='', encoding='utf-8') as out_f:
        writer = csv.writer(out_f, delimiter='\t')

        # Write the header row
        writer.writerow(['experiment', 'experiment_id', 'condition', 'condition_id', 'item_id', 'text', 'question',
                         'response_true', 'response_distractors'])
        for line in f:
            elem = line.split(', "DashedSentence",')
            cond = elem[0].strip('[]')
            sent = elem[1].lstrip('{s: ')
            # print(cond,  '-->',  sent)
            c = cond.split(',')[0].strip('"')
            if c == 'and_no_comma':
                c_id = 1
            elif c == 'and_comma':
                c_id = 2
            elif c == 'adverb_high':
                c_id = 3
            elif c == 'adverb_low':
                c_id = 4
            elif c == 'relative_high':
                c_id = 5
            elif c == 'relative_low':
                c_id = 6
            elif c == 'practice':
                c_id = 7
            else:
                c_id = 8
            order = cond.split(',')[1]
            s_q = sent.split('}, "Question", {q: ')
            sentence = s_q[0].strip('"')
            q = s_q[1].split(', as: [')[0].strip('"')
            a = s_q[1].split(', as: [')[1].split(', hasCorrect: ')[1]
            correct = a[:-4].strip('"')
            if 'no' in correct:
                distract = "yes"
            else:
                distract = "no"
            print(c, '->', c_id, '->', order, '->', sentence, '->', q, '->', correct, '->', distract)

            experiment = "local_coherence"
            experiment_id = 1
            condition = c
            condition_id = c_id
            item_id = order
            text = sentence
            question = q
            response_true = correct
            response_distractors = distract

            # Write the data to the CSV file
            writer.writerow([experiment, experiment_id, condition, condition_id, item_id, text, question, response_true, response_distractors])
