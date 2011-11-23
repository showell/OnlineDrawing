demo_layout = \
  '''
  table
    tr valign="top"
      td id="leftPanel"       
        h2 id="leftPanel" | Input
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
    js = CoffeeScript.compile code
  catch e
    console.log e
    console.log "(problem with compiling CS)"
  try
    eval js
  catch e
    console.log e
    console.log "problem in JS"
    
code = '''
  ns = 'http://www.w3.org/2000/svg'
  environment = ->
    canvas = ->
      svg = document.createElementNS ns, 'svg'
      svg.width = 500
      svg.height = 500
      svg.style.height = '500px'
      svg.style.width = '500px'
      svg.style.border = "1px black solid"
      elem = document.getElementById("main")  
      elem.appendChild svg
      svg
    
    svg = canvas()
  
    ellipse = (cx=250, cy=250, rx=15, ry=15) ->
      dot = document.createElementNS ns, 'ellipse'
      dot.setAttribute 'rx', rx
      dot.setAttribute 'ry', ry
      dot.setAttribute 'cx', cx
      dot.setAttribute 'cy', cy
      svg.appendChild dot
      dot

    svg: svg
    ellipse: ellipse
    
  env = environment()
  svg = env.svg
  ellipse = env.ellipse
  
  circle = ellipse()
  
  delta = 5
  fill = "red"
  cx = 150
  
  move = ->
    cx += delta
    if cx < 0 or 500 < cx
      delta *= -1
      if fill == 'red'
        fill = 'green'
      else
        fill = 'red'
    
    circle.setAttribute 'cx', cx
    circle.setAttribute 'fill', fill
    setTimeout(move, 50)

  move()
  '''
        
$(document).ready ->
  $("#content").html(convert demo_layout)
  $("#leftPanel").css("padding", "10px")
  $("#rightPanel").css("padding", "10px")
  
  $("#input_code").tabby {tabString: "  "};
  set_code code
  run_code code
