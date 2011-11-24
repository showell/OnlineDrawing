window.CHALLENGES = [
  {    
    prelude: '''
      env = window.helpers()
      {circle, launch} = env
      ''' + '\n'
  
    code: '''
      # Challenge: Change the angle so that you launch the ball over the wall.
      ball = circle()
      angle = 35
      launch ball, angle
      '''
  },
  {    
    prelude: '''
      env = window.helpers()
      {circle, repeat} = env
      ''' + '\n'
  
    code: '''
      # Challenge #1: Get the ball to turn a tighter circle.
      # Challenge #2: Get it to turn right.
      ball = circle()
      repeat ->
        ball.move()
        angle = 3 # degrees
        ball.turn angle
      '''
  }
]