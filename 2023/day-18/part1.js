let inputs = `input-here`.split('\n')

let arr = Array.from({
  length: 2000
}, () => Array.from({
  length: 2000
}, () => 0))
let tr = [-1, 0, 0, 1]
let tc = [0, -1, 1, 0]
let dir = {
  'U': 0,
  'L': 1,
  'R': 2,
  'D': 3,
}
let b = inputs
  .map((el) => el.split(' '))
  .map((input) => [dir[input[0]], parseInt(input[1])])

let x = 1000,
  y = 1000
arr[x][y] = 1

b.forEach((input) => {
  let direction = input[0]
  let steps = input[1]

  for (let i = 0; i < steps; i++) {
    x += tr[direction]
    y += tc[direction]
    arr[x][y] = 1
  }
})

let cnt = 0
let queue = []
queue.push([0, 0])
while (queue.length) {
  let [r, c] = queue.shift()
  if (r < 0 || r >= 2000 || c < 0 || c >= 2000) continue
  if (arr[r][c]) continue
  arr[r][c] = 2
    ++cnt;
  for (let i = 0; i < 4; i++)
    queue.push([r + tr[i], c + tc[i]])
}

console.log(2000 * 2000 - cnt)
