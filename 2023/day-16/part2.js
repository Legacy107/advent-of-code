let rows = `input-here`.split('\n')

const getDir = (x, y, c) => {
    if (c === '\\')
        return [[y, x]]
    if (c === '/')
        return [[-y, -x]]
    if (c === '|')
        if (x)
            return [[x, y]]
        else
            return [[1, 0], [-1, 0]]
    if (c === '-')
        if (y)
            return [[x, y]]
        else
            return [[0, 1], [0, -1]]

    return [[x, y]]
}

const countActivated = (x, y, dx, dy) => {
    let queue = []
    let visited = new Set()
    let activated = new Set()
    queue.push([x, y, dx, dy])
    
    while (queue.length) {
        let cur = queue.shift()
        let [x, y, dx, dy] = cur
    
        let [x2, y2] = [x + dx, y + dy]
        if (x2 < 0 || x2 >= rows.length || y2 < 0 || y2 >= rows[0].length)
            continue
    
        let dirs = getDir(dx, dy, rows[x2][y2])
        for (let [dx2, dy2] of dirs) {
            const str = [x2, y2, dx2, dy2].join(',')
            if (!visited.has(str)) {
                visited.add(str)
                activated.add([x2, y2].join(','))
                queue.push([x2, y2, dx2, dy2])
            }
        }
    }
    
    for (let i = 0; i < rows.length; i++) {
        let str = ''
        for (let j = 0; j < rows[0].length; j++)
            if (activated.has([i, j].join(',')))
                str += '#'
            else str += rows[i][j]
    }

    return activated.size
}

let res = 0
for (let i = 0; i < rows.length; i++) {
    res = Math.max(res, countActivated(i, -1, 0, 1))
    res = Math.max(res, countActivated(i, rows[0].length, 0, -1))
}
for (let i = 0; i < rows[0].length; i++) {
    res = Math.max(res, countActivated(-1, i, 1, 0))
    res = Math.max(res, countActivated(rows.length, i, -1, 0))
}

console.log(res)
