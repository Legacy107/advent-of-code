lines = '''MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX'''.split('\n')

def find_word(grid, word):
    def check_direction(x, y, dx, dy):
        for i in range(len(word)):
            new_x, new_y = x + i * dx, y + i * dy
            if not (0 <= new_x < len(grid) and 0 <= new_y < len(grid[0])):
                return False
            try:
                if grid[new_x][new_y] != word[i]:
                    return False
            except IndexError:
                return False
        return True

    count = 0
    directions = [(1, 0), (0, 1), (1, 1), (1, -1), (-1, 0), (0, -1), (-1, -1), (-1, 1)]
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            for dx, dy in directions:
                if check_direction(i, j, dx, dy):
                    count += 1
    return count

grid = [list(line) for line in lines]
word = "XMAS"
print(find_word(grid, word))