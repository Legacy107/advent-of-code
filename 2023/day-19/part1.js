let input = `input-here`

let [wfs, parts] = input.split('\n\n').map((el) => el.split('\n'))

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

parts = parts.map((el) => Object.fromEntries(el.slice(1, -1).split(',').map((el) => el.split('=')).map((el) => [el[0], parseInt(el[1])])))

let res = parts.reduce((acc, cur) => {
  let wf_name = 'in'
  while (wf_name !== 'R' && wf_name !== 'A') {
    let wf = wfs[wf_name]
    for (let i = 0; i < wf.length; i++) {
      let {
        wf: new_wf,
        condition
      } = wf[i]
      if (!condition) {
        wf_name = new_wf
        break
      }
      if (condition.type === '<' && cur[condition.ele] < condition.value) {
        wf_name = new_wf
        break
      }
      if (condition.type === '>' && cur[condition.ele] > condition.value) {
        wf_name = new_wf
        break
      }
    }
  }
  console.log(cur, wf_name)
  return acc + (wf_name === 'R' ? 0 : Object.values(cur).reduce((acc, cur) => acc + cur, 0))
}, 0)

console.log(res)
