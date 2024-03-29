(function() {
  window.CHALLENGES = [
    {
      title: "Frownie Face",
      prelude: 'env = window.helpers()\n{ellipse, path} = env\nenv.slow()' + '\n',
      code: '# Challenge: Change the frown to a smile.\n\n# First we draw the head and eyes.\ncx = 250\nhead = ellipse(cx, 300, 150, 150, "white", "black")\ndraw_eye = (sign) ->\n  ellipse(cx + sign * 70, 340, 20, 20, "white", "black")\n  ellipse(cx + sign * 65, 330, 3, 3, "blue", "blue")\ndraw_eye -1\ndraw_eye 1\n\n# Set up the points for the start, middle, and end\n# of the smile. HINT: Change at least of these values.\ncx = 250 # center \nsmile_half_width = 70\ncurve_up = 50\nsmile_height = 230 # height for edges of smile\n\nxs = cx - smile_half_width\nxe = cx + smile_half_width\nxm = cx\nys = ye = smile_height\nym = ys + curve_up\n\n# Once we have a path object, we can move to its start\n# point (M), then draw a quadratic (Q) curve to the\n# endpoint, using the midpoint to give it the right\n# curvature.\np = path "red", 4\np.attr "d", "M#{xs}, #{ys} Q#{xm}, #{ym}  #{xe}, #{ye}"'
    }, {
      title: "Stick Man",
      prelude: 'env = window.helpers()\n{ellipse, line, repeat} = env\nenv.slow()' + '\n',
      code: '# Challenge: Get Stick Man to flex his left arm as\n# well as his right.\n\nhead = ellipse(250, 400, 50, 60, "white", "black")\ntorso = line [250, 170], [250, 340]\nleft_leg = line [250-80, 10], [250, 170]\nright_leg = line [250+80, 10], [250, 170]\n\nright_elbow = [250-90, 300]\nleft_elbow = [250+90, 300]\nline left_elbow, right_elbow\nright_forearm = line right_elbow, [250-90-90, 300]\nleft_forearm = line left_elbow, [250+90+90, 300]\n\ni = 0\nrepeat ->\n  i += 1\n  if i % 2 == 0\n    right_forearm.move_end 250-90, 390\n  else\n    right_forearm.move_end 250-90-90, 300'
    }, {
      title: "Draw the Cube",
      prelude: 'env = window.helpers()\n{line} = env' + '\n',
      code: '# Challenge: Make the cube bigger, but still fit in the drawing.\nshift = (point, dx, dy) ->\n  [x, y] = point\n  [x + dx, y + dy]\n\n# The cube has two rectangles:\n# ABCD is the front face\n# EFGH is the back face\n\nlen = 60\nlen2 = len * 0.9\ndx = len * 0.3\ndy = len * 0.6\n\nA = [50, 50]\nE = shift A, dx, dy # back corner\n\nB = shift A, len, 0\nC = shift B, 0, len\nD = shift C, -1 * len, 0\nline A, B\nline B, C\nline C, D\nline D, A\n\ngrey = "#DDDDDD"\n\nF = shift E, len2, 0\nG = shift F, 0, len2\nH = shift G, -1 * len2, 0\nline E, F, grey\nline F, G\nline G, H\nline H, E, grey\n\nline A, E, grey\nline B, F\nline C, G\nline D, H'
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
