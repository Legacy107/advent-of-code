let inputs = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`.split(',')

const hash = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash + str.charCodeAt(i)) * 17 % 256
  }
  return hash
}

let res = inputs
  .reduce((acc, cur) => {
    const op = cur.indexOf('-') !== -1 ? 'pop' : 'push'
    let [label, value] = cur.split(/=|-/)
    const box = hash(label)
    value = parseInt(value)

    if (op === 'pop') {
      acc[box] = acc[box].filter((item) => item.label !== label)
    } else {
      const idx = acc[box].findIndex((item) => item.label === label)
      if (idx !== -1) {
        acc[box][idx].value = value
      } else
        acc[box].push({
          label,
          value
        })
    }

    return acc
  }, Array.from({
    length: 256
  }, () => []))
  .reduce((acc, cur, box) => {
    return acc + cur.reduce((acc, cur, slot) => {
      return acc + (box + 1) * (slot + 1) * cur.value
    }, 0)
  }, 0)

console.log(res)
