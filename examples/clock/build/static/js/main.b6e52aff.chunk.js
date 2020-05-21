(this.webpackJsonpclock = this.webpackJsonpclock || []).push([
  [0],
  {
    18: function (t, e, n) {
      t.exports = n(26);
    },
    23: function (t, e, n) {},
    26: function (t, e, n) {
      'use strict';
      n.r(e);
      var r = n(0),
        c = n.n(r),
        u = n(5),
        o = n.n(u),
        a = (n(23), n(11)),
        i = n.n(a),
        l = n(8);
      function s() {
        return i()().utc().format('hh:mm:ss A');
      }
      var f = Object(l.b)(function () {
        var t = Object(l.a)({ time: s() });
        return (
          Object(r.useEffect)(function () {
            var e = setInterval(function () {
              return (t.time = s());
            }, 1e3);
            return function () {
              return clearInterval(e);
            };
          }, []),
          c.a.createElement('div', null, t.time)
        );
      });
      o.a.render(
        c.a.createElement(f, null),
        document.getElementById('root'),
      );
    },
  },
  [[18, 1, 2]],
]);
//# sourceMappingURL=main.b6e52aff.chunk.js.map
