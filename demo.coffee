# TODO:
# error handling
# pause/resume
# expiring timers
# extracting challenges

CHALLENGE = null

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
    js = CoffeeScript.compile CHALLENGE.prelude + code
  catch e
    console.log e
    console.log "(problem with compiling CS)"
  try
    eval js
  catch e
    console.log e
    console.log "problem in JS"

start_challenge = ->
  code = CHALLENGE.code
  set_code code
  run_code code
          
$(document).ready ->
  $("#content").html(convert demo_layout)
  $("#leftPanel").css("padding", "10px")
  $("#rightPanel").css("padding", "10px")
  $("#runCode").click ->
    code = $("#input_code").val()
    set_code code
    run_code code
  
  $("#input_code").tabby {tabString: "  "};
  CHALLENGE = window.CHALLENGES[0]
  start_challenge()
