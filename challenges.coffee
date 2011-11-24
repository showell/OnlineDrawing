window.CHALLENGES = [
  {
    title: "Draw the Cube"
    
    prelude: '''
      env = window.helpers()
      {line} = env
      ''' + '\n'
  
    code: '''
      # Challenge: Make the cube bigger, but still fit in the drawing.
      shift = (point, dx, dy) ->
        [x, y] = point
        [x + dx, y + dy]
      
      # The cube has two rectangles:
      # ABCD is the front face
      # EFGH is the back face
      
      len = 60
      len2 = len * 0.9
      dx = len * 0.3
      dy = len * 0.6
      
      A = [50, 50]
      E = shift A, dx, dy # back corner
      
      B = shift A, len, 0
      C = shift B, 0, len
      D = shift C, -1 * len, 0
      line A, B
      line B, C
      line C, D
      line D, A
      
      grey = "#DDDDDD"
      
      F = shift E, len2, 0
      G = shift F, 0, len2
      H = shift G, -1 * len2, 0
      line E, F, grey
      line F, G
      line G, H
      line H, E, grey
      
      line A, E, grey
      line B, F
      line C, G
      line D, H
      '''
  },  {
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