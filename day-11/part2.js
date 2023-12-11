let arr = `input-here`.split('\n').map(row => row.split(''))

let emptyRowPrefixSum = Array.from({
  length: arr.length
}, () => 0)
let emptyColPrefixSum = Array.from({
  length: arr[0].length
}, () => 0)

arr.forEach((row, i) => {
  emptyRowPrefixSum[i] = (row.every(x => x === '.') ? 1 : 0) + emptyRowPrefixSum.at(i - 1, 0)
})
arr[0].forEach((_, i) => {
  emptyColPrefixSum[i] = (arr.every(row => row[i] === '.') ? 1 : 0) + emptyColPrefixSum.at(i - 1, 0)
})

let galaxies = []
arr.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col === '#') {
      galaxies.push([i, j])
    }
  })
})

let sumDis = galaxies.reduce((acc, [i, j], idx) => (
  acc + galaxies.slice(idx + 1).reduce((acc, [k, l]) => (
    acc
      + Math.abs(i - k)
      + Math.abs(j - l)
      + (emptyRowPrefixSum.at(Math.max(i, k)) - emptyRowPrefixSum.at(Math.min(i, k))) * 999999
      + (emptyColPrefixSum.at(Math.max(j, l)) - emptyColPrefixSum.at(Math.min(j, l))) * 999999
  ), 0)
), 0)

console.log(sumDis)
