let inputs = `input-here`.split('\n')

let graph = {}
let rgraph = {}
let edges = []
let vertices = new Set()
inputs.forEach(input => {
    let [u, v] = input.split(': ')
    v.split(' ').forEach(x => {
        edges.push([u, x])
        graph[u] = graph[u] || []
        graph[x] = graph[x] || []
        graph[u].push(x)
        rgraph[u] = rgraph[u] || []
        rgraph[x] = rgraph[x] || []
        rgraph[x].push(u)

        vertices.add(u)
        vertices.add(x)
    })
})
vertices = [...vertices]
let n = vertices.length
console.log(n, edges.length)

// max flow on undirected graph
let capacity
let flow
let revFlow
let parent
let s, t

let bfs = (s, t) => {
    let visited = Object.fromEntries(vertices.map(x => [x, false]))
    let queue = [s]
    visited[s] = true
    while (queue.length) {
        let u = queue.shift()
        graph[u].forEach(v => {
            if (!visited[v] && capacity[u][v] - flow[u][v] > 0) {
                queue.push(v)
                visited[v] = true
                parent[v] = [u, false]
            }
        })
        rgraph[u].forEach(v => {
            if (!visited[v] && capacity[u][v] - revFlow[u][v] > 0) {
                queue.push(v)
                visited[v] = true
                parent[v] = [u, true]
            }
        })
    }
    return visited[t]
}
let maxFlow = (s, t) => {
    capacity = Object.fromEntries(vertices.map(x => [
        x,
        Object.fromEntries(vertices.map(y => [y, 0]))
    ]))
    flow = Object.fromEntries(vertices.map(x => [
        x,
        Object.fromEntries(vertices.map(y => [y, 0]))
    ]))
    revFlow = Object.fromEntries(vertices.map(x => [
        x,
        Object.fromEntries(vertices.map(y => [y, 0]))
    ]))
    edges.forEach(([u, v]) => {
        capacity[u][v] = 1
        capacity[v][u] = 1
    })
    parent = Object.fromEntries(vertices.map(x => [x, -1]))

    let maxFlow = 0
    while (bfs(s, t)) {
        let pathFlow = Infinity
        for (let v = t; v != s; v = parent[v][0]) {
            let [u, rev] = parent[v]
            if (rev)
                pathFlow = Math.min(pathFlow, capacity[u][v] - revFlow[u][v])
            else pathFlow = Math.min(pathFlow, capacity[u][v] - flow[u][v])
        }
        for (let v = t; v != s; v = parent[v][0]) {
            let [u, rev] = parent[v]
            if (rev) {
                revFlow[u][v] += pathFlow
                revFlow[v][u] -= pathFlow    
            } else {
                flow[u][v] += pathFlow
                flow[v][u] -= pathFlow
            }
        }
        maxFlow += pathFlow
    }
    return maxFlow
}
let minCut = 0
while (minCut !== 3) {
    s = vertices[Math.floor(Math.random() * n)]
    t = -1
    while (t === -1 || t === s)
        t = vertices[Math.floor(Math.random() * n)]

    minCut = maxFlow(s, t)
    console.log(s, t, minCut)
}

// find components after removing min cut
let visited = Object.fromEntries(vertices.map(x => [x, false]))
let dfs = u => {
    visited[u] = true
    graph[u].forEach(v => {
        if (!visited[v] && capacity[u][v] - flow[u][v] > 0)
            dfs(v)
    })
    rgraph[u].forEach(v => {
        if (!visited[v] && capacity[u][v] - revFlow[u][v] > 0)
            dfs(v)
    })
}
dfs(s)
let comp1 = Object.values(visited).filter(x => x).length
let comp2 = n - comp1
console.log(comp1 * comp2)
