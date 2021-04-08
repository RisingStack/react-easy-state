(this.webpackJsonpcontacts = this.webpackJsonpcontacts || []).push([
  [0],
  {
    18: function (e, t, n) {
      e.exports = n(25);
    },
    23: function (e, t, n) {},
    25: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(0),
        c = n.n(a),
        o = n(10),
        l = n.n(o),
        r = (n(23), n(3)),
        m = n(17),
        i = n(5),
        u = n(6),
        s = n(8),
        d = n(7),
        p = Object(r.a)({
          contacts: [],
          addContact: function (e) {
            (e.name = e.name || 'Placeholder'),
              (e.email = e.email || 'Placeholder'),
              p.contacts.push(e);
          },
          deleteContact: function (e) {
            var t = p.contacts.indexOf(e);
            p.contacts.splice(t, 1);
          },
        }),
        E = p,
        C = (function (e) {
          Object(s.a)(n, e);
          var t = Object(d.a)(n);
          function n(e) {
            var a,
              c = e.contact;
            return (
              Object(i.a)(this, n),
              ((a = t.call(this)).onEdit = function () {
                a.compStore.editing = !0;
              }),
              (a.onDelete = function () {
                E.deleteContact(a.props.contact);
              }),
              (a.onSave = function () {
                Object.assign(
                  a.props.contact,
                  a.compStore.currentContact,
                ),
                  (a.compStore.editing = !1);
              }),
              (a.onCancel = function () {
                Object.assign(
                  a.compStore.currentContact,
                  a.props.contact,
                ),
                  (a.compStore.editing = !1);
              }),
              (a.onChange = function (e) {
                a.compStore.currentContact[e.target.name] =
                  e.target.value;
              }),
              (a.compStore = Object(r.a)({
                currentContact: Object(m.a)({}, c),
                editing: !1,
              })),
              a
            );
          }
          return (
            Object(u.a)(n, [
              {
                key: 'render',
                value: function () {
                  var e = this.onChange,
                    t = this.onSave,
                    n = this.onCancel,
                    a = this.onEdit,
                    o = this.onDelete,
                    l = this.compStore,
                    r = l.currentContact,
                    m = l.editing,
                    i = this.props.contact;
                  return m
                    ? c.a.createElement(
                        'tr',
                        { className: 'contact-editor' },
                        c.a.createElement(
                          'td',
                          null,
                          c.a.createElement('input', {
                            name: 'name',
                            value: r.name,
                            onChange: e,
                            autoFocus: !0,
                          }),
                        ),
                        c.a.createElement(
                          'td',
                          null,
                          c.a.createElement('input', {
                            name: 'email',
                            value: r.email,
                            onChange: e,
                          }),
                        ),
                        c.a.createElement(
                          'td',
                          null,
                          c.a.createElement(
                            'button',
                            { onClick: t },
                            c.a.createElement('i', {
                              className: 'zmdi zmdi-save',
                            }),
                          ),
                          c.a.createElement(
                            'button',
                            { onClick: n },
                            c.a.createElement('i', {
                              className: 'zmdi zmdi-close',
                            }),
                          ),
                        ),
                      )
                    : c.a.createElement(
                        'tr',
                        { className: 'contact-display' },
                        c.a.createElement('td', null, i.name),
                        c.a.createElement('td', null, i.email),
                        c.a.createElement(
                          'td',
                          null,
                          c.a.createElement(
                            'button',
                            { onClick: a },
                            c.a.createElement('i', {
                              className: 'zmdi zmdi-edit',
                            }),
                          ),
                          c.a.createElement(
                            'button',
                            { onClick: o },
                            c.a.createElement('i', {
                              className: 'zmdi zmdi-delete',
                            }),
                          ),
                        ),
                      );
                },
              },
            ]),
            n
          );
        })(a.Component),
        h = Object(r.b)(C),
        b = (function (e) {
          Object(s.a)(n, e);
          var t = Object(d.a)(n);
          function n() {
            var e;
            Object(i.a)(this, n);
            for (
              var a = arguments.length, c = new Array(a), o = 0;
              o < a;
              o++
            )
              c[o] = arguments[o];
            return (
              ((e = t.call.apply(
                t,
                [this].concat(c),
              )).compStore = Object(r.a)({
                newContact: { name: '', email: '' },
              })),
              (e.addContact = function () {
                E.addContact(e.compStore.newContact),
                  (e.compStore.newContact = { name: '', email: '' });
              }),
              (e.onChange = function (t) {
                e.compStore.newContact[t.target.name] =
                  t.target.value;
              }),
              e
            );
          }
          return (
            Object(u.a)(n, [
              {
                key: 'render',
                value: function () {
                  var e = this.addContact,
                    t = this.onChange,
                    n = this.compStore.newContact;
                  return c.a.createElement(
                    'tr',
                    { className: 'contact-creator' },
                    c.a.createElement(
                      'td',
                      null,
                      c.a.createElement('input', {
                        name: 'name',
                        value: n.name,
                        onChange: t,
                        placeholder: 'Contact name...',
                      }),
                    ),
                    c.a.createElement(
                      'td',
                      null,
                      c.a.createElement('input', {
                        name: 'email',
                        value: n.email,
                        onChange: t,
                        placeholder: 'Contact email...',
                      }),
                    ),
                    c.a.createElement(
                      'td',
                      null,
                      c.a.createElement(
                        'button',
                        { onClick: e },
                        'Add Contact',
                      ),
                    ),
                  );
                },
              },
            ]),
            n
          );
        })(a.Component),
        f = Object(r.b)(b),
        g = Object(r.b)(function () {
          return c.a.createElement(
            'table',
            null,
            c.a.createElement(
              'thead',
              null,
              c.a.createElement(
                'tr',
                null,
                c.a.createElement('th', null, 'Name'),
                c.a.createElement('th', null, 'Email'),
                c.a.createElement('th', null, 'Action'),
              ),
            ),
            c.a.createElement(
              'tbody',
              null,
              E.contacts.map(function (e) {
                return c.a.createElement(h, {
                  contact: e,
                  key: e.email,
                });
              }),
              c.a.createElement(f, null),
            ),
          );
        });
      l.a.render(
        c.a.createElement(g, null),
        document.getElementById('root'),
      );
    },
  },
  [[18, 1, 2]],
]);
//# sourceMappingURL=main.1c43394b.chunk.js.map
