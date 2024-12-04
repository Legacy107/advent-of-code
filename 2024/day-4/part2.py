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

def count_x_mas_patterns(lines):
    count = 0
    for i in range(len(lines) - 2):
        for j in range(len(lines[i]) - 2):
            if ((lines[i][j] == 'M' and lines[i+2][j] == 'M' and
                 lines[i+1][j+1] == 'A' and
                 lines[i][j+2] == 'S' and lines[i+2][j+2] == 'S') or
                (lines[i][j+2] == 'M' and lines[i+2][j+2] == 'M' and
                 lines[i+1][j+1] == 'A' and
                 lines[i][j] == 'S' and lines[i+2][j] == 'S') or
                (lines[i+2][j] == 'M' and lines[i+2][j+2] == 'M' and
                 lines[i+1][j+1] == 'A' and
                 lines[i][j] == 'S' and lines[i][j+2] == 'S') or
                (lines[i][j] == 'M' and lines[i][j+2] == 'M' and
                 lines[i+1][j+1] == 'A' and
                 lines[i+2][j] == 'S' and lines[i+2][j+2] == 'S')):
                count += 1
    return count

print(count_x_mas_patterns(lines))