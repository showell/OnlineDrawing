# TODO:
# error handling
# pause/resume
# expiring timers
# extracting challenges

demo_layout = \
  '''
  table
    tr valign="top"
      td id="leftPanel"       
        h2 id="leftPanel" | Input
        input type="submit" value="Run" id="runCode" |
        <br>
        textarea id="input_code" rows=30 cols=80 |
      td id="rightPanel"
        h4 | Output
        div id="main" | 
  '''

convert = this.pipedent_convert

  
set_code = (code) ->
  max_line = 0
  for line in code.split("\n")
    len = line.length
    max_line = len if len > max_line
  # The cols attribute needs rescaling for some reason.
  $("#input_code").attr("cols", max_line * 0.9)
  $("#input_code").val code
  
run_code = (code) ->
  try
    js = CoffeeScript.compile prelude + code
  catch e
    console.log e
    console.log "(problem with compiling CS)"
  try
    eval js
  catch e
    console.log e
    console.log "problem in JS"
    
prelude = '''
  environment = ->
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
    
  env = environment()
  {circle, repeat} = env
  ''' + '\n'
  
code = '''
  # Challenge #1: Get the ball to turn a tighter circle.
  # Challenge #2: Get it to turn right.
  ball = circle()
  repeat ->
    ball.move()
    ball.turn(3)
  '''
        
$(document).ready ->
  $("#content").html(convert demo_layout)
  $("#leftPanel").css("padding", "10px")
  $("#rightPanel").css("padding", "10px")
  $("#runCode").click ->
    code = $("#input_code").val()
    set_code code
    run_code code
  
  $("#input_code").tabby {tabString: "  "};
  set_code code
  run_code code