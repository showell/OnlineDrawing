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
  svg = document.createElementNS ns, 'svg'
  svg.width = 200
  svg.height = 200
  svg.style.height = '200px'
  svg.style.width = '200px'
  svg.style.border = "1px black solid"

  elem = document.getElementById("main")  
  elem.appendChild svg
  
  parent = svg
  rx = 10
  ry = 10
  cx = 10
  
  dot = document.createElementNS ns, 'ellipse'
  dot.setAttribute 'rx', rx
  dot.setAttribute 'ry', ry
  dot.setAttribute 'cx', cx
  dot.setAttribute 'cy', 50
  parent.appendChild dot
  
  delta = 5
  fill = "red"
  
  move = ->
    cx += delta
    if cx < 0 or 200 < cx
      delta *= -1
      if fill == 'red'
        fill = 'green'
      else
        fill = 'red'
    
    dot.setAttribute 'cx', cx
    dot.setAttribute 'fill', fill
    setTimeout(move, 100)

  move()
  '''
        
$(document).ready ->
  $("#content").html(convert demo_layout)
  $("#leftPanel").css("padding", "10px")
  $("#rightPanel").css("padding", "10px")
  
  $("#input_code").tabby {tabString: "  "};
  set_code code
  run_code code
