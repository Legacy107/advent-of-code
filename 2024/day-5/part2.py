lines1 = '''47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13'''.split('\n')

lines2 = '''75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47'''.split('\n')

def parse_rules(rules):
    order_rules = {}
    for rule in rules:
        y, x = map(int, rule.split('|'))
        if x not in order_rules:
            order_rules[x] = []
        order_rules[x].append(y)
    return order_rules

def is_valid_update(update, order_rules):
    for i in range(len(update)):
        for j in range(i + 1, len(update)):
            if update[j] in order_rules.get(update[i], []):
                return False
    return True

def find_middle_page(update):
    return update[len(update) // 2]

def correct_order(update, order_rules):
    sorted_update = []
    while update:
        for i, page in enumerate(update):
            if all(page not in order_rules.get(other, []) for other in update if other != page):
                sorted_update.append(page)
                update.pop(i)
                break
    return sorted_update

rules = parse_rules(lines1)
valid_updates = []
invalid_updates = []

for line in lines2:
    update = list(map(int, line.split(',')))
    if is_valid_update(update, rules):
        valid_updates.append(find_middle_page(update))
    else:
        invalid_updates.append(update)

corrected_updates = [correct_order(update, rules) for update in invalid_updates]
corrected_middle_pages = [find_middle_page(update) for update in corrected_updates]

result = sum(corrected_middle_pages)
print(result)