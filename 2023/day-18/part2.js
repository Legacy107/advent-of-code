let inputs = `input-here`.split('\n')

const hex2Dec = (hex) => parseInt(hex, 16)
let tr = [0, 1, 0, -1]
let tc = [1, 0, -1, 0]

let b = inputs
  .map((el) => el.split(' ').at(-1).slice(1, -1))
  .map((el) => [hex2Dec(el.slice(1, -1)), parseInt(el.at(-1))])
let vertices = b.reduce((acc, cur) => {
  let [l, dir] = cur
  acc.push([acc.at(-1)[0] + l * tr[dir], acc.at(-1)[1] + l * tc[dir]])
  return acc
}, [
  [0, 0]
])

let area = 0
for (let i = 0; i < vertices.length - 1; i++) {
  let [x1, y1] = vertices[i]
  let [x2, y2] = vertices[i + 1]
  area += x1 * y2 - x2 * y1
}
area = Math.abs(area) / 2

let edgeArea = 0
for (let i = 0; i < b.length; i++)
  edgeArea += b[i][0]
edgeArea /= 2

console.log(area + edgeArea + 1) // dun know why +1 but it works
