let lines = `input-here`.split('\n')

let res = lines.reduce((acc, el) => {
  let nums = [[...el.split(' ').map(el => parseInt(el))]]
  while (nums.at(-1).some(el => el))
    nums.push(nums.at(-1).slice(1).map((el, i) => el - nums.at(-1).at(i)))

  return acc + nums.reduceRight((acc, el) => {
    return el[0] - acc
  }, 0)
}, 0)

console.log(res)
