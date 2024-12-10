lines = '''89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
'''.strip().split('\n')

visited = set()

def find_hiking_trails(lines):
    global visited
    rows = len(lines)
    cols = len(lines[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    def dfs(x, y, height):
        if height == 9:
            visited.add((x, y))
            return 1
        count = 0
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < rows and 0 <= ny < cols and int(lines[nx][ny]) == height + 1 and not (nx, ny) in visited:
                count += dfs(nx, ny, height + 1)
        return count
    
    total_score = 0
    for i in range(rows):
        for j in range(cols):
            if lines[i][j] == '0':
                visited.clear()
                total_score += dfs(i, j, 0)
    
    return total_score

print(find_hiking_trails(lines))