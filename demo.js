(function() {
  var code, convert, demo_layout, run_code, set_code;
  demo_layout = 'table\n  tr valign="top"\n    td id="leftPanel"       \n      h2 id="leftPanel" | Input\n      textarea id="input_code" rows=30 cols=80 |\n    td id="rightPanel"\n      h4 | Output\n      div id="main" | ';
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
      js = CoffeeScript.compile(code);
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
  code = 'ns = \'http://www.w3.org/2000/svg\'\nenvironment = ->\n  canvas = ->\n    svg = document.createElementNS ns, \'svg\'\n    svg.width = 500\n    svg.height = 500\n    svg.style.height = \'500px\'\n    svg.style.width = \'500px\'\n    svg.style.border = "1px black solid"\n    elem = document.getElementById("main")  \n    elem.appendChild svg\n    svg\n  \n  svg = canvas()\n\n  ellipse = (cx=250, cy=250, rx=15, ry=15) ->\n    dot = document.createElementNS ns, \'ellipse\'\n    dot.setAttribute \'rx\', rx\n    dot.setAttribute \'ry\', ry\n    dot.setAttribute \'cx\', cx\n    dot.setAttribute \'cy\', cy\n    svg.appendChild dot\n    dot\n\n  svg: svg\n  ellipse: ellipse\n  \nenv = environment()\nsvg = env.svg\nellipse = env.ellipse\n\ncircle = ellipse()\n\ndelta = 5\nfill = "red"\ncx = 150\n\nmove = ->\n  cx += delta\n  if cx < 0 or 500 < cx\n    delta *= -1\n    if fill == \'red\'\n      fill = \'green\'\n    else\n      fill = \'red\'\n  \n  circle.setAttribute \'cx\', cx\n  circle.setAttribute \'fill\', fill\n  setTimeout(move, 50)\n\nmove()';
  $(document).ready(function() {
    $("#content").html(convert(demo_layout));
    $("#leftPanel").css("padding", "10px");
    $("#rightPanel").css("padding", "10px");
    $("#input_code").tabby({
      tabString: "  "
    });
    set_code(code);
    return run_code(code);
  });
}).call(this);
