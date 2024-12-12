lines = '''AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA'''.strip().split('\n')

def calculate_total_fencing_cost(lines):
    grid = [list(line) for line in lines]
    rows, cols = len(grid), len(grid[0])
    visited = [[False for _ in range(cols)] for _ in range(rows)]
    total_cost = 0

    def dfs(r, c, plant_type):
        stack = [(r, c)]
        area = 0
        fence_sides = set()
        while stack:
            x, y = stack.pop()
            if visited[x][y]:
                continue
            visited[x][y] = True
            area += 1
            for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < rows and 0 <= ny < cols:
                    if grid[nx][ny] == plant_type:
                        if not visited[nx][ny]:
                            stack.append((nx, ny))
                    else:
                        # Different plant type, add fence side with specific edge type
                        if dx == -1 and dy == 0:
                            # Top edge of current cell
                            fence_sides.add(('horizontal_up', x, y))
                        elif dx == 1 and dy == 0:
                            # Bottom edge of current cell
                            fence_sides.add(('horizontal_down', x + 1, y))
                        elif dx == 0 and dy == -1:
                            # Left edge of current cell
                            fence_sides.add(('vertical_left', x, y))
                        elif dx == 0 and dy == 1:
                            # Right edge of current cell
                            fence_sides.add(('vertical_right', x, y + 1))
                else:
                    # Out of grid, add fence side with specific edge type
                    if dx == -1 and dy == 0:
                        fence_sides.add(('horizontal_up', x, y))
                    elif dx == 1 and dy == 0:
                        fence_sides.add(('horizontal_down', x + 1, y))
                    elif dx == 0 and dy == -1:
                        fence_sides.add(('vertical_left', x, y))
                    elif dx == 0 and dy == 1:
                        fence_sides.add(('vertical_right', x, y + 1))
        
        # Group fence sides into continuous straight lines based on edge subtypes
        horizontal_up = {}
        horizontal_down = {}
        vertical_left = {}
        vertical_right = {}
        for direction, coord1, coord2 in fence_sides:
            if direction == 'horizontal_up':
                x = coord1
                y = coord2
                if x not in horizontal_up:
                    horizontal_up[x] = []
                horizontal_up[x].append(y)
            elif direction == 'horizontal_down':
                x = coord1
                y = coord2
                if x not in horizontal_down:
                    horizontal_down[x] = []
                horizontal_down[x].append(y)
            elif direction == 'vertical_left':
                y = coord2
                x = coord1
                if y not in vertical_left:
                    vertical_left[y] = []
                vertical_left[y].append(x)
            elif direction == 'vertical_right':
                y = coord2
                x = coord1
                if y not in vertical_right:
                    vertical_right[y] = []
                vertical_right[y].append(x)
        
        num_sides = 0

        # Function to count continuous sides
        def count_continuous_sides(edge_dict):
            count = 0
            for key in edge_dict:
                positions = sorted(edge_dict[key])
                if not positions:
                    continue
                prev = positions[0]
                count += 1  # Start of a new side
                for pos in positions[1:]:
                    if pos != prev + 1:
                        count += 1  # Start of another side
                    prev = pos
            return count

        # Count horizontal_up sides
        num_sides += count_continuous_sides(horizontal_up)
        # Count horizontal_down sides
        num_sides += count_continuous_sides(horizontal_down)
        # Count vertical_left sides
        num_sides += count_continuous_sides(vertical_left)
        # Count vertical_right sides
        num_sides += count_continuous_sides(vertical_right)

        return area, num_sides

    for r in range(rows):
        for c in range(cols):
            if not visited[r][c]:
                plant = grid[r][c]
                region_area, region_sides = dfs(r, c, plant)
                # print(f"Plant Type: {plant}, Area: {region_area}, Sides: {region_sides}")
                total_cost += region_area * region_sides

    return total_cost

total_fencing_cost = calculate_total_fencing_cost(lines)
print(f"Total Fencing Cost: {total_fencing_cost}")
