nums = '''5910927 0 1 47 261223 94788 545 7771'''.strip().split('\n')
stones = list(map(int, nums[0].split()))
for _ in range(25):
    new_stones = []
    for stone in stones:
        if stone == 0:
            new_stones.append(1)
        elif len(str(stone)) % 2 == 0:
            s = str(stone)
            mid = len(s) // 2
            left = s[:mid].lstrip('0') or '0'
            right = s[mid:].lstrip('0') or '0'
            new_stones.extend([int(left), int(right)])
        else:
            new_stones.append(stone * 2024)
    stones = new_stones
print(len(stones))

