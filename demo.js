(function() {
  var code, convert, demo_layout, prelude, run_code, set_code;
  demo_layout = 'table\n  tr valign="top"\n    td id="leftPanel"       \n      h2 id="leftPanel" | Input\n      input type="submit" value="Run" id="runCode" |\n      <br>\n      textarea id="input_code" rows=30 cols=80 |\n    td id="rightPanel"\n      h4 | Output\n      div id="main" | ';
  convert = this.pipedent_convert;
  set_code = function(code) {
    var len, line, max_line, _i, _len, _ref;
    max_line = 0;
    _ref = code.split("\n");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      len = line.length;
      if (len > max_line) {
        max_line = len;
      }
    }
    $("#input_code").attr("cols", max_line * 0.9);
    return $("#input_code").val(code);
  };
  run_code = function(code) {
    var js;
    try {
      js = CoffeeScript.compile(prelude + code);
    } catch (e) {
      console.log(e);
      console.log("(problem with compiling CS)");
    }
    try {
      return eval(js);
    } catch (e) {
      console.log(e);
      return console.log("problem in JS");
    }
  };
  prelude = 'env = window.helpers()\n{circle, repeat} = env' + '\n';
  code = '# Challenge #1: Get the ball to turn a tighter circle.\n# Challenge #2: Get it to turn right.\nball = circle()\nrepeat ->\n  ball.move()\n  ball.turn(3)';
  $(document).ready(function() {
    $("#content").html(convert(demo_layout));
    $("#leftPanel").css("padding", "10px");
    $("#rightPanel").css("padding", "10px");
    $("#runCode").click(function() {
      code = $("#input_code").val();
      set_code(code);
      return run_code(code);
    });
    $("#input_code").tabby({
      tabString: "  "
    });
    set_code(code);
    return run_code(code);
  });
}).call(this);
