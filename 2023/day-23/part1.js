let rows = `input-here`.split('\n')

let start = [0, 1]
let end = [rows.length - 1, rows[0].length - 2]

let tr = [-1, 0, 0, 1]
let tc = [0, -1, 1, 0]
let hills = ['^', '<', '>', 'v']
let res = -1

function dfs(x, y, dist) {
    if (x === end[0] && y === end[1]) {
        res = Math.max(res, dist[x * rows[0].length + y])
        return
    }
    if (rows[x][y] !== '.' && rows[x][y] !== '#') {
        let idx = hills.indexOf(rows[x][y])
        let nx = x + tr[idx]
        let ny = y + tc[idx]
        if (nx < 0 || nx >= rows.length || ny < 0 || ny >= rows[0].length || rows[nx][ny] === '#' || dist[nx * rows[0].length + ny] !== -1) return
        let newDist = [...dist]
        newDist[nx * rows[0].length + ny] = dist[x * rows[0].length + y] + 1
        dfs(nx, ny, newDist)
        return
    }
    for (let i = 0; i < 4; i++) {
        let nx = x + tr[i]
        let ny = y + tc[i]
        if (nx < 0 || nx >= rows.length || ny < 0 || ny >= rows[0].length || rows[nx][ny] === '#' || dist[nx * rows[0].length + ny] !== -1) continue
        let newDist = [...dist]
        newDist[nx * rows[0].length + ny] = dist[x * rows[0].length + y] + 1
        dfs(nx, ny, newDist)
    }
}

let dist = new Array(rows.length * rows[0].length).fill(-1)
dist[start[0] * rows[0].length + start[1]] = 0
dfs(start[0], start[1], [...dist])

console.log(res)
