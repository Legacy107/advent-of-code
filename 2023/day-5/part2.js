let inputs = `input-here`.split('\n\n')
let seedInputs = inputs[0].split(': ')[1].split(' ').map(e => parseInt(e))
let seeds = []
for (let i = 0; i < seedInputs.length; i += 2) {
  seeds.push([seedInputs[i], seedInputs[i] + seedInputs[i + 1] - 1])
}

let maps = [...inputs].slice(1).map(el => el
  .split(':\n')[1]
  .split('\n')
  .map(el => el
    .split(' ')
    .map(el => parseInt(el))
  )
)

maps.forEach(map => {
  for (let i = 0; i < seeds.length; i++) {
    for (let j = 0; j < map.length; j++) {
      // inside
      if (map[j][1] <= seeds[i][0] && seeds[i][1] < map[j][1] + map[j][2]) {
        seeds[i][0] = map[j][0] + seeds[i][0] - map[j][1]
        seeds[i][1] = map[j][0] + seeds[i][1] - map[j][1]
        break
      }

      // overlap left
      if (map[j][1] <= seeds[i][1] && seeds[i][1] < map[j][1] + map[j][2]) {
        seeds.push([seeds[i][0], map[j][1] - 1])
        seeds[i][0] = map[j][0]
        seeds[i][1] = map[j][0] + seeds[i][1] - map[j][1]
        break
      }

      // overlap right
      if (map[j][1] <= seeds[i][0] && seeds[i][0] < map[j][1] + map[j][2]) {
        seeds.push([map[j][1] + map[j][2], seeds[i][1]])
        seeds[i][0] = map[j][0] + seeds[i][0] - map[j][1]
        seeds[i][1] = map[j][0] + map[j][2] - 1
        break
      }
    }
  }
})

console.log(Math.min(...(seeds.map(el => el[0]))))
