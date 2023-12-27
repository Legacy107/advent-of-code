`19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`

let res = [x, y, z, dx, dy, dz]

on x axis {
  res meets stone 1 at time
  tx1 = (x1 - x) / (dx1 - dx)
}
on y axis {
  res meets stone 1 at time
  ty1 = (y1 - y) / (dy1 - dy)
}
on z axis {
  res meets stone 1 at time
  tz1 = (z1 - z) / (dz1 - dz)
}
on xyz plane {
  res meets stone 1 at time
  t1 = tx1 = ty1 = tz1
}

=> need to solve a system of equations
=> only 4 stones are needed to solve the system

// initial system of equations
solve system of equations {
  (19-x)/(-2-a)=(13-y)/(1-b),
  (19-x)/(-2-a)=(30-z)/(-2-c),
  (18-x)/(-1-a)=(19-y)/(-1-b),
  (18-x)/(-1-a)=(22-z)/(-2-c),
  (20-x)/(-2-a)=(25-y)/(-2-b),
  (20-x)/(-2-a)=(34-z)/(-4-c),
  (12-x)/(-1-a)=(31-y)/(-2-b),
  (12-x)/(-1-b)=(28-z)/(-1-c)
}

// simplified system of equations to remove the constraint on the denominator
solve system of equations {
  (19-x)*(1-b)=(13-y)*(-2-a),
  (19-x)*(-2-c)=(30-z)*(-2-a),
  (18-x)*(-1-b)=(19-y)*(-1-a),
  (18-x)*(-2-c)=(22-z)*(-1-a),
  (20-x)*(-2-b)=(25-y)*(-2-a),
  (20-x)*(-4-c)=(34-z)*(-2-a),
  (12-x)*(-2-b)=(31-y)*(-1-a),
  (12-x)*(-1-c)=(28-z)*(-1-a)
}

// formatted system of equations to be solved by wolfram alpha
solve system of equations {(19-x)*(1-b)=(13-y)*(-2-a),(19-x)*(-2-c)=(30-z)*(-2-a),(18-x)*(-1-b)=(19-y)*(-1-a),(18-x)*(-2-c)=(22-z)*(-1-a),(20-x)*(-2-b)=(25-y)*(-2-a),(20-x)*(-4-c)=(34-z)*(-2-a),(12-x)*(-2-b)=(31-y)*(-1-a),(12-x)*(-1-c)=(28-z)*(-1-a)}

x = 24 and y = 13 and z = 10 and c = 2 and b = 1 and a = -3
