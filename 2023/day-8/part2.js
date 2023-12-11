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
let st = edges
  .filter(el => el[0].endsWith('A'))
  .map(el => el[0])
let cnt = 0
while (true) {
  ++cnt
  st = st
    .map(el => typeof(el) === 'string' ? graph[instructions[i]][el] : el)
    .map(el => typeof(el) === 'string' && el.endsWith('Z') ? cnt : el)
  i = (i + 1) % instructions.length
  if (st.every(el => typeof(el) === 'number')) break
}

const gcd = (a, b) => {
  if (b === 0) return a
  return gcd(b, a % b)
}

const lcm = (arr) => {
  let ans = arr[0]
  for (let i = 1; i < arr.length; ++i) {
    ans = (ans * arr[i]) / gcd(ans, arr[i])
  }
  return ans
}

console.log(lcm(st))
