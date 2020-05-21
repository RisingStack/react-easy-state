(this['webpackJsonptodo-mvc'] =
  this['webpackJsonptodo-mvc'] || []).push([
  [0],
  {
    18: function (e, t, l) {
      e.exports = l(25);
    },
    23: function (e, t, l) {},
    25: function (e, t, l) {
      'use strict';
      l.r(t);
      var a = l(0),
        c = l.n(a),
        n = l(7),
        o = l.n(n),
        r = (l(23), l(5)),
        m = l.n(r),
        s = l(4),
        i = Object(s.a)({
          all: [],
          filter: 'all',
          get isEmpty() {
            return 0 === i.all.length;
          },
          get completed() {
            return i.all.filter(function (e) {
              return e.completed;
            });
          },
          get hasCompleted() {
            return 0 !== i.completed.length;
          },
          get allCompleted() {
            return i.all.every(function (e) {
              return e.completed;
            });
          },
          set allCompleted(e) {
            i.all.forEach(function (t) {
              t.completed = e;
            });
          },
          get active() {
            return i.all.filter(function (e) {
              return !e.completed;
            });
          },
          create: function (e) {
            i.all.push({ title: e });
          },
          remove: function (e) {
            i.all.splice(e, 1);
          },
          toggle: function (e) {
            var t = i.all[e];
            t.completed = !t.completed;
          },
          toggleAll: function () {
            i.allCompleted = !i.allCompleted;
          },
          clearCompleted: function () {
            i.all = i.active;
          },
        }),
        u = i,
        d = Object(s.b)(function (e) {
          var t = e.id,
            l = e.title,
            a = e.completed,
            n = void 0 !== a && a,
            o = m()({ view: !0, completed: n });
          return c.a.createElement(
            'li',
            { className: o },
            c.a.createElement('input', {
              className: 'toggle',
              type: 'checkbox',
              checked: n,
              onChange: function () {
                return u.toggle(t);
              },
            }),
            c.a.createElement('label', null, l),
            c.a.createElement('button', {
              onClick: function () {
                return u.remove(t);
              },
              className: 'destroy',
            }),
          );
        });
      function p(e) {
        u.filter = e.target.value;
      }
      function g(e) {
        13 === e.keyCode &&
          e.target.value &&
          (u.create(e.target.value), (e.target.value = ''));
      }
      var f = Object(s.b)(function () {
        var e = u.isEmpty,
          t = u.hasCompleted,
          l = u.allCompleted,
          a = u.active,
          n = u.filter,
          o = u.toggleAll,
          r = u.clearCompleted,
          s = m()({ selected: 'all' === n }),
          i = m()({ selected: 'completed' === n }),
          f = m()({ selected: 'active' === n });
        return c.a.createElement(
          'div',
          { className: 'todoapp' },
          c.a.createElement(
            'header',
            { className: 'header' },
            c.a.createElement('h1', null, 'todos'),
            c.a.createElement('input', {
              onKeyUp: g,
              className: 'new-todo',
              placeholder: 'What needs to be done?',
              autoFocus: !0,
            }),
          ),
          !e &&
            c.a.createElement(
              'section',
              { className: 'main' },
              c.a.createElement('input', {
                className: 'toggle-all',
                type: 'checkbox',
                checked: l,
                onChange: o,
              }),
              c.a.createElement(
                'label',
                { htmlFor: 'toggle-all' },
                'Mark all as complete',
              ),
              c.a.createElement(
                'ul',
                { className: 'todo-list' },
                u[n].map(function (e, t) {
                  return c.a.createElement(
                    d,
                    Object.assign({}, e, { id: t, key: t }),
                  );
                }),
              ),
            ),
          !e &&
            c.a.createElement(
              'footer',
              { className: 'footer' },
              c.a.createElement(
                'span',
                { className: 'todo-count' },
                a.length,
                ' items left',
              ),
              c.a.createElement(
                'div',
                { className: 'filters' },
                c.a.createElement(
                  'button',
                  { className: s, value: 'all', onClick: p },
                  'All',
                ),
                c.a.createElement(
                  'button',
                  { className: f, value: 'active', onClick: p },
                  'Active',
                ),
                c.a.createElement(
                  'button',
                  { className: i, value: 'completed', onClick: p },
                  'Completed',
                ),
              ),
              t &&
                c.a.createElement(
                  'button',
                  { className: 'clear-completed', onClick: r },
                  'Clear completed',
                ),
            ),
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
//# sourceMappingURL=main.0af9c717.chunk.js.map
