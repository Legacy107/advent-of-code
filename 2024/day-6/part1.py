lines1 = '''....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...'''.split('\n')

def predict_guard_path(lines):
    directions = ['^', '>', 'v', '<']
    moves = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    visited = set()
    
    # Find the initial position and direction of the guard
    for i, line in enumerate(lines):
        if '^' in line:
            x, y = i, line.index('^')
            direction = 0
            # Mark the initial position as an empty cell
            lines[x] = lines[x][:y] + '.' + lines[x][y+1:]
            break
    
    while 0 <= x < len(lines) and 0 <= y < len(lines[0]):
        visited.add((x, y))
        next_x, next_y = x + moves[direction][0], y + moves[direction][1]
        
        if not (0 <= next_x < len(lines)) or not (0 <= next_y < len(lines[0])):
            x, y = next_x, next_y
        elif lines[next_x][next_y] == '#':
            direction = (direction + 1) % 4
        else:
            x, y = next_x, next_y
    
    return len(visited)

print(predict_guard_path(lines1))