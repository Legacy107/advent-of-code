let rows = `input-here`.split('\n')

let start = [0, 1]
let end = [rows.length - 1, rows[0].length - 2]
let tr = [-1, 0, 0, 1]
let tc = [0, -1, 1, 0]

// build graph
let visited = Array.from({ length: rows.length }, () => Array(rows[0].length).fill(false))
visited[start[0]][start[1]] = true
let vertices = [start, end]
let graph = [[], []]
let queue = [start]
while (queue.length) {
    let [x, y] = queue.shift()
    let cnt = 0
    for (let i = 0; i < 4; i++) {
        let nx = x + tr[i]
        let ny = y + tc[i]
        if (nx < 0 || nx >= rows.length || ny < 0 || ny >= rows[0].length || rows[nx][ny] === '#' || visited[nx][ny]) continue
        visited[nx][ny] = true
        queue.push([nx, ny])
        ++cnt
    }
    // find conjunctions => vertices
    if (cnt > 1) {
        vertices.push([x, y])
        graph.push([])
    }
}
// build weighted edges
for (let i = 0; i < vertices.length; i++) {
    let dist = Array.from({ length: rows.length }, () => Array(rows[0].length).fill(-1))
    dist[vertices[i][0]][vertices[i][1]] = 0
    let queue = [vertices[i]]
    while (queue.length) {
        let [x, y] = queue.shift()
        for (let k = 0; k < 4; k++) {
            let nx = x + tr[k]
            let ny = y + tc[k]
            if (nx < 0 || nx >= rows.length || ny < 0 || ny >= rows[0].length || rows[nx][ny] === '#' || dist[nx][ny] !== -1) continue
            dist[nx][ny] = dist[x][y] + 1

            let vertex = vertices.findIndex(v => v[0] === nx && v[1] === ny)
            if (vertex !== -1) {
                graph[i].push([vertex, dist[nx][ny]])
                continue
            }
            queue.push([nx, ny])
        }
    }
}

// brute force
let res = -1
function dfs(u, dist) {
    if (u === 1) {
        res = Math.max(res, dist[u])
        return
    }
    for (let i = 0; i < graph[u].length; i++) {
        if (dist[graph[u][i][0]] === -1) {
            let newDist = [...dist]
            newDist[graph[u][i][0]] = dist[u] + graph[u][i][1]
            dfs(graph[u][i][0], newDist)
        }
    }
}

let dist = new Array(vertices.length).fill(-1)
dist[0] = 0
dfs(0, [...dist])

console.log(res)
