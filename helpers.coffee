window.helpers = ->
  width = 500
  ns = 'http://www.w3.org/2000/svg'

  make_shape = (shape) ->
    document.createElementNS ns, shape
    
  canvas = ->
    svg = document.createElementNS ns, "svg"
    svg.style.height = width + 'px'
    svg.style.width = width + 'px'
    svg.style.border = "1px black solid"
    elem = document.getElementById("main")  
    $(elem).html svg
    svg
    
    g= make_shape "g"
    $(g).attr "transform", "scale(1, -1) translate(0, #{-1 * width})"
    svg.appendChild g
    g
 
  svg = canvas()
  
  cosine = (angle) ->
    Math.cos (angle * Math.PI / 180)
    
  sine = (angle) ->
    Math.sin (angle * Math.PI / 180)
    
  path = (stroke="black", stroke_width="1", fill="none") ->
    elem = make_shape "path"
    $(elem).attr "stroke", stroke
    $(elem).attr "stroke-width", stroke_width
    $(elem).attr "fill", fill
    svg.appendChild elem
    attr: (f, v) -> $(elem).attr f, v

  line = (p1, p2, color="black") ->
    elem = make_shape "line"
    elem.setAttribute "x1", p1[0]
    elem.setAttribute "y1", p1[1]
    elem.setAttribute "x2", p2[0]
    elem.setAttribute "y2", p2[1]
    $(elem).attr "style", "stroke:#{color}"
    svg.appendChild elem
    move_end: (x2, y2) ->
      $(elem).attr "x2", x2
      $(elem).attr "y2", y2

  ellipse = (cx=width/2, cy=width/2, rx=15, ry=15, fill="blue", stroke=null) ->
    if !stroke?
      stroke = fill
    dot = make_shape 'ellipse'
    dot.setAttribute 'rx', rx
    dot.setAttribute 'ry', ry
    dot.setAttribute 'cx', cx
    dot.setAttribute 'cy', cy
    dot.setAttribute "fill", fill
    dot.setAttribute "style", "stroke:#{stroke}"
    svg.appendChild dot
    dx = 5
    dy = 0
    self =
      attr: (field, value) ->
        dot.setAttribute field, value
      move: () ->
        cx += dx
        cy += dy
        self.goto(cx, cy)
      goto: (cx, cy) ->
        n = Math.floor cx / width
        self.attr "cx", cx
        self.attr "cy", cy
        ellipse(cx, cy, 1, 1, "red")
      turn: (angle) ->
        c = cosine(angle)
        s = sine(angle)
        [dx, dy] = [dx * c - dy * s, dy * c + dx * s]

  launch = (ball, angle) ->
    wall_offset = 315
    wall_height = 427
    ball_radius = 15
    line [wall_offset, 0], [wall_offset, wall_height]
    line [wall_offset - ball_radius, wall_height], [wall_offset, wall_height]
    
    cx = 0
    cy = 0
    ball.goto(0, 0)
    v = 7
    dx = v * cosine(angle)
    dy = v * sine(angle)
    over_wall = false
    flying = true
    repeat ->
      return if !flying
      
      flying = false if cy < 0 or cx > width
      
      if flying and !over_wall and cx + ball_radius >= wall_offset
        if cy > wall_height + ball_radius
          if cx >= wall_offset
            over_wall = true
        else
          flying = false
          
      if flying
        cx += dx
        cy += dy
        ball.goto(cx, cy)
        dy -= 0.05

  after = (t, f) -> setTimeout f, t

  delay = 30
  
  repeat = (f) ->
    f()
    after delay, -> repeat(f)

  slow = (f) ->
    delay = 1000

  svg: svg
  ellipse: ellipse
  circle: ellipse
  width: width
  repeat: repeat
  launch: launch
  line: line
  slow: slow
  path: path
  
  
  
  
