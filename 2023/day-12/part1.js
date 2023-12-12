let rows = `input-here`.split('\n')

let res = rows
  .map(row => {
    let [arr, conf] = row.split(' ')
    return {
      arr: arr.split(''),
      pos: Array.from(arr.matchAll(/\?/g)).map(x => x.index),
      conf: conf.split(',').map(x => parseInt(x))
    }
  })
  .reduce((acc, {
    arr,
    pos,
    conf
  }) => {
    let confCnt = 0
    for (let mask = 0; mask < 2 ** pos.length; mask++) {
      let arr2 = [...arr]
      let mask2 = mask
      for (let i = 0; i < pos.length; i++) {
        arr2[pos[i]] = mask2 % 2 ? '#' : '.'
        mask2 = Math.floor(mask2 / 2)
      }
      let confId = 0
      let cnt = 0
      let flag = true
      for (let i = 0; i < arr2.length; i++) {
        if (arr2[i] === '#')
          ++cnt
        else if (cnt) {
          if (confId >= conf.length || cnt !== conf[confId++]) {
            flag = false
            break
          }
          cnt = 0
        }
      }
      if (cnt && (confId >= conf.length || cnt !== conf[confId++]))
        flag = false

      if (flag && confId === conf.length)
        ++confCnt
    }
    return acc + confCnt
  }, 0)

console.log(res)
