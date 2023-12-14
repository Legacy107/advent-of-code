let rows = `input-here`.split('\n').map(x => x.split(''));

let res = 0;

for (let i = 0; i < rows[0].length; i++) {
    let cnt = 0;
    for (let j = rows.length - 1; j >= 0; j--) {
        if (rows[j][i] === 'O') {
            cnt++;
        }
        if (rows[j][i] === '#') {
            let p1 = rows.length - j - 1;
            let p2 = p1 - cnt + 1;
            res += (p1 + p2) * cnt / 2;
            cnt = 0;
        }
    }
    if (cnt) {
        let p1 = rows.length;
        let p2 = p1 - cnt + 1;
        res += (p1 + p2) * cnt / 2;
    }
}

console.log(res);
