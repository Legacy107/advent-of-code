let rows = `input-here`.split('\n')

let start = []

for (let i = 0; i < rows.length; ++i) {
    for (let j = 0; j < rows[i].length; ++j) {
        if (rows[i][j] === 'S') {
            start = [i, j]
            break
        }
    }
    if (start.length) break
}

let tr = [-1, 0, 0, 1]
let tc = [0, -1, 1, 0]

let getChar = (r, c) => {
    r = ((r % rows.length) + rows.length) % rows.length
    c = ((c % rows[0].length) + rows[0].length) % rows[0].length
    return rows[r][c]
}

let maxx = 202300
let n = rows.length

const sol = (maxSteps) => {
    let dist = new Map()
    // let maxSteps = 26501365
    let queue = [start]
    dist.set(start.join(','), 0)
    
    while (queue.length) {
        let [r, c] = queue.shift()
        if (dist.get([r, c].join(',')) === maxSteps) continue
    
        for (let i = 0; i < 4; ++i) {
            let nr = r + tr[i]
            let nc = c + tc[i]
            if (getChar(nr, nc) === '#') continue
    
            let key = [nr, nc].join(',')
            if (dist.has(key)) continue
    
            dist.set(key, dist.get([r, c].join(',')) + 1)
            queue.push([nr, nc])
        }
    }
    return Array.from(dist.values()).filter(x => (x % 2) === (maxSteps % 2)).length
}

let base = sol(65)
console.log(0, base)
for (let i = 1; i < 10; ++i) {
    console.log(i, sol(65 + i * n))
}

/**
 * counting cells within the diamond shape doesn't work cuz some cells are not reachable
 * within the max steps constraint despite being within the diamond shape
 * 
 * max steps is a multiple of the map size
 * fit a parabola to the data points
 */