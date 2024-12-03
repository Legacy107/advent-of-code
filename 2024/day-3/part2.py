import re

# Read the input file
with open('input.txt') as f:
    lines = f.readlines()
    line = ''.join(lines)

# Find all instructions
instructions = re.findall(r'(do\(\)|don\'t\(\)|mul\((\d{1,3}),(\d{1,3})\))', line)

# Initialize variables
enabled = True
result = 0

# Process each instruction
for instruction in instructions:
    if instruction[0] == 'do()':
        enabled = True
    elif instruction[0] == "don't()":
        enabled = False
    elif instruction[1] and instruction[2] and enabled:
        result += int(instruction[1]) * int(instruction[2])

print(result)