let [instructions, edge_inputs] = `input-here`.split('\n\n')
let edges = edge_inputs
  .split('\n')
  .map(el => el.split(' = '))
  .map(el => [el[0], ...el[1].slice(1, el[1].length - 1).split(', ')])
let graph = {
  'L': Object.fromEntries(edges.map(el => el.slice(0, 2))),
  'R': Object.fromEntries(edges.map(el => [el[0], el[2]])),
}

let i = 0
let st = []
let cnt = 0
while (true) {
  st = graph[instructions[i]][st]
  ++cnt
  i = (i + 1) % instructions.length
  if (st === 'ZZZ') break
}

console.log(cnt)
