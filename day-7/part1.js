let valMap = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse()
let res = `input-here`
  .split('\n')
  .map(el => el.split(' '))
  .map(el => [
    el[0],
    parseInt(el[1]),
    el[0].split('').sort((a, b) => valMap.indexOf(b) - valMap.indexOf(a))
  ])
  .map(el => [...el, (() => {
    let arr = el[2]
    let val = Array.from({
      length: 5
    }, () => 0)
    let cnt = 0
    let last = ''
    for (let i = 0; i < arr.length; i++) {
      if (last === arr[i]) {
        cnt++
      } else if (cnt) {
        val[cnt - 1]++
        cnt = 0
      }
      last = arr[i]
    }
    if (cnt) val[cnt - 1]++
    if (val[0] && val[1]) return 90
    return val.reduceRight((prev, cur) => prev * 10 + cur, 0)
  })()])
  .sort((a, b) => {
    if (a[3] !== b[3]) return a[3] - b[3]
    let i = 0
    while (a[0][i] === b[0][i]) i++
    return valMap.indexOf(a[0][i]) - valMap.indexOf(b[0][i])
  })
  .reduce((prev, cur, id) => prev + cur[1] * (id + 1), 0)

console.log(res)