let input = `input-here`

let wfs = input.split('\n\n')[0].split('\n')

wfs = Object.fromEntries(wfs
  .map((el) => el.split('{'))
  .map(([name, rules]) => ([
    name,
    rules
    .slice(0, -1)
    .split(',')
    .map((el) => el.split(':'))
    .map(([condition, wf]) => (!wf ? {
      wf: condition,
      condition: null
    } : {
      wf,
      condition: {
        ele: condition[0],
        type: condition[1],
        value: parseInt(condition.slice(2))
      }
    }))
  ])))

let cnt = 0
let MAX_N = 10000
let parts = {
  x: [1, MAX_N],
  a: [1, MAX_N],
  s: [1, MAX_N],
  m: [1, MAX_N]
}
let queue = [[parts, 'in']]
while (queue.length) {
  let [parts, wf_name] = queue.shift()
  if (wf_name === 'R') continue
  if (wf_name === 'A') {
    cnt += Object.values(parts).reduce((acc, [l, r]) => acc * (r - l + 1), 1)
    continue
  }

  let wf = wfs[wf_name]
  for (let i = 0; i < wf.length; i++) {
    let {
      wf: new_wf,
      condition
    } = wf[i]
    if (!condition) {
      queue.push([parts, new_wf])
      break
    }
    if (condition.type === '<') {
      let key = condition.ele
      let [l, r] = parts[key]
      if (r < condition.value) {
        queue.push([parts, new_wf])
        break
      }
      if (l < condition.value && r >= condition.value) {
        queue.push([{
          ...parts,
          [key]: [l, condition.value - 1]
        }, new_wf])
        queue.push([{
          ...parts,
          [key]: [condition.value, r]
        }, wf_name])
        break
      }
    }
    if (condition.type === '>') {
      let key = condition.ele
      let [l, r] = parts[key]
      if (l > condition.value) {
        queue.push([parts, new_wf])
        break
      }
      if (l <= condition.value && r > condition.value) {
        queue.push([{
          ...parts,
          [key]: [l, condition.value]
        }, wf_name])
        queue.push([{
          ...parts,
          [key]: [condition.value + 1, r]
        }, new_wf])
        break
      }
    }
  }
}

console.log(cnt)
