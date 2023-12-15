let inputs = `input-here`.split(',')

let res = inputs.reduce((acc, cur) => {
  let hash = 0;
  for (let i = 0; i < cur.length; i++) {
    hash = (hash + cur.charCodeAt(i)) * 17 % 256;
  }
  return acc + hash;
}, 0)

console.log(res)
