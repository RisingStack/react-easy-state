(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(25)},21:function(e,t,n){},25:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(10),l=n.n(o),r=(n(21),n(2)),m=n(5),i=n(6),u=n(8),s=n(1),d=n(7),p=Object(r.a)({contacts:[],addContact:function(e){e.name=e.name||"Placeholder",e.email=e.email||"Placeholder",p.contacts.push(e)},deleteContact:function(e){var t=p.contacts.indexOf(e);p.contacts.splice(t,1)}}),E=p,C=function(e){function t(e){var n,a=e.contact;return Object(m.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this))).onEdit=function(){n.compStore.editing=!0},n.onDelete=function(){E.deleteContact(n.props.contact)},n.onSave=function(){Object.assign(n.props.contact,n.compStore.currentContact),n.compStore.editing=!1},n.onCancel=function(){Object.assign(n.compStore.currentContact,n.props.contact),n.compStore.editing=!1},n.onChange=function(e){n.compStore.currentContact[e.target.name]=e.target.value},n.compStore=Object(r.a)({currentContact:Object.assign({},a),editing:!1}),n}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.onChange,t=this.onSave,n=this.onCancel,a=this.onEdit,o=this.onDelete,l=this.compStore,r=l.currentContact,m=l.editing,i=this.props.contact;return m?c.a.createElement("tr",{className:"contact-editor"},c.a.createElement("td",null,c.a.createElement("input",{name:"name",value:r.name,onChange:e,autoFocus:!0})),c.a.createElement("td",null,c.a.createElement("input",{name:"email",value:r.email,onChange:e})),c.a.createElement("td",null,c.a.createElement("button",{onClick:t},c.a.createElement("i",{className:"zmdi zmdi-save"})),c.a.createElement("button",{onClick:n},c.a.createElement("i",{className:"zmdi zmdi-close"})))):c.a.createElement("tr",{className:"contact-display"},c.a.createElement("td",null,i.name),c.a.createElement("td",null,i.email),c.a.createElement("td",null,c.a.createElement("button",{onClick:a},c.a.createElement("i",{className:"zmdi zmdi-edit"})),c.a.createElement("button",{onClick:o},c.a.createElement("i",{className:"zmdi zmdi-delete"}))))}}]),t}(a.Component),h=Object(r.b)(C),b=function(e){function t(){var e,n;Object(m.a)(this,t);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(c)))).compStore=Object(r.a)({newContact:{name:"",email:""}}),n.addContact=function(){E.addContact(n.compStore.newContact),n.compStore.newContact={name:"",email:""}},n.onChange=function(e){n.compStore.newContact[e.target.name]=e.target.value},n}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.addContact,t=this.onChange,n=this.compStore.newContact;return c.a.createElement("tr",{className:"contact-creator"},c.a.createElement("td",null,c.a.createElement("input",{name:"name",value:n.name,onChange:t,placeholder:"Contact name..."})),c.a.createElement("td",null,c.a.createElement("input",{name:"email",value:n.email,onChange:t,placeholder:"Contact email..."})),c.a.createElement("td",null,c.a.createElement("button",{onClick:e},"Add Contact")))}}]),t}(a.Component),f=Object(r.b)(b),g=Object(r.b)(function(){return c.a.createElement("table",null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Name"),c.a.createElement("th",null,"Email"),c.a.createElement("th",null,"Action"))),c.a.createElement("tbody",null,E.contacts.map(function(e){return c.a.createElement(h,{contact:e,key:e.email})}),c.a.createElement(f,null)))});l.a.render(c.a.createElement(g,null),document.getElementById("root"))}},[[16,2,1]]]);
//# sourceMappingURL=main.7dfe4a5f.chunk.js.map