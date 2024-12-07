from itertools import product

lines = '''190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20'''.split('\n')

total = 0

for line in lines:
    if not line.strip():
        continue
    test_value_str, numbers_str = line.split(':')
    test_value = int(test_value_str.strip())
    numbers = [int(x) for x in numbers_str.strip().split()]
    num_ops = len(numbers) - 1
    found = False
    for ops in product(['+', '*'], repeat=num_ops):
        expr = ''
        for n, op in zip(numbers, ops + ('',)):
            expr += str(n) + op
        # Evaluate expression left-to-right
        tokens = []
        i = 0
        while i < len(expr):
            if expr[i] in '+*':
                tokens.append(expr[i])
                i += 1
            else:
                num = ''
                while i < len(expr) and expr[i].isdigit():
                    num += expr[i]
                    i += 1
                tokens.append(int(num))
        result = tokens[0]
        for i in range(1, len(tokens), 2):
            op = tokens[i]
            num = tokens[i + 1]
            if op == '+':
                result += num
            else:
                result *= num
        if result == test_value:
            total += test_value
            found = True
            break
print(total)

