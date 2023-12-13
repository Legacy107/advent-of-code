let inputs = `input-here`.split('\n\n')

let res = inputs
  .map(x => {
    let hor = x.split('\n')
    let ver = []
    for (let i = 0; i < hor[0].length; i++) {
      ver.push(hor.map(x => x[i]).join(''))
    }
    return {
      hor,
      ver
    }
  })
  .reduce((acc, {
    hor,
    ver
  }) => {
    for (let mir = 0; mir < hor.length - 1; mir++) {
      let flag = true
      let l = mir
      let r = mir + 1
      let cntDiff = 0
      while (l >= 0 && r < hor.length) {
        for (let i = 0; i < hor[l].length; i++) {
          if (hor[l][i] !== hor[r][i]) {
            if (cntDiff) {
              flag = false
              break
            }
            cntDiff++
          }
        }
        l--
        r++
      }
      if (flag && cntDiff)
        return acc + (mir + 1) * 100
    }

    for (let mir = 0; mir < ver.length - 1; mir++) {
      let flag = true
      let l = mir
      let r = mir + 1
      let cntDiff = 0
      while (l >= 0 && r < ver.length) {
        for (let i = 0; i < ver[l].length; i++) {
          if (ver[l][i] !== ver[r][i]) {
            if (cntDiff) {
              flag = false
              break
            }
            cntDiff++
          }
        }
        l--
        r++
      }
      if (flag && cntDiff)
        return acc + mir + 1
    }
  }, 0)

console.log(res)
