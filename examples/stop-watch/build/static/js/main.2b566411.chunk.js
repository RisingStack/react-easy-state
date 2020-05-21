(this['webpackJsonpstop-watch'] =
  this['webpackJsonpstop-watch'] || []).push([
  [0],
  {
    18: function (t, e, n) {
      t.exports = n(26);
    },
    23: function (t, e, n) {},
    26: function (t, e, n) {
      'use strict';
      n.r(e);
      var i = n(0),
        r = n.n(i),
        c = n(5),
        a = n.n(c),
        o = (n(23), n(6)),
        s = n(13),
        l = n.n(s),
        u = Object(o.a)({
          ticks: 0,
          start: function () {
            u.intervalId = setInterval(function () {
              return u.ticks++;
            }, 10);
          },
          stop: function () {
            u.intervalId = clearInterval(u.intervalId);
          },
          get time() {
            var t = l()(0).millisecond(10 * u.ticks);
            return {
              seconds: t.format('mm:ss'),
              fraction: t.format('SS'),
            };
          },
          get isTicking() {
            return void 0 !== u.intervalId;
          },
          toggle: function () {
            u.isTicking ? u.stop() : u.start();
          },
          reset: function () {
            (u.ticks = 0), u.stop();
          },
        }),
        m = u,
        d = Object(o.b)(function () {
          var t = m.time,
            e = m.toggle,
            n = m.reset,
            i = m.isTicking ? 'Stop' : 'Start';
          return r.a.createElement(
            'div',
            null,
            r.a.createElement(
              'div',
              null,
              t.seconds,
              r.a.createElement('small', null, t.fraction),
            ),
            r.a.createElement('button', { onClick: e }, i),
            r.a.createElement('button', { onClick: n }, 'Reset'),
          );
        });
      a.a.render(
        r.a.createElement(d, null),
        document.getElementById('root'),
      );
    },
  },
  [[18, 1, 2]],
]);
//# sourceMappingURL=main.2b566411.chunk.js.map
