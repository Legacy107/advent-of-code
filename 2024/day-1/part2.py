lines = '''3   4
4   3
2   5
1   3
3   9
3   3
'''.split('\n')

left_list = [int(line.split()[0]) for line in lines if line]
right_list = [int(line.split()[1]) for line in lines if line]

similarity_score = 0
for num in left_list:
    similarity_score += num * right_list.count(num)

print(similarity_score)
