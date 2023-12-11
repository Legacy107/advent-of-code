let arr = `input-here`.split('\n').map(row => row.split(''))
let dirs2Coords = {
  'u': [-1, 0],
  'd': [1, 0],
  'r': [0, 1],
  'l': [0, -1],
}
let connectedDirs = {
  'u': 'd',
  'd': 'u',
  'r': 'l',
  'l': 'r',
}
let chars2Dirs = {
  'S': ['u', 'd', 'r', 'l'],
  '|': ['u', 'd'],
  'F': ['r', 'd'],
  'J': ['u', 'l'],
  '7': ['l', 'd'],
  '-': ['r', 'l'],
  'L': ['u', 'r'],
}
let dirs2Chars = Object.entries(chars2Dirs).reduce((acc, [char, dirs]) => {
  dirs.forEach(dir => {
    acc[dir].push(char)
  })
  return acc
}, {
  'u': [],
  'd': [],
  'r': [],
  'l': [],
})
let graph = Object.fromEntries(
  Object.entries(chars2Dirs)
  .map(([char, dirs]) => [
    char,
    Object.fromEntries(dirs.map(dir => [dir, dirs2Chars[connectedDirs[dir]]]))
  ])
)

let posStart = [-1, -1]
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[i].length; j++) {
    if (arr[i][j] === 'S') {
      posStart = [i, j]
      break;
    }
  }
  if (posStart[0] !== -1) break;
}
let dirsStart = []

// find the loop
let queue = [posStart]
let isLoop = Array.from({
  length: arr.length
}, () => Array.from({
  length: arr[0].length
}, () => false))
isLoop[posStart[0]][posStart[1]] = true
while (queue.length) {
  let [i, j] = queue.shift()
  let adj = graph[arr[i][j]]
  Object.entries(adj).forEach(([dir, chars]) => {
    let [di, dj] = dirs2Coords[dir]
    let [ni, nj] = [i + di, j + dj]
    if (chars.indexOf(arr?.[ni]?.[nj]) !== -1 && !isLoop[ni][nj]) {
      isLoop[ni][nj] = true
      queue.push([ni, nj])
      if (i === posStart[0] && j === posStart[1]) dirsStart.push(dir)
    }
  })
}

// replace start with correct pipe
let startChars = dirsStart.map(dir => dirs2Chars[dir])
arr[posStart[0]][posStart[1]] = startChars[0].filter(char => char !== 'S' && startChars[1].indexOf(char) !== -1)[0]

// scale up the array by 2
let doubleArr = Array.from({
  length: arr.length * 2
}, () => Array.from({
  length: arr[0].length * 2
}, () => '.'))
let doubleIsLoop = Array.from({
  length: doubleArr.length
}, () => Array.from({
  length: doubleArr[0].length
}, () => false))
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[i].length; j++) {
    doubleArr[i * 2][j * 2] = arr[i][j]
    doubleIsLoop[i * 2][j * 2] = isLoop[i][j]
  }
}
// fill in the empty spaces by connecting adjacent pipes
for (let i = 0; i < doubleArr.length; i++) {
  for (let j = 0; j < doubleArr[i].length; j++)
    if (!doubleIsLoop[i][j])
      Object.entries(connectedDirs).forEach(([dir1, dir2]) => {
        let [x1, y1] = [i + dirs2Coords[dir1][0], j + dirs2Coords[dir1][1]]
        let [x2, y2] = [i + dirs2Coords[dir2][0], j + dirs2Coords[dir2][1]]
        if (
          doubleIsLoop?.[x1]?.[y1] && doubleIsLoop?.[x2]?.[y2] &&
          chars2Dirs[doubleArr[x1][y1]].indexOf(dir2) !== -1 &&
          chars2Dirs[doubleArr[x2][y2]].indexOf(dir1) !== -1
        ) {
          doubleIsLoop[i][j] = true
          doubleArr[i][j] = Object.entries(chars2Dirs).filter(([char, dirs]) => (
            char !== 'S' && dirs.indexOf(dir1) !== -1 && dirs.indexOf(dir2) !== -1
          ))[0][0]
        }
      })
}

// flood fill from outside
queue = [
  ...Array.from({
    length: doubleArr.length
  }, (_, id) => [id, -1]),
  ...Array.from({
    length: doubleArr.length
  }, (_, id) => [id, doubleArr[0].length]),
  ...Array.from({
    length: doubleArr[0].length
  }, (_, id) => [-1, id]),
  ...Array.from({
    length: doubleArr[0].length
  }, (_, id) => [doubleArr.length, id]),
]
let isConnectedToOutside = Array.from({
  length: doubleArr.length
}, () => Array.from({
  length: doubleArr[0].length
}, () => false))
let tr = [-1, 0, 0, 1]
let tc = [0, -1, 1, 0]
while (queue.length) {
  let [i, j] = queue.shift()
  for (let k = 0; k < 4; k++) {
    let [ni, nj] = [i + tr[k], j + tc[k]]
    if (doubleArr?.[ni]?.[nj] && !isConnectedToOutside[ni][nj] && !doubleIsLoop[ni][nj]) {
      isConnectedToOutside[ni][nj] = true
      queue.push([ni, nj])
    }
  }
}

let cnt = 0
for (let i = 0; i < arr.length; i++)
  for (let j = 0; j < arr[i].length; j++)
    if (!isLoop[i][j] && !isConnectedToOutside[i * 2][j * 2]) cnt++

console.log(cnt)
