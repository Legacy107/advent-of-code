from functools import lru_cache

nums = '''5910927 0 1 47 261223 94788 545 7771'''.strip().split('\n')
stones = list(map(int, nums[0].split()))
blinks = 75

import sys
sys.setrecursionlimit(1 << 25)

@lru_cache(maxsize=None)
def count_stones(stone, blinks):
    if blinks == 0:
        return 1
    if stone == 0:
        return count_stones(1, blinks - 1)
    elif len(str(stone)) % 2 == 0:
        s = str(stone)
        mid = len(s) // 2
        left = s[:mid].lstrip('0') or '0'
        right = s[mid:].lstrip('0') or '0'
        return count_stones(int(left), blinks - 1) + count_stones(int(right), blinks - 1)
    else:
        return count_stones(stone * 2024, blinks - 1)

total = sum(count_stones(stone, blinks) for stone in stones)
print(total)

