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
      move: ->
        cx += dx
        cy += dy
        n = Math.floor cx / width
        self.attr "cx", cx
        self.attr "cy", cy
        ellipse(cx, cy, 1, 1, "red")
      turn: (angle) ->
        c = cosine(angle)
        s = sine(angle)
        [dx, dy] = [dx * c + dy * s, dy * c - dx * s]

  after = (t, f) -> setTimeout f, t

  repeat = (f) ->
    f()
    after 100, -> repeat(f)

  svg: svg
  ellipse: ellipse
  circle: ellipse
  width: width
  repeat: repeat