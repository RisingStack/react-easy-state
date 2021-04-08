(this['webpackJsonpbeer-finder'] =
  this['webpackJsonpbeer-finder'] || []).push([
  [0],
  {
    150: function (e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        c = a(18),
        l = a.n(c),
        s = (a(97), a(16)),
        u = a(84),
        i = a.n(u),
        o = a(170),
        m = a(38),
        p = a.n(m),
        f = a(55),
        d = a(85),
        b = a
          .n(d)
          .a.create({ baseURL: 'https://api.punkapi.com/v2' });
      function g(e) {
        return h.apply(this, arguments);
      }
      function h() {
        return (h = Object(f.a)(
          p.a.mark(function e(t) {
            var a, n;
            return p.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (e.next = 2),
                      b.get('/beers', {
                        params: { food: t || void 0, per_page: 30 },
                      })
                    );
                  case 2:
                    return (
                      (a = e.sent),
                      (n = a.data).forEach(E),
                      e.abrupt('return', n)
                    );
                  case 6:
                  case 'end':
                    return e.stop();
                }
            }, e);
          }),
        )).apply(this, arguments);
      }
      function E(e) {
        (e.image_url && -1 === e.image_url.indexOf('keg.png')) ||
          (e.image_url =
            'http://www.patternpictures.com/wp-content/uploads/2015/11/PP07301706-Close-up-of-draft-beer-foam.jpg');
      }
      var v = Object(s.a)({
          beers: [],
          fetchBeers: function (e) {
            return Object(f.a)(
              p.a.mark(function t() {
                return p.a.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (v.isLoading = !0), (t.next = 3), g(e);
                      case 3:
                        (v.beers = t.sent), (v.isLoading = !1);
                      case 5:
                      case 'end':
                        return t.stop();
                    }
                }, t);
              }),
            )();
          },
        }),
        w = v,
        j = Object(s.b)(function () {
          return r.a.createElement(
            'div',
            { className: 'searchbar' },
            r.a.createElement(i.a, {
              onRequestSearch: w.fetchBeers,
              placeholder: 'Add some food ...',
              autoFocus: !0,
            }),
            w.isLoading && r.a.createElement(o.a, null),
          );
        }),
        k = a(167),
        O = a(168),
        x = a(169),
        _ = Object(s.b)(function (e) {
          var t = e.name,
            a = e.description,
            n = e.image_url,
            c = e.food_pairing,
            l = Object(s.a)({ details: !1 });
          return r.a.createElement(
            k.a,
            {
              onClick: function () {
                l.details = !l.details;
              },
              className: 'beer',
            },
            !l.details &&
              r.a.createElement(O.a, {
                image: n,
                className: 'media',
              }),
            r.a.createElement(
              x.a,
              null,
              r.a.createElement('h3', null, t),
              l.details
                ? r.a.createElement('p', null, a)
                : r.a.createElement(
                    'ul',
                    null,
                    c.map(function (e) {
                      return r.a.createElement('li', { key: e }, e);
                    }),
                  ),
            ),
          );
        }),
        y = Object(s.b)(function () {
          return r.a.createElement(
            'div',
            { className: 'beerlist' },
            w.beers.length
              ? w.beers.map(function (e) {
                  return r.a.createElement(
                    _,
                    Object.assign({ key: e.name }, e),
                  );
                })
              : r.a.createElement(
                  'h3',
                  null,
                  'No matching beers found!',
                ),
          );
        }),
        N = function () {
          return r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement(j, null),
            r.a.createElement(y, null),
          );
        };
      l.a.render(
        r.a.createElement(N, null),
        document.getElementById('root'),
      );
    },
    92: function (e, t, a) {
      e.exports = a(150);
    },
    97: function (e, t, a) {},
  },
  [[92, 1, 2]],
]);
//# sourceMappingURL=main.1d6354db.chunk.js.map
