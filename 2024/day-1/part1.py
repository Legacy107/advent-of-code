lines = '''3   4
4   3
2   5
1   3
3   9
3   3
'''.split('\n')

# Parse the input to extract the two lists
left_list = []
right_list = []
for line in lines:
    if line.strip():
        left, right = map(int, line.split())
        left_list.append(left)
        right_list.append(right)

# Sort both lists
left_list.sort()
right_list.sort()

# Calculate the total distance
total_distance = sum(abs(l - r) for l, r in zip(left_list, right_list))

print(total_distance)
