let rows = `input-here`.split('\n')

let start = []

for (let i = 0; i < rows.length; ++i) {
    for (let j = 0; j < rows[i].length; ++j) {
        if (rows[i][j] === 'S') start.push([i, j])
    }
}

let tr = [-1, 0, 0, 1]
let tc = [0, -1, 1, 0]
let queue = new Set([start[0].join(',')])
let maxSteps = 64
for (let i = 0; i < maxSteps; i++) {
    let newQueue = new Set()
    for (let v of queue) {
        let [r, c] = v.split(',').map((x) => parseInt(x))
        for (let i = 0; i < 4; ++i) {
            let nr = r + tr[i]
            let nc = c + tc[i]
            if (nr < 0 || nr >= rows.length || nc < 0 || nc >= rows[0].length) continue
            if (rows[nr][nc] === '#') continue
            newQueue.add([nr, nc].join(','))
        }
    }
    queue = newQueue
}

console.log(queue.size)
