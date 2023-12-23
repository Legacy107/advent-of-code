let inputs = `input-here`.split('\n')

// build graph
let graph = {}
let graph_inv = {}
let type = {}
let state = {}

for (let input of inputs) {
    let [from, to] = input.split(' -> ')
    let from_type, from_id
    if (from === 'broadcaster') {
        from_type = 'b'
        from_id = 'broadcaster'
    } else {
        from_type = from[0]
        from_id = from.slice(1)
    }
    state[from_id] = false
    type[from_id] = from_type
    graph[from_id] = to.split(', ')
    to.split(', ').forEach((to) => {
        if (!graph_inv[to]) graph_inv[to] = []
        graph_inv[to].push(from_id)
    })
}

let cnt = {
    false: 0,
    true: 0,
}
const update = () => {
    let queue = [['broadcaster', false]]
    while (queue.length) {
        let newQueue = []
        queue.forEach(([id, pulse]) => {
            if (type[id] === 'b') {
                graph[id].forEach((to) => newQueue.push([to, pulse]))
                cnt[pulse] += graph[id].length
                return
            }

            if (type[id] === '%') {
                if (!pulse) {
                    state[id] = !state[id]
                    graph[id].forEach((to) => newQueue.push([to, state[id]]))
                    cnt[state[id]] += graph[id].length
                }
            }

            if (type[id] === '&') {
                if (graph_inv[id].every((to) => state[to])) {
                    state[id] = false
                    graph[id].forEach((to) => newQueue.push([to, false]))
                    cnt[false] += graph[id].length
                }
                else {
                    state[id] = true
                    graph[id].forEach((to) => newQueue.push([to, true]))
                    cnt[true] += graph[id].length
                }
            }
        })
        queue = newQueue
    }
}

for (let i = 0; i < 1000; i++) {
    ++cnt[false]
    update()
}

console.log(cnt, cnt[true] * cnt[false])
