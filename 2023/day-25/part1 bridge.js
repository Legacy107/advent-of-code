let inputs = `input-here`.split('\n')

let graph = {}
let edges = []
inputs.forEach(input => {
    let [u, v] = input.split(': ')
    v.split(' ').forEach(x => {
        edges.push([u, x])
        graph[u] = graph[u] || []
        graph[u].push(x)
        graph[x] = graph[x] || []
        graph[x].push(u)
    })
})
let n = Object.keys(graph).length
console.log(n, edges.length)

for (let i = 0; i < edges.length; i++)
    for (let j = i + 1; j < edges.length; j++) {
        let removedEdges = [edges[i], edges[j]]

        // find bridges
        let visited = Object.fromEntries(Object.keys(graph).map(x => [x, false]))
        let tin = Object.fromEntries(Object.keys(graph).map(x => [x, -1]))
        let low = Object.fromEntries(Object.keys(graph).map(x => [x, -1]))
        let timer = 0

        const dfs = (v, p = -1) => {
            visited[v] = true
            tin[v] = low[v] = timer++
            for (let to of graph[v]) {
                if (
                    to == p ||
                    removedEdges.some(([ru, rv]) => (
                        (ru === to && rv === v) ||
                        (ru === v && rv === to)
                    ))
                ) continue
                if (visited[to]) {
                    low[v] = Math.min(low[v], tin[to])
                } else {
                    dfs(to, v)
                    if (removedEdges.length === 3) return
                    low[v] = Math.min(low[v], low[to])
                    if (low[to] > tin[v]) {
                        removedEdges.push([v, to])
                        return
                    }
                }
            }
        }
        for (let u of Object.keys(graph)) {
            if (!visited[u]) {
                dfs(u);
                if (removedEdges.length === 3) break
            }
        }

        if (removedEdges.length < 3) continue

        // find components
        visited = Object.fromEntries(Object.keys(graph).map(x => [x, false]))
        let componentSizes = []
        for (let u of Object.keys(graph))
            if (!visited[u]) {
                cnt = 0
                let queue = [u]
                visited[u] = true
                while (queue.length) {
                    let v = queue.shift()
                    cnt++
                    for (x of graph[v]) {
                        if (
                            !visited[x] &&
                            !removedEdges.some(([ru, rv]) => (
                                (ru === v && rv === x) ||
                                (ru === x && rv === v)
                            ))
                        ) {
                            queue.push(x)
                            visited[x] = true
                        }
                    }
                }
                componentSizes.push(cnt)
            }
        if (componentSizes.length === 2) {
            console.log(componentSizes[0] * componentSizes[1])
            console.log(removedEdges, componentSizes)
            break
        }
    }
