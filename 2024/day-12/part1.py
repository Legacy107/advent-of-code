lines = '''RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE'''.strip().split('\n')

def calculate_total_fencing_cost(lines):
    grid = [list(line) for line in lines]
    rows, cols = len(grid), len(grid[0])
    visited = [[False for _ in range(cols)] for _ in range(rows)]
    total_cost = 0

    def dfs(r, c, plant_type):
        stack = [(r, c)]
        area = 0
        perimeter = 0
        while stack:
            x, y = stack.pop()
            if visited[x][y]:
                continue
            visited[x][y] = True
            area += 1
            current_perimeter = 0
            for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < rows and 0 <= ny < cols:
                    if grid[nx][ny] == plant_type:
                        if not visited[nx][ny]:
                            stack.append((nx, ny))
                    else:
                        current_perimeter += 1
                else:
                    current_perimeter += 1
            perimeter += current_perimeter
        return area, perimeter

    for r in range(rows):
        for c in range(cols):
            if not visited[r][c]:
                plant = grid[r][c]
                region_area, region_perimeter = dfs(r, c, plant)
                total_cost += region_area * region_perimeter

    return total_cost

total_fencing_cost = calculate_total_fencing_cost(lines)
print(total_fencing_cost)


