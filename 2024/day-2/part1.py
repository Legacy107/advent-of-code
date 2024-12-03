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

safe_reports = [report for report in lines if report and is_safe(report)]
print(len(safe_reports))