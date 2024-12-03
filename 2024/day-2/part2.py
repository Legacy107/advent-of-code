lines = '''7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
'''.split('\n')

def is_safe(report):
    levels = list(map(int, report.split()))
    increasing = all(1 <= levels[i+1] - levels[i] <= 3 for i in range(len(levels) - 1))
    decreasing = all(1 <= levels[i] - levels[i+1] <= 3 for i in range(len(levels) - 1))
    return increasing or decreasing

def is_safe_with_dampener(report):
    levels = list(map(int, report.split()))
    if is_safe(report):
        return True
    for i in range(len(levels)):
        modified_levels = levels[:i] + levels[i+1:]
        if is_safe(' '.join(map(str, modified_levels))):
            return True
    return False

safe_reports = [report for report in lines if report and is_safe_with_dampener(report)]
print(len(safe_reports))