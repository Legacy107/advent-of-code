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

// by observing the graph, rx is connected to vn, hn, ph, kt
// rx will receive a low pulse when all of vn, hn, ph, kt are high
// find the cycle length of vn, hn, ph, kt then find the lcm of them
let entries = {
    vn: [],
    hn: [],
    ph: [],
    kt: [],
}

let step = 0
const update = () => {
    let queue = [['broadcaster', false]]
    while (queue.length) {
        let newQueue = []
        queue.forEach(([id, pulse]) => {
            if (type[id] === 'b') {
                graph[id].forEach((to) => newQueue.push([to, pulse]))
                return
            }

            if (type[id] === '%') {
                if (!pulse) {
                    state[id] = !state[id]
                    graph[id].forEach((to) => newQueue.push([to, state[id]]))
                }
            }

            if (type[id] === '&') {
                if (graph_inv[id].every((to) => state[to])) {
                    state[id] = false
                    graph[id].forEach((to) => newQueue.push([to, false]))
                }
                else {
                    state[id] = true
                    graph[id].forEach((to) => newQueue.push([to, true]))
                    if (entries[id]) entries[id].push(step)
                }
            }
        })
        queue = newQueue
    }
    return false
}

function gcd(a, b) {
    if (b === 0) return a
    return gcd(b, a % b)
}

function lcm(a, b) {
    return a * b / gcd(a, b)
}

while (true) {
    ++step;
    if (update()) break

    let cycleLengths = Object.values(entries).map((x) => x[1] - x[0])
    if (cycleLengths.every((x) => x)) {
        let res = cycleLengths[0]
        for (let i = 1; i < cycleLengths.length; ++i) {
            res = lcm(res, cycleLengths[i])
        }
        console.log(res)
        break
    }
}
