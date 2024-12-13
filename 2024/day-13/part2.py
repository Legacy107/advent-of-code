def parse_machine(machine_lines):
    button_a = {}
    button_b = {}
    prize = {}
    for line in machine_lines:
        if line.startswith("Button A"):
            parts = line.split(',')
            button_a['x'] = int(parts[0].split('+')[1])
            button_a['y'] = int(parts[1].split('+')[1])
        elif line.startswith("Button B"):
            parts = line.split(',')
            button_b['x'] = int(parts[0].split('+')[1])
            button_b['y'] = int(parts[1].split('+')[1])
        elif line.startswith("Prize"):
            parts = line.split(',')
            prize['x'] = int(parts[0].split('=')[1]) + 10000000000000
            prize['y'] = int(parts[1].split('=')[1]) + 10000000000000
    return {
        'button_a': button_a,
        'button_b': button_b,
        'prize': prize
    }

def parse_input(input_lines):
    machines = []
    current_machine = []
    for line in input_lines:
        if line.strip() == "":
            if current_machine:
                machines.append(parse_machine(current_machine))
                current_machine = []
        else:
            current_machine.append(line)
    if current_machine:
        machines.append(parse_machine(current_machine))
    return machines

def find_min_tokens(button_a, button_b, prize):
    A_x, A_y = button_a['x'], button_a['y']
    B_x, B_y = button_b['x'], button_b['y']
    P_x, P_y = prize['x'], prize['y']
    
    denom = A_y * B_x - A_x * B_y
    num = P_y * B_x - P_x * B_y
    
    if denom == 0:
        return None  # No solution or infinite solutions; not handled here
    if num % denom != 0:
        return None  # No integer solution
    
    a = num // denom
    if a < 0:
        return None
    
    if (P_x - A_x * a) % B_x != 0:
        return None
    b = (P_x - A_x * a) // B_x
    if b < 0:
        return None
    
    return a * 3 + b


input_lines = '''Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
'''.strip().split('\n')

machines = parse_input(input_lines)

total_tokens = 0
for machine in machines:
    button_a = machine['button_a']
    button_b = machine['button_b']
    prize = machine['prize']
    min_tokens = find_min_tokens(button_a, button_b, prize)
    if min_tokens is not None:
        total_tokens += min_tokens

print(total_tokens)
