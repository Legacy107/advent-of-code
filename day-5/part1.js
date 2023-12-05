let inputs = `input-here`.split('\n\n')
let seeds = inputs[0].split(': ')[1].split(' ').map(e => parseInt(e))
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
      if (map[j][1] <= seeds[i] && seed[i] < map[j][1] + map[j][2]) {
        map[i] = map[j][0] + seeds[i] - map[j][1]
        break
      }
    }
  }
})

console.log(Math.min(...seeds))
