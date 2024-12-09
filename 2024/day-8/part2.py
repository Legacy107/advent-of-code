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

antinode_positions = set()
width = len(lines[0])
height = len(lines)

for antenna in antennas:
    antinode_positions.add((antenna['x'], antenna['y']))

# For each pair of antennas with the same frequency
for i in range(len(antennas)):
    for j in range(i + 1, len(antennas)):
        antenna1 = antennas[i]
        antenna2 = antennas[j]
        if antenna1['freq'] == antenna2['freq']:
            dx = antenna2['x'] - antenna1['x']
            dy = antenna2['y'] - antenna1['y']
            if dx == 0 and dy == 0:
                continue  # Skip same antenna
            # Generate antinodes in negative direction
            x, y = antenna1['x'], antenna1['y']
            while True:
                x -= dx
                y -= dy
                if 0 <= x < width and 0 <= y < height:
                    antinode_positions.add((x, y))
                else:
                    break
            # Generate antinodes in positive direction
            x, y = antenna2['x'], antenna2['y']
            while True:
                x += dx
                y += dy
                if 0 <= x < width and 0 <= y < height:
                    antinode_positions.add((x, y))
                else:
                    break

# Count unique antinode positions
print(len(antinode_positions))