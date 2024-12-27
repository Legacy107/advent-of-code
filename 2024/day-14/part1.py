import re

lines = '''p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3'''

robots = []
for line in lines.split('\n'):
    match = re.match(r'p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)', line)
    if match:
        px, py, vx, vy = map(int, match.groups())
        robots.append(((px, py), (vx, vy)))

width, height = 101, 103
time = 100

def move_robot(position, velocity, time, width, height):
    px, py = position
    vx, vy = velocity
    new_px = (px + vx * time) % width
    new_py = (py + vy * time) % height
    return new_px, new_py

final_positions = [move_robot(pos, vel, time, width, height) for pos, vel in robots]

def count_robots_in_quadrants(positions, width, height):
    mid_x, mid_y = width // 2, height // 2
    quadrants = [0, 0, 0, 0]  # Top-left, Top-right, Bottom-left, Bottom-right

    for x, y in positions:
        if x == mid_x or y == mid_y:
            continue
        if x < mid_x and y < mid_y:
            quadrants[0] += 1
        elif x > mid_x and y < mid_y:
            quadrants[1] += 1
        elif x < mid_x and y > mid_y:
            quadrants[2] += 1
        elif x > mid_x and y > mid_y:
            quadrants[3] += 1

    return quadrants

quadrant_counts = count_robots_in_quadrants(final_positions, width, height)

safety_factor = 1
for count in quadrant_counts:
    print(count)
    safety_factor *= count

print(safety_factor)

