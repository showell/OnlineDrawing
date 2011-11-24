window.CHALLENGES = [
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
        ball.turn(3)
      '''
  }
]