let arr = `input-here`.split('\n')
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

let queue = [posStart]
let isLoop = Array.from({
  length: arr.length
}, () => Array.from({
  length: arr[0].length
}, () => -1))
isLoop[posStart[0]][posStart[1]] = 0
let maxDistance = 0
while (queue.length) {
  let [i, j] = queue.shift()
  let distance = isLoop[i][j]
  let adj = graph[arr[i][j]]
  Object.entries(adj).forEach(([dir, chars]) => {
    let [di, dj] = dirs2Coords[dir]
    let [ni, nj] = [i + di, j + dj]
    if (chars.indexOf(arr?.[ni]?.[nj]) !== -1 && isLoop[ni][nj] === -1) {
      isLoop[ni][nj] = distance + 1
      maxDistance = Math.max(maxDistance, distance + 1)
      queue.push([ni, nj])
    }
  })
}

console.log(maxDistance)
