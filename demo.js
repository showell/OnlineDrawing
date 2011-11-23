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
  code = 'ns = \'http://www.w3.org/2000/svg\'\nsvg = document.createElementNS ns, \'svg\'\nsvg.width = 200\nsvg.height = 200\nsvg.style.height = \'200px\'\nsvg.style.width = \'200px\'\nsvg.style.border = "1px black solid"\n\nelem = document.getElementById("main")  \nelem.appendChild svg\n\nparent = svg\nrx = 10\nry = 10\ncx = 10\n\ndot = document.createElementNS ns, \'ellipse\'\ndot.setAttribute \'rx\', rx\ndot.setAttribute \'ry\', ry\ndot.setAttribute \'cx\', cx\ndot.setAttribute \'cy\', 50\nparent.appendChild dot\n\ndelta = 5\nfill = "red"\n\nmove = ->\n  cx += delta\n  if cx < 0 or 200 < cx\n    delta *= -1\n    if fill == \'red\'\n      fill = \'green\'\n    else\n      fill = \'red\'\n  \n  dot.setAttribute \'cx\', cx\n  dot.setAttribute \'fill\', fill\n  setTimeout(move, 100)\n\nmove()';
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
