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
  width = 500
  environment = ->
    ns = 'http://www.w3.org/2000/svg'
    canvas = ->
      svg = document.createElementNS ns, 'svg'
      svg.width = width
      svg.height = width
      svg.style.height = width + 'px'
      svg.style.width = width + 'px'
      svg.style.border = "1px black solid"
      elem = document.getElementById("main")  
      elem.appendChild svg
      svg
    
    svg = canvas()
  
    ellipse = (cx=width/2, cy=width/2, rx=15, ry=15) ->
      dot = document.createElementNS ns, 'ellipse'
      dot.setAttribute 'rx', rx
      dot.setAttribute 'ry', ry
      dot.setAttribute 'cx', cx
      dot.setAttribute 'cy', cy
      dot.setAttribute "fill", "blue"
      svg.appendChild dot
      delta = 2
      self =
        cx: (n) ->
          dot.setAttribute "cx", n
        move: ->
          cx += delta
          n = Math.floor cx / width
          if n % 2 == 0
            self.cx cx % width
          else
            self.cx width - (cx % width)
        slower: ->
          delta -= 6   
        faster: ->
          delta += 6

    svg: svg
    ellipse: ellipse
    after: (t, f) -> setTimeout f, t
    width: width
    
  env = environment()
  {svg, ellipse, after} = env
  ball = ellipse()
  ''' + '\n'
  
code = '''  
  i = 0
  faster = true
  pulse = ->
    i += 1
    ball.move()
    if i == 5
      i = 0
      if faster
        faster = false
      else
        faster = true
    if faster
      ball.faster()
    else
      ball.slower()
    after 200, pulse

  pulse()
  '''
        
$(document).ready ->
  $("#content").html(convert demo_layout)
  $("#leftPanel").css("padding", "10px")
  $("#rightPanel").css("padding", "10px")
  
  $("#input_code").tabby {tabString: "  "};
  set_code code
  run_code code
