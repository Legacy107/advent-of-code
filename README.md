# My solution to the [Advent of Code](https://adventofcode.com/) puzzles.

## [2024](https://adventofcode.com/2024)
This year I decided to solve all problems using GitHub Copilot to do 99% of the work in Python. My expectation is that it can solve all problems even the harder ones near the end. Let's see how it goes.

## [2023](https://adventofcode.com/2023)
First year participating. Didn't feel like C++. Solved all in JavaScript. First few days were done directly in the browser console :D. Got stuck and dragged behind by *math* puzzles D: (wolfram alpha to the rescue ;P). Anw, fun stuff.

**PS**: After reading some Reddit dicussions on day 18, I realized that I accidentally rediscovered the [Pick's theorem](https://en.wikipedia.org/wiki/Pick%27s_theorem) :D. Here's how. First I tried calculating the area of the polygon using the [shoelace formula](https://en.wikipedia.org/wiki/Shoelace_formula), trivial stuff. Then I realized that the points lie directly on the edges of the polygon haven't been counted. To do that, I just added the edge length to *"`edgeArea`"* and divided that sum by 2. Now, I cannot remember why I divided by 2, probably cuz I named it *"`edgeArea`"* and I had just divided the `area` by 2. Finally, based on some testing, I noticed that the result (sum of those 2 areas) is always 1 less than the actual number of points. I couldn't figure out why, so I just added 1 to the result, submitted it and boom it works :D. My final formula was: $A + \frac{b}{2}+1=i+b=\text{total points}$. It's basically Pick's theorem (minus the proof D:).
