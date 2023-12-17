var PriorityQueue = require('priorityqueuejs');

var queue = new PriorityQueue((a, b) => b[0] - a[0]);

let rows = `input-here`.split('\n').map(row => row.split('').map(Number));

let dr = [-1, 0, 1, 0];
let dc = [0, 1, 0, -1];
let max1Dir = 3;

let dis = Array.from({
  length: rows.length
}, () => Array.from({
    length: rows[0].length
  }, () => Array.from({
    length: dr.length
    }, () => Array.from({
        length: max1Dir + 1
      }, () => Infinity))));

let vis = Array.from({
  length: rows.length
}, () => Array.from({
    length: rows[0].length
  }, () => Array.from({
      length: dr.length
    }, () => Array.from({
        length: max1Dir + 1
      }, () => false))));

let start = [0, 0, 1, 0];
let end = [rows.length - 1, rows[0].length - 1];
dis[start[0]][start[1]][start[2]][start[3]] = 0;
queue.enq([0, start]);

// dijkstra
while (!queue.isEmpty()) {
  let [d, [r, c, dir, cnt]] = queue.deq();
  if (r === end[0] && c === end[1]) {
    console.log(d);
    break;
  }
  if (vis[r][c][dir][cnt]) continue;
  vis[r][c][dir][cnt] = true;

  for (let i = 0; i < 4; i++) {
    if (
      (dr[i] === -dr[dir] && dc[i] === -dc[dir]) ||
      (i === dir && cnt === max1Dir)
    )
      continue;
    let nr = r + dr[i];
    let nc = c + dc[i];
    let cnt1Dir = (i === dir ? cnt + 1 : 1);
    if (nr >= 0 && nr < rows.length && nc >= 0 && nc < rows[0].length && dis[nr][nc][i][cnt1Dir] > d + rows[nr][nc]) {
      dis[nr][nc][i][cnt1Dir] = d + rows[nr][nc];
      queue.enq([dis[nr][nc][i][cnt1Dir],
        [nr, nc, i, cnt1Dir]
      ]);
    }
  }
}
