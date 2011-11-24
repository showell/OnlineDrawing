window.helpers = ->
  width = 500
  ns = 'http://www.w3.org/2000/svg'
  canvas = ->
    svg = document.createElementNS ns, 'svg'
    svg.width = width
    svg.height = width
    svg.style.height = width + 'px'
    svg.style.width = width + 'px'
    svg.style.border = "1px black solid"
    elem = document.getElementById("main")  
    $(elem).html svg
    svg
  
  svg = canvas()
  
  cosine = (angle) ->
    Math.cos (angle * Math.PI / 180)
    
  sine = (angle) ->
    Math.sin (angle * Math.PI / 180)

  ellipse = (cx=width/2, cy=width/2, rx=15, ry=15, fill="blue") ->
    dot = document.createElementNS ns, 'ellipse'
    dot.setAttribute 'rx', rx
    dot.setAttribute 'ry', ry
    dot.setAttribute 'cx', cx
    dot.setAttribute 'cy', cy
    dot.setAttribute "fill", fill
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
        [dx, dy] = [dx * c + dy * s, dy * c - dx * s]

  launch = (ball, angle) ->
    cx = 0
    cy = 0
    ball.goto(0, 0)
    v = 7
    dx = v * cosine(angle)
    dy = v * sine(angle)
    repeat ->
      if cy >= 0 and cy <= width
        cx += dx
        cy += dy
        ball.goto(cx, width - cy)
        dy -= 0.05

  after = (t, f) -> setTimeout f, t

  repeat = (f) ->
    f()
    after 100, -> repeat(f)

  svg: svg
  ellipse: ellipse
  circle: ellipse
  width: width
  repeat: repeat
  launch: launch
  
  
  
  
