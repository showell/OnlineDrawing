(function() {
  var CHALLENGE, convert, demo_layout, load_programs, run_code, set_code, start_challenge;
  CHALLENGE = null;
  demo_layout = 'table\n  tr valign="top"\n    td id="leftPanel"\n      ul id="program_list" | \n      h2 id="leftPanel" | Input\n      input type="submit" value="Run" id="runCode" |\n      <br>\n      textarea id="input_code" rows=30 cols=80 |\n    td id="rightPanel"\n      h4 | Output\n      div id="main" | ';
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
  load_programs = function() {
    var a, challenge, elem, li, set_click, _i, _len, _ref, _results;
    elem = $("#program_list");
    set_click = function(a, challenge) {
      return a.click(function() {
        return start_challenge(challenge);
      });
    };
    _ref = window.CHALLENGES;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      challenge = _ref[_i];
      li = $("<li>");
      a = $(convert("a href='#' | " + challenge.title));
      li.html(a);
      set_click(a, challenge);
      _results.push(elem.append(li));
    }
    return _results;
  };
  run_code = function(code) {
    var js;
    try {
      js = CoffeeScript.compile(CHALLENGE.prelude + code);
    } catch (e) {
      console.log(e);
      console.log("(problem with compiling CS)");
    }
    return eval(js);
  };
  start_challenge = function(challenge) {
    var code;
    CHALLENGE = challenge;
    code = CHALLENGE.code;
    set_code(code);
    return run_code(code);
  };
  $(document).ready(function() {
    $("#content").html(convert(demo_layout));
    $("#leftPanel").css("padding", "10px");
    $("#rightPanel").css("padding", "10px");
    $("#runCode").click(function() {
      var code;
      code = $("#input_code").val();
      set_code(code);
      return run_code(code);
    });
    $("#input_code").tabby({
      tabString: "  "
    });
    start_challenge(window.CHALLENGES[0]);
    return load_programs();
  });
}).call(this);
