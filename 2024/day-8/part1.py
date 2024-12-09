lines = '''............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............'''.split('\n')

# Parse antenna positions and frequencies
antennas = []
for y, line in enumerate(lines):
    for x, char in enumerate(line):
        if char != '.':
            antennas.append({'x': x, 'y': y, 'freq': char})

# Find all antinode positions
antinode_positions = set()
width = len(lines[0])
height = len(lines)
for i in range(len(antennas)):
    for j in range(i + 1, len(antennas)):
        antenna1 = antennas[i]
        antenna2 = antennas[j]
        if antenna1['freq'] == antenna2['freq']:
            # Calculate antinode positions
            x1 = 2 * antenna1['x'] - antenna2['x']
            y1 = 2 * antenna1['y'] - antenna2['y']
            if 0 <= x1 < width and 0 <= y1 < height:
                antinode_positions.add((x1, y1))
            x2 = 2 * antenna2['x'] - antenna1['x']
            y2 = 2 * antenna2['y'] - antenna1['y']
            if 0 <= x2 < width and 0 <= y2 < height:
                antinode_positions.add((x2, y2))

# Count unique antinode positions
print(len(antinode_positions))

