let inputs = `input-here`.split('\n')

let stones = inputs.map((line) => {
  let [x, y, z] = line.split(' @ ')[0].split(/,\s+/g).map((n) => parseInt(n))
  let [dx, dy, dz] = line.split(' @ ')[1].split(/,\s+/g).map((n) => parseInt(n))
  return {
    a: dy / dx,
    b: -1,
    c: (dy * x / dx) - y,
    x,
    y,
    dx,
    dy,
  }
})

function lineIntersection(a, b) {
  let det = a.a * b.b - b.a * a.b
  if (det === 0) return null
  let x = (b.b * a.c - a.b * b.c) / det
  let y = (a.a * b.c - b.a * a.c) / det
  return {
    x,
    y
  }
}

const MIN = 200000000000000
const MAX = 400000000000000
let res = 0

for (let i = 0; i < stones.length; i++) {
  for (let j = i + 1; j < stones.length; j++) {
    let intersection = lineIntersection(stones[i], stones[j])
    if (
      intersection &&
      intersection.x >= MIN &&
      intersection.y >= MIN &&
      intersection.x <= MAX &&
      intersection.y <= MAX && 
      (stones[i].dx < 0 ? intersection.x <= stones[i].x : intersection.x >= stones[i].x) &&
      (stones[i].dy < 0 ? intersection.y <= stones[i].y : intersection.y >= stones[i].y) &&
      (stones[j].dx < 0 ? intersection.x <= stones[j].x : intersection.x >= stones[j].x) &&
      (stones[j].dy < 0 ? intersection.y <= stones[j].y : intersection.y >= stones[j].y)
    )
      res++
  }
}

console.log(res)
