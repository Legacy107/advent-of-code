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
      while (l >= 0 && r < hor.length) {
        if (hor[l] !== hor[r]) {
          flag = false
          break
        }
        l--
        r++
      }
      if (flag)
        return acc + (mir + 1) * 100
    }

    for (let mir = 0; mir < ver.length - 1; mir++) {
      let flag = true
      let l = mir
      let r = mir + 1
      while (l >= 0 && r < ver.length) {
        if (ver[l] !== ver[r]) {
          flag = false
          break
        }
        l--
        r++
      }
      if (flag)
        return acc + mir + 1
    }
  }, 0)

console.log(res)
