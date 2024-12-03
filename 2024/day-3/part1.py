import re

# Read the input file
with open('input.txt') as f:
    lines = f.readlines()
    line = ''.join(lines)

# Find all valid mul(X,Y) patterns
matches = re.findall(r'mul\((\d{1,3}),(\d{1,3})\)', line)

# Calculate the sum of all valid multiplications
result = sum(int(x) * int(y) for x, y in matches)

print(result)