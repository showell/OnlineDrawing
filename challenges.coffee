window.CHALLENGES = [
  {
    title: "Launch the Ball"
    
    prelude: '''
      env = window.helpers()
      {circle, launch} = env
      ''' + '\n'
  
    code: '''
      # Challenge: Change the angle so that you launch the ball clear over the wall.
      # Just use trial and error to find the correct steepness.
      ball = circle()
      angle = 35
      launch ball, angle
      '''
  },
  { 
    title: "Tighten the Circle"
    
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