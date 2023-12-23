let inputs = `input-here`.split('\n')

let bricks = inputs
  .map(x => x.split('~').map(y => y.split(',').map(z => parseInt(z))))
  .map(([c1, c2]) => {
    if (c1[2] > c2[2])
      return [c2, c1]
    return [c1, c2]
  })
  .sort((a, b) => a[0][2] - b[0][2])

// do falling sh*t
function between(a, b, c) {
  return (a <= c && c <= b) || (b <= c && c <= a)
}

function doIntersect(p1, q1, p2, q2) {
  return (
    (p1[0] === q1[0] && p1[0] === p2[0] && between(p1[1], q1[1], p2[1])) ||
    (p1[1] === q1[1] && p1[1] === p2[1] && between(p1[0], q1[0], p2[0])) ||
    (p1[0] === q1[0] && p1[0] === q2[0] && between(p1[1], q1[1], q2[1])) ||
    (p1[1] === q1[1] && p1[1] === q2[1] && between(p1[0], q1[0], q2[0])) ||
    (p2[0] === q2[0] && p2[0] === p1[0] && between(p2[1], q2[1], p1[1])) ||
    (p2[1] === q2[1] && p2[1] === p1[1] && between(p2[0], q2[0], p1[0])) ||
    (p2[0] === q2[0] && p2[0] === q1[0] && between(p2[1], q2[1], q1[1])) ||
    (p2[1] === q2[1] && p2[1] === q1[1] && between(p2[0], q2[0], q1[0])) ||
    (p1[0] === q1[0] && between(p2[0], q2[0], p1[0]) && between(p1[1], q1[1], p2[1]) && between(p1[1], q1[1], q2[1])) ||
    (p1[1] === q1[1] && between(p2[1], q2[1], p1[1]) && between(p1[0], q1[0], p2[0]) && between(p1[0], q1[0], q2[0]))
  )
}

for (let i = 0; i < bricks.length; i++) {
  let max = 0
  bricks.slice(0, i).forEach(x => {
    if (
      x[1][2] < bricks[i][0][2] &&
      doIntersect(
        x[0],
        x[1],
        bricks[i][0],
        bricks[i][1],
      ) &&
      max < x[1][2]
    )
      max = x[1][2]
  })
  bricks[i][1][2] = max + 1 + bricks[i][1][2] - bricks[i][0][2]
  bricks[i][0][2] = max + 1
}
bricks = bricks.sort((a, b) => a[0][2] - b[0][2])

// build graph
let graph = Array.from({
  length: bricks.length + 1
}, () => [])
let inDeg = Array.from({
  length: bricks.length + 1
}, () => 0)

for (let i = 0; i < bricks.length; i++) {
  for (let j = 0; j < i; j++)
    if (bricks[i][0][2] === bricks[j][1][2] + 1 && doIntersect(bricks[i][0], bricks[i][1], bricks[j][0], bricks[j][1])) {
      graph[j].push(i)
      inDeg[i]++
    }
}

// find unsafe bricks
let unsafeBricks = []
for (let i = 0; i < bricks.length; i++) {
  for (let j = 0; j < graph[i].length; j++) {
    let x = graph[i][j]
    if (inDeg[x] === 1) {
      unsafeBricks.push(i)
      break
    }
  }
}

// remove each unsafe brick and count
let tmpInDeg = []
let visited = []

function dfs(v) {
  if (visited[v])
    return 0
  visited[v] = true
  let res = 1
  for (let i = 0; i < graph[v].length; i++) {
    tmpInDeg[graph[v][i]]--
    if (tmpInDeg[graph[v][i]] === 0)
      res += dfs(graph[v][i])
  }
  return res
}

let res = 0
for (let i = 0; i < unsafeBricks.length; i++) {
  visited = Array.from({
    length: bricks.length + 1
  }, () => false)
  tmpInDeg = [...inDeg]
  res += dfs(unsafeBricks[i]) - 1
}

console.log(res)
