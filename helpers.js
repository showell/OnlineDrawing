(function() {
  window.helpers = function() {
    var after, canvas, cosine, delay, ellipse, launch, line, make_shape, ns, repeat, sine, slow, svg, width, yy;
    width = 500;
    ns = 'http://www.w3.org/2000/svg';
    canvas = function() {
      var elem, svg;
      svg = document.createElementNS(ns, 'svg');
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
    make_shape = function(shape) {
      return document.createElementNS(ns, shape);
    };
    yy = function(y) {
      return width - y;
    };
    line = function(p1, p2, color) {
      var elem;
      if (color == null) {
        color = "black";
      }
      elem = make_shape("line");
      elem.setAttribute("x1", p1[0]);
      elem.setAttribute("y1", yy(p1[1]));
      elem.setAttribute("x2", p2[0]);
      elem.setAttribute("y2", yy(p2[1]));
      $(elem).attr("style", "stroke:" + color);
      svg.appendChild(elem);
      return {
        move_end: function(x2, y2) {
          $(elem).attr("x2", x2);
          return $(elem).attr("y2", yy(y2));
        }
      };
    };
    ellipse = function(cx, cy, rx, ry, fill, stroke) {
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
      if (stroke == null) {
        stroke = null;
      }
      if (!(stroke != null)) {
        stroke = fill;
      }
      dot = make_shape('ellipse');
      dot.setAttribute('rx', rx);
      dot.setAttribute('ry', ry);
      dot.setAttribute('cx', cx);
      dot.setAttribute('cy', yy(cy));
      dot.setAttribute("fill", fill);
      dot.setAttribute("style", "stroke:" + stroke);
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
          self.attr("cy", yy(cy));
          return ellipse(cx, cy, 1, 1, "red");
        },
        turn: function(angle) {
          var c, s, _ref;
          c = cosine(angle);
          s = sine(angle);
          return _ref = [dx * c - dy * s, dy * c + dx * s], dx = _ref[0], dy = _ref[1], _ref;
        }
      };
    };
    launch = function(ball, angle) {
      var ball_radius, cx, cy, dx, dy, flying, over_wall, v, wall_height, wall_offset;
      wall_offset = 315;
      wall_height = 427;
      ball_radius = 15;
      line([wall_offset, 0], [wall_offset, wall_height]);
      line([wall_offset - ball_radius, wall_height], [wall_offset, wall_height]);
      cx = 0;
      cy = 0;
      ball.goto(0, 0);
      v = 7;
      dx = v * cosine(angle);
      dy = v * sine(angle);
      over_wall = false;
      flying = true;
      return repeat(function() {
        if (!flying) {
          return;
        }
        if (cy < 0 || cx > width) {
          flying = false;
        }
        if (flying && !over_wall && cx + ball_radius >= wall_offset) {
          if (cy > wall_height + ball_radius) {
            if (cx >= wall_offset) {
              over_wall = true;
            }
          } else {
            flying = false;
          }
        }
        if (flying) {
          cx += dx;
          cy += dy;
          ball.goto(cx, cy);
          return dy -= 0.05;
        }
      });
    };
    after = function(t, f) {
      return setTimeout(f, t);
    };
    delay = 30;
    repeat = function(f) {
      f();
      return after(delay, function() {
        return repeat(f);
      });
    };
    slow = function(f) {
      return delay = 1000;
    };
    return {
      svg: svg,
      ellipse: ellipse,
      circle: ellipse,
      width: width,
      repeat: repeat,
      launch: launch,
      line: line,
      slow: slow
    };
  };
}).call(this);
