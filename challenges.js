(function() {
  window.CHALLENGES = [
    {
      prelude: 'env = window.helpers()\n{circle, repeat} = env' + '\n',
      code: '# Challenge #1: Get the ball to turn a tighter circle.\n# Challenge #2: Get it to turn right.\nball = circle()\nrepeat ->\n  ball.move()\n  ball.turn(3)'
    }
  ];
}).call(this);
