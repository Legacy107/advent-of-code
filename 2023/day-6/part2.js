let input = `input-here`
let [time, distance] = input.split('\n').map(line => Number(line.split(/\s+/).slice(1).join('')))
let res = 1

let a = -1
let b = time
let c = -distance

let discriminant = b * b - 4 * a * c
let x1, x2

if (discriminant > 0) {
  x1 = (-b + Math.sqrt(discriminant)) / (2 * a)
  x2 = (-b - Math.sqrt(discriminant)) / (2 * a)
  if (x1 > x2)[x1, x2] = [x2, x1]
  x1 = Math.ceil(x1)
  x2 = Math.floor(x2)
  if (x1 * x1 * a + x1 * b + c === 0)
    x1++
  if (x2 * x2 * a + x2 * b + c === 0)
    x2--
  if (x1 > x2)
    res = 0
  else
    res *= (Math.floor(x2) - Math.ceil(x1) + 1)
} else if (discriminant === 0) {
  x1 = -b / (2 * a);
  let fx1 = Math.floor(x1)
  let cx1 = Math.ceil(x1)
  if (fx1 * fx1 * a + fx1 * b + c !== 0 && cx1 * cx1 * a + cx1 * b + c !== 0)
    res = 0
} else {
  res = 0
}

console.log(res)
