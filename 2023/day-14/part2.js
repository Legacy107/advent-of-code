let rows = `input-here`.split('\n').map(x => x.split(''));

let arr = [];

let n = 1000000000;
while (true) {
    let res = 0;
    
    // north
    for (let i = 0; i < rows[0].length; i += 1) {
        let cnt = 0;
        for (let j = rows.length - 1; j >= 0; j += -1) {
            if (rows[j][i] === 'O') {
                rows[j][i] = '.';
                cnt++;
            }
            if (rows[j][i] === '#') {
                for (let k = j + 1; k <= j + cnt; k += 1) {
                    rows[k][i] = 'O';
                }
                cnt = 0;
            }
        }
        if (cnt) {
            for (let k = 0; k < cnt; k += 1) {
                rows[k][i] = 'O';
            }
        }
    }
    
    // west
    for (let i = 0; i < rows.length; i += 1) {
        let cnt = 0;
        for (let j = rows[0].length - 1; j >= 0; j += -1) {
            if (rows[i][j] === 'O') {
                rows[i][j] = '.';
                cnt++;
            }
            if (rows[i][j] === '#') {
                for (let k = j + 1; k <= j + cnt; k += 1) {
                    rows[i][k] = 'O';
                }
                cnt = 0;
            }
        }
        if (cnt) {
            for (let k = 0; k < cnt; k += 1) {
                rows[i][k] = 'O';
            }
        }
    }
    
    // south
    for (let i = 0; i < rows[0].length; i += 1) {
        let cnt = 0;
        for (let j = 0; j < rows.length; j += 1) {
            if (rows[j][i] === 'O') {
                rows[j][i] = '.';
                cnt++;
            }
            if (rows[j][i] === '#') {
                for (let k = j - 1; k >= j - cnt; k += -1) {
                    rows[k][i] = 'O';
                }
                cnt = 0;
            }
        }
        if (cnt) {
            for (let k = rows.length - 1; k >= rows.length - cnt; k += -1) {
                rows[k][i] = 'O';
            }
        }
    }
    
    // east
    for (let i = 0; i < rows.length; i += 1) {
        let cnt = 0;
        for (let j = 0; j < rows[0].length; j += 1) {
            if (rows[i][j] === 'O') {
                rows[i][j] = '.';
                cnt++;
            }
            if (rows[i][j] === '#') {
                for (let k = j - 1; k >= j - cnt; k += -1) {
                    rows[i][k] = 'O';
                }
                res += cnt * (rows.length - i)
                cnt = 0;
            }
        }
        if (cnt) {
            for (let k = rows[0].length - 1; k >= rows[0].length - cnt; k += -1) {
                rows[i][k] = 'O';
            }
        }
        res += cnt * (rows.length - i)
    }

    arr.push(res);

    // check recurring pattern
    if (arr.length > 5) {
        let flag = false;
        for (let patternLength = 1; patternLength <= arr.length / 5; patternLength += 1) {
            let pattern1 = arr.slice(-patternLength);
            let pattern2 = arr.slice(-patternLength * 2, -patternLength);
            let pattern3 = arr.slice(-patternLength * 3, -patternLength * 2);
            let pattern4 = arr.slice(-patternLength * 4, -patternLength * 3);
            let pattern5 = arr.slice(-patternLength * 5, -patternLength * 4);
            if (pattern1.join('') === pattern2.join('') &&
                pattern2.join('') === pattern3.join('') &&
                pattern3.join('') === pattern4.join('') &&
                pattern4.join('') === pattern5.join('')
            ) {
                let pos = (n - arr.length + patternLength * 5) % patternLength;
                console.log(pattern1[((pos - 1) + patternLength) % patternLength]);
                flag = true;
                break;
            }
        }
        if (flag) {
            break;
        }
    }
}
