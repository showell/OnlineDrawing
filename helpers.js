(function() {
  window.helpers = function() {
    var after, canvas, cosine, ellipse, launch, ns, repeat, sine, svg, width;
    width = 500;
    ns = 'http://www.w3.org/2000/svg';
    canvas = function() {
      var elem, svg;
      svg = document.createElementNS(ns, 'svg');
      svg.width = width;
      svg.height = width;
      svg.style.height = width + 'px';
      svg.style.width = width + 'px';
      svg.style.border = "1px black solid";
      elem = document.getElementById("main");
      $(elem).html(svg);
      return svg;
    };
    svg = canvas();
    cosine = function(angle) {
      return Math.cos(angle * Math.PI / 180);
    };
    sine = function(angle) {
      return Math.sin(angle * Math.PI / 180);
    };
    ellipse = function(cx, cy, rx, ry, fill) {
      var dot, dx, dy, self;
      if (cx == null) {
        cx = width / 2;
      }
      if (cy == null) {
        cy = width / 2;
      }
      if (rx == null) {
        rx = 15;
      }
      if (ry == null) {
        ry = 15;
      }
      if (fill == null) {
        fill = "blue";
      }
      dot = document.createElementNS(ns, 'ellipse');
      dot.setAttribute('rx', rx);
      dot.setAttribute('ry', ry);
      dot.setAttribute('cx', cx);
      dot.setAttribute('cy', cy);
      dot.setAttribute("fill", fill);
      svg.appendChild(dot);
      dx = 5;
      dy = 0;
      return self = {
        attr: function(field, value) {
          return dot.setAttribute(field, value);
        },
        move: function() {
          cx += dx;
          cy += dy;
          return self.goto(cx, cy);
        },
        goto: function(cx, cy) {
          var n;
          n = Math.floor(cx / width);
          self.attr("cx", cx);
          self.attr("cy", cy);
          return ellipse(cx, cy, 1, 1, "red");
        },
        turn: function(angle) {
          var c, s, _ref;
          c = cosine(angle);
          s = sine(angle);
          return _ref = [dx * c + dy * s, dy * c - dx * s], dx = _ref[0], dy = _ref[1], _ref;
        }
      };
    };
    launch = function(ball, angle) {
      var cx, cy, dx, dy, v;
      cx = 0;
      cy = 0;
      ball.goto(0, 0);
      v = 7;
      dx = v * cosine(angle);
      dy = v * sine(angle);
      return repeat(function() {
        if (cy >= 0 && cy <= width) {
          cx += dx;
          cy += dy;
          ball.goto(cx, width - cy);
          return dy -= 0.05;
        }
      });
    };
    after = function(t, f) {
      return setTimeout(f, t);
    };
    repeat = function(f) {
      f();
      return after(100, function() {
        return repeat(f);
      });
    };
    return {
      svg: svg,
      ellipse: ellipse,
      circle: ellipse,
      width: width,
      repeat: repeat,
      launch: launch
    };
  };
}).call(this);
