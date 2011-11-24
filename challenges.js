(function() {
  window.CHALLENGES = [
    {
      title: "Draw the Cube",
      prelude: 'env = window.helpers()\n{line} = env' + '\n',
      code: '# Challenge: Make the cube bigger.\nshift = (point, dx, dy) ->\n  [x, y] = point\n  [x + dx, y + dy]\n\nlen = 160\nlen2 = len * 0.9\ndx = len * 0.3\ndy = len * 0.6\n\nA = [150, 150]\nE = shift A, dx, dy # back corner\n\nB = shift A, len, 0\nC = shift B, 0, len\nD = shift C, -1 * len, 0\nline A, B\nline B, C\nline C, D\nline D, A\n\ngrey = "#DDDDDD"\n\nF = shift E, len2, 0\nG = shift F, 0, len2\nH = shift G, -1 * len2, 0\nline E, F, grey\nline F, G\nline G, H\nline H, E, grey\n\nline A, E, grey\nline B, F\nline C, G\nline D, H'
    }, {
      title: "Launch the Ball",
      prelude: 'env = window.helpers()\n{circle, launch} = env' + '\n',
      code: '# Challenge: Change the angle so that you launch the ball clear over the wall.\n# Just use trial and error to find the correct steepness.\nball = circle()\nangle = 35\nlaunch ball, angle'
    }, {
      title: "Tighten the Circle",
      prelude: 'env = window.helpers()\n{circle, repeat} = env' + '\n',
      code: '# Challenge #1: Get the ball to turn a tighter circle.\n# Challenge #2: Get it to turn right.\nball = circle()\nrepeat ->\n  ball.move()\n  angle = 3 # degrees\n  ball.turn angle'
    }
  ];
}).call(this);
