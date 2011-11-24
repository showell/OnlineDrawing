(function() {
  window.CHALLENGES = [
    {
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
