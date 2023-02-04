import csv
import json

# # Open the TSV file
# with open('../../trials/provo_items.tsv', 'r') as tsv_file:
# 	reader = csv.DictReader(tsv_file, delimiter='\t')
#     
#     # Create a list of dictionaries from the TSV data
# 	data = [row for row in reader]
# 
# # Write the list of dictionaries to a JSON file
# with open('../../trials/provo_items.json', 'w') as json_file:
# 	json.dump(data, json_file)
	
	
# Open the TSV file
with open('../../trials/localCoherence_items.tsv', 'r') as tsv_file:
	reader = csv.reader(tsv_file, delimiter='\t')
	# Write the modified CSV data to a new file
	with open('../../trials/localCoherence_items.csv', 'w', newline='') as csv_file:
		writer = csv.writer(csv_file)
		headers = next(reader)
		writer.writerow(headers)
		for row in reader:
			for i, header in enumerate(headers):
				if header in ['text', 'question', 'response_true', 'response_distractors']:
					row[i] = f'"{row[i]}"'
			writer.writerow(row)
    
    