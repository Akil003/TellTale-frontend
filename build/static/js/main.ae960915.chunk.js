(this.webpackJsonpnetflix_clone=this.webpackJsonpnetflix_clone||[]).push([[0],{101:function(e,t,n){},104:function(e,t,n){},105:function(e,t,n){},106:function(e,t,n){},116:function(e,t,n){},119:function(e,t,n){},120:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),a=n(44),s=n.n(a),o=(n(72),n(73),n(0)),i=n(12),u=n(35),l=n.n(u),j=l.a.create({baseURL:"https://telltale-backend-0tqm.onrender.com/"}),b=(n(93),n(94),n(122)),d=n(2);function O(e){var t=e.parentClass,n=e.message;return Object(d.jsx)("div",{className:t,children:Object(d.jsx)("div",{className:"alternate__container",children:Object(d.jsx)("div",{children:n})})})}var p=function(){var e,t,n=Object(b.a)({queryKey:["quote"],queryFn:function(){return r.apply(this,arguments)}});if(n.isError)return Object(d.jsx)(O,{parentClass:"banner",message:"Error..."});if(n.isLoading)return Object(d.jsx)(O,{parentClass:"banner",message:"Loading..."});function r(){return(r=Object(i.a)(Object(o.a)().mark((function e(){var t;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.get("/query/quote");case 2:return t=e.sent,console.log(t.data),e.abrupt("return",t.data);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(d.jsxs)("header",{className:"banner",style:{backgroundSize:"cover",backgroundImage:"url(".concat("https://telltale-backend-0tqm.onrender.com/","query/banner)"),backgroundPosition:"center center",backgroundBlendMode:"difference"},children:[Object(d.jsxs)("div",{className:"banner__contents",children:[Object(d.jsx)("div",{className:"banner__buttons",children:Object(d.jsx)("button",{className:"banner__button",children:"My List"})}),Object(d.jsx)("h1",{className:"banner__description",children:(e=n.data.quote,t=250,(null===e||void 0===e?void 0:e.length)>t?e.substr(0,t-1)+"...":e)}),Object(d.jsxs)("h1",{className:"banner__title",children:["- ",n.data.author]})]}),Object(d.jsx)("div",{className:"banner--fadeBottom"})]})},h=n(14),f=n(6),m=(n(53),n(7)),x=n(40),g=(n(97),l.a.create({baseURL:"https://telltale-backend-0tqm.onrender.com"})),v=n(65),_=Object(v.a)("https://klkotatsmplzawrxyuka.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsa290YXRzbXBsemF3cnh5dWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY5NDU3NjgsImV4cCI6MjAwMjUyMTc2OH0.Yo80PXvjszZQyBYA9mDo-M4mUjKXK4s1dsc9DVmHw24");function y(e){var t=e.ebook,n=Object(m.n)(),r=function(){var e=Object(i.a)(Object(o.a)().mark((function e(){var n,r,c,a;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t._id,r=Math.floor(n/1e3),e.next=4,fetch("https://raw.githubusercontent.com/Akil003/TaleTell-static-files/main/".concat(r,"/").concat(n,".webp"));case 4:return c=e.sent,e.next=7,c.blob();case 7:return a=e.sent,e.abrupt("return",URL.createObjectURL(a));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),c=Object(b.a)(["image",t],r),a=c.data,s=c.isLoading,u=c.isError;function l(){return l=Object(i.a)(Object(o.a)().mark((function e(t){var r,c;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.auth.getSession();case 2:if(r=e.sent,console.log("session",r.data),c={},null===r.data.session){e.next=10;break}return e.next=8,g.post("/progress/start",{ebookID:t._id},{headers:{"x-access-token":r.data.session.access_token}}).then((function(e){n("/audiobook",{state:{ebook:t,progress:e.data}})})).catch((function(e){console.log("no progress records"),n("/audiobook",{state:{ebook:t,progress:c.data}})}));case 8:e.next=11;break;case 10:n("/audiobook",{state:{ebook:t,progress:c.data}});case 11:case"end":return e.stop()}}),e)}))),l.apply(this,arguments)}return s||u?Object(d.jsx)(O,{parentClass:"row__poster"}):Object(d.jsxs)("div",{className:"row__poster",onClick:function(){return function(e){return l.apply(this,arguments)}(t)},children:[Object(d.jsx)(x.LazyLoadImage,{className:"poster__image",src:a,alt:t.title,effect:"blur"}),Object(d.jsxs)("div",{className:"poster__details",children:[Object(d.jsx)("div",{className:"poster__title",children:t.title}),Object(d.jsx)("table",{className:"poster__labels",children:Object(d.jsxs)("tbody",{children:[Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:"Authors:"}),Object(d.jsx)("td",{children:t.authors&&t.authors.map((function(e,t){return Object(d.jsxs)("div",{children:[e.first_name," ",e.last_name]},t)}))})]}),t.language&&Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:"Language:"}),Object(d.jsx)("td",{children:t.language})]}),t.totaltimesecs&&Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:"Duration:"}),Object(d.jsx)("td",{children:function(){var e=t.totaltimesecs,n=Math.floor(e/3600),r=Math.floor((e-3600*n)/60);return"".concat(n," hr ").concat(r," mins")}()})]}),Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:"Genres:"}),Object(d.jsx)("td",{children:t.genres&&t.genres.map((function(e,t){return Object(d.jsx)("div",{children:e.name},t)}))})]}),t.copyright_year&&Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:"Copyright year:"}),Object(d.jsx)("td",{children:t.copyright_year})]})]})})]})]})}var k=function(e){var t=e.title,n=e.url,r=Object(b.a)({queryKey:["title",n],queryFn:function(){return u.apply(this,arguments)}}),c=r.data,a=r.isError,s=r.isLoading;if(a)return Object(d.jsx)(O,{parentClass:"row__posters",message:"Error..."});if(s)return Object(d.jsx)(O,{parentClass:"row__posters",message:void 0});function u(){return(u=Object(i.a)(Object(o.a)().mark((function e(){var t,r;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.get(n);case 2:return t=e.sent,r=(r=t.data).filter((function(e){return e.coverImageURL})),e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(d.jsx)("div",{className:"row",children:Object(d.jsxs)(x.LazyLoadComponent,{children:[Object(d.jsx)("h2",{className:"row__title",children:t}),Object(d.jsx)("div",{className:"row__posters",children:c.map((function(e){return Object(d.jsx)(y,{ebook:e},e._id)}))})]})})},N=200;function w(){var e=Object(b.a)({queryKey:["titles"],queryFn:function(){return a.apply(this,arguments)}}),t=e.data,n=e.isError,r=e.isLoading;if(n)return Object(d.jsx)(O,{parentClass:"rows",message:"Error..."});if(r)return Object(d.jsx)(O,{parentClass:"rows",message:"Loading..."});function c(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),r=e[n];e[n]=e[t],e[t]=r}}function a(){return(a=Object(i.a)(Object(o.a)().mark((function e(){var t,n,r,a,s,i,u;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.get("/query/titles");case 2:return t=e.sent,n=t.data,r=n.authors,a=n.genres,s=n.languages,i=n.periods,r=r.map((function(e){return Object(f.a)(Object(f.a)({},e),{},{type:"author"})})),a=a.map((function(e){return Object(f.a)(Object(f.a)({},e),{},{type:"genre"})})),s=s.map((function(e){return Object(f.a)(Object(f.a)({},e),{},{type:"language"})})),i=i.map((function(e){return Object(f.a)(Object(f.a)({},e),{},{type:"period"})})),c(u=[].concat(Object(h.a)(r),Object(h.a)(a),Object(h.a)(s),Object(h.a)(i))),e.abrupt("return",u.slice(0,Math.min(N,u.length)));case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(d.jsx)("div",{className:"rows",children:t.map((function(e,t){if("author"===e.type){var n="By ".concat(e._id.firstName," ").concat(e._id.lastName);return Object(d.jsx)(k,{title:n,url:"/query/author/?firstName=".concat(e._id.firstName,"&lastName=").concat(e._id.lastName)},t)}if("language"===e.type){var r="".concat(e._id," Audiobooks");return Object(d.jsx)(k,{title:r,url:"/query/language/?language=".concat(e._id)},t)}if("genre"===e.type){var c="".concat(e._id);return Object(d.jsx)(k,{title:c,url:"/query/genre/?genre=".concat(encodeURIComponent(e._id))},t)}var a;return"period"===e.type?(a="2000"!==e.from?"From ".concat(e.from," to ").concat(e.to):"".concat(e.from," onwards..."),Object(d.jsx)(k,{title:a,url:"/query/period/?from=".concat(e.from,"&to=").concat(e.to)},t)):Object(d.jsx)(d.Fragment,{})}))})}function L(){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(p,{}),Object(d.jsx)(w,{})]})}var C=n(9);n(101),n(102),n(103),n(104);function E(e){return I.apply(this,arguments)}function I(){return(I=Object(i.a)(Object(o.a)().mark((function e(t){return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.auth.signInWithOAuth({provider:"google"});case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(){var e=Object(r.useState)({}),t=Object(C.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(!1),s=Object(C.a)(a,2),u=s[0],l=s[1];function j(){return b.apply(this,arguments)}function b(){return(b=Object(i.a)(Object(o.a)().mark((function e(){return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(_);case 2:console.log("user",n);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){return(O=Object(i.a)(Object(o.a)().mark((function e(){return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.auth.signOut();case 2:c({}),console.log("done...");case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(r.useEffect)((function(){function e(){return e=Object(i.a)(Object(o.a)().mark((function e(){var t,n,r;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.auth.getSession();case 2:t=e.sent,n=t.data,r={},console.log(n),n.session&&(r=n.session.user.user_metadata),c(r);case 8:case"end":return e.stop()}}),e)}))),e.apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("div",{className:"signin__wrapper",onMouseMove:function(){l(!0)},onMouseLeave:function(){l(!1)},children:[n&&0===Object.keys(n).length&&Object(d.jsx)("button",{id:"siginin__button",className:"signin__button",onClick:j,children:"Sign In"}),n&&Object.keys(n).length>0&&Object(d.jsxs)("div",{className:"signout__wrapper",children:[Object(d.jsx)("button",{className:"signin__profile",style:{backgroundImage:"url(".concat(n.picture,")")},onClick:j}),Object(d.jsx)("button",{className:"signout__button ".concat(u?"signout__visible":""),onClick:function(){return O.apply(this,arguments)},onMouseEnter:function(){l(!0)},onMouseLeave:function(){l(!1)},children:"Sign Out"})]})]})})}var q=function(){var e=Object(r.useState)(!1),t=Object(C.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),s=Object(C.a)(a,2),o=s[0],i=s[1],u=Object(m.n)(),l=function(){window.scrollY>100?c(!0):c(!1)};Object(r.useEffect)((function(){return window.addEventListener("scroll",l),function(){window.removeEventListener("scroll",l)}}),[]);var j=Object(r.useState)(!1),b=Object(C.a)(j,2),O=b[0],p=b[1],h=Object(r.useState)(),f=Object(C.a)(h,2),x=f[0],g=f[1],v=Object(r.useState)(),_=Object(C.a)(v,2),y=_[0],k=_[1];return Object(d.jsxs)("div",{className:"nav ".concat(n&&"nav__black"),children:[Object(d.jsx)("img",{className:"nav__logo",src:"/logo/red-transparent.webp",alt:""}),Object(d.jsxs)("div",{id:"nav_menu",className:"nav__menu ".concat(O?"open":""),onMouseEnter:function(){clearTimeout(x)},onMouseLeave:function(){clearTimeout(x);var e=setTimeout((function(){p(!1)}),100);g(e)},children:[Object(d.jsx)("div",{className:"home__button",onClick:function(){console.log("clicked"),u("/",{state:o})},children:"Home"}),Object(d.jsx)("div",{className:"collections__button",onClick:function(){console.log("clicked"),u("/",{state:o})},children:"Recommendations"})]}),Object(d.jsxs)("div",{className:"navbar-toggle ".concat(O?"open":""),onClick:function(){console.log("menu toggled..."),p(!O)},onMouseEnter:function(){var e=setTimeout((function(){p(!0)}),100);k(e)},onMouseLeave:function(){clearTimeout(y)},children:[Object(d.jsx)("div",{className:"icon-bar"}),Object(d.jsx)("div",{className:"icon-bar"}),Object(d.jsx)("div",{className:"icon-bar"})]}),Object(d.jsx)("div",{className:"search__wrap",children:Object(d.jsxs)("div",{className:"search",children:[Object(d.jsx)("input",{type:"text",className:"search__term",placeholder:"What are you looking for?",onChange:function(e){i(e.target.value)},onFocus:function(e){e.target.placeholder=""},onBlur:function(e){e.target.placeholder="What are you looking for?"}}),Object(d.jsx)("button",{type:"submit",onClick:function(){u("/search",{state:o})},className:"search__button","aria-label":"search keywords",children:Object(d.jsx)("i",{className:"fa fa-search"})})]})}),Object(d.jsx)(M,{})]})};n(105);function S(){var e=Object(r.useState)([]),t=Object(C.a)(e,2),n=t[0],c=t[1],a=Object(m.l)();return Object(r.useEffect)((function(){function e(){return(e=Object(i.a)(Object(o.a)().mark((function e(){var t,n,r;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.state){e.next=3;break}return console.log(a.state),e.abrupt("return");case 3:return t=a.state,e.next=6,j.get("query/search/?keywords=".concat(t));case 6:n=e.sent,r=n.data.filter((function(e){return e.coverImageURL})),c(r);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[a.state]),Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("div",{className:"search__page",children:[Object(d.jsx)("div",{className:"transition"}),Object(d.jsx)("h2",{className:"search__header",children:"Search Results..."}),Object(d.jsx)("div",{className:"search__results",children:n.map((function(e){return Object(d.jsx)(y,{ebook:e},e._id)}))})]})})}n(106);function R(){var e,t,n=Object(m.l)(),r=Object(b.a)({queryKey:["ebook",n.state],queryFn:function(){return n.state}}),c=r.data.ebook,a=r.isError,s=r.isLoading;return a?Object(d.jsx)(O,{parentClass:"left_wrapper"}):s?Object(d.jsx)(O,{parentClass:"left__wrapper"}):Object(d.jsxs)("div",{className:"left__wrapper",children:[Object(d.jsx)("img",{className:"audiobook__image",src:c.coverImageURL,alt:c.title}),Object(d.jsx)("div",{className:"audiobook__details",children:Object(d.jsx)("table",{className:"audiobook__labels",children:Object(d.jsxs)("tbody",{children:[Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:"Authors:"}),Object(d.jsx)("td",{children:null===(e=c.authors)||void 0===e?void 0:e.map((function(e,t){return Object(d.jsxs)("div",{children:[e.first_name," ",e.last_name]},t)}))})]}),c.language&&Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:"Language:"}),Object(d.jsx)("td",{children:c.language})]}),c.totaltimesecs&&Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:"Duration:"}),Object(d.jsx)("td",{children:function(){var e=c.totaltimesecs,t=Math.floor(e/3600),n=Math.floor((e-3600*t)/60);return"".concat(t," hr ").concat(n," mins")}()})]}),Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:"Genres:"}),Object(d.jsx)("td",{children:null===(t=c.genres)||void 0===t?void 0:t.map((function(e,t){return Object(d.jsx)("div",{children:e.name},t)}))})]}),c.copyright_year&&"0"!==c.copyright_year&&Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:"Copyright year:"}),Object(d.jsx)("td",{children:c.copyright_year})]})]})})})]})}var F=n(60),A=(n(116),n(64)),D=n.n(A),T=n(32),U=n(31);n(119);function z(e){var t=e.volume;return Object(d.jsxs)("div",{className:"volume",children:[Object(d.jsx)(T.a,{icon:U.d,size:"3x"}),"\xa0\xa0 ",Object(d.jsxs)("div",{children:[t," %"]})]})}function B(e){var t,n,c,a,s=e.ebook,o=Object(r.useState)(0),i=Object(C.a)(o,2),u=i[0],l=i[1],j=Object(r.useState)(0),b=Object(C.a)(j,2),O=b[0],p=b[1],h=Object(r.useState)(!1),f=Object(C.a)(h,2),m=f[0],x=f[1],g=Object(r.useRef)();Object(r.useEffect)((function(){})),Object(r.useEffect)((function(){if(console.log(s),u){var e=g.current;e&&(e.load(),e.play())}}),[u]);var v=Object(r.useState)(null),_=Object(C.a)(v,2),y=_[0],k=_[1],N=Object(r.useState)(null),w=Object(C.a)(N,2),L=w[0],E=w[1];return Object(r.useEffect)((function(){var e=function(e){"ArrowRight"===e.key?(e.preventDefault(),t("ArrowRight")):"ArrowLeft"===e.key&&(e.preventDefault(),t("ArrowLeft"))},t=function(e){y===e?(clearTimeout(L),k(null),E(null),n()):(k(e),E(setTimeout((function(){k(null),E(null),"ArrowRight"===e?r():"ArrowLeft"===e&&c()}),400)))},n=function(){l((function(e){return e+1}))},r=function(){var e=g.current.currentTime,t=g.current.duration,n=e+10;g.current.currentTime=n<t?n:t},c=function(){var e=g.current.currentTime-10;g.current.currentTime=e>0?e:0};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[u,y,L]),Object(r.useEffect)((function(){var e=function(e){" "===e.key&&(e.preventDefault(),t());var c,a=!1;"ArrowUp"===e.key?(e.preventDefault(),c=n(),a=!0):"ArrowDown"===e.key&&(e.preventDefault(),c=r(),a=!0),a&&(a=!1,p(c),x(!0),setTimeout((function(){x(!1)}),2e3))},t=function(){g.current.paused?g.current.play():g.current.pause()},n=function(){return g.current.volume<1?(g.current.volume+=.1,g.current.volume):1},r=function(){return g.current.volume>0?(g.current.volume-=.1,g.current.volume):0};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[]),Object(d.jsxs)("div",{className:"right__wrapper",children:[m&&Object(d.jsx)(z,{volume:Math.floor(100*Number(O))}),Object(d.jsxs)("div",{className:"section__header",children:[Number(u)+1,". ",s.sections&&(null===(t=s.sections[u])||void 0===t?void 0:t.title)]}),s.sections&&(null===(n=s.sections[u])||void 0===n?void 0:n.readers)&&Object(d.jsxs)("div",{className:"audio__reader",children:[" ",Object(d.jsx)(T.a,{icon:U.c})," \xa0",s.sections[u].readers[0].display_name]}),Object(d.jsx)("div",{className:"audio__wrapper",children:Object(d.jsx)("audio",{autoPlay:!0,ref:g,className:"audio__player",controls:!0,children:Object(d.jsx)("source",{src:s.sections&&(null===(c=s.sections[u])||void 0===c?void 0:c.listen_url),type:"audio/mp3",className:"section__source"})})}),Object(d.jsx)(D.a,{onPageChange:function(e){l(e.selected)},breakLabel:"...",pageCount:null===s||void 0===s||null===(a=s.sections)||void 0===a?void 0:a.length,previousLabel:Object(d.jsx)(T.a,{icon:U.a}),nextLabel:Object(d.jsx)(T.a,{icon:U.b}),pageRangeDisplayed:2,renderOnZeroPageCount:null,containerClassName:"pagination__container",activeClassName:"pagination__active",pageClassName:"pagination__page",previousClassName:"pagination__previous",nextClassName:"pagination__next",breakClassName:"pagination__break",pageLinkClassName:"pagination__page-link"})]})}function J(){var e=Object(m.l)(),t=Object(b.a)({queryKey:["ebook",e.state],queryFn:function(){return a.apply(this,arguments)}}),n=t.data,r=t.isLoading,c=t.isError;if(r)return Object(d.jsx)(O,{parentClass:"audiobook__page",message:"loading..."});if(c)return Object(d.jsx)(O,{parentClass:"audiobook__page",message:"Error..."});function a(){return(a=Object(i.a)(Object(o.a)().mark((function t(){var n,r,c,a;return Object(o.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("location",e.state),n=e.state,r=n.ebook,c=n.progress,console.log(r,c),console.log("working..."),r||window.history.back(),t.next=7,j.get("query/id?_id=".concat(r._id));case 7:return a=t.sent,r=a.data,t.abrupt("return",{ebook:r,progress:c});case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("div",{className:"audiobook__page",children:[Object(d.jsx)("div",{className:"transition"}),Object(d.jsxs)("div",{className:"audiobook",children:[Object(d.jsx)("h2",{className:"audiobook__header",children:n.ebook.title}),Object(d.jsxs)("div",{className:"audiobook__wrapper",children:[Object(d.jsx)(R,{}),Object(d.jsx)(B,{ebook:n.ebook,progress:n.progress})]}),Object(d.jsx)("h2",{className:"description__header",children:"Description"}),n.ebook.description&&Object(d.jsx)("div",{className:"audiobook__description",children:Object(F.a)(n.ebook.description)})]})]})})}function K(){return Object(d.jsxs)("div",{children:[Object(d.jsx)(q,{}),Object(d.jsxs)(m.c,{children:[Object(d.jsx)(m.a,{path:"/",element:Object(d.jsx)(L,{})}),Object(d.jsx)(m.a,{path:"audiobook",element:Object(d.jsx)(J,{})}),Object(d.jsx)(m.a,{path:"search",element:Object(d.jsx)(S,{})})]})]})}var X=function(){return Object(d.jsx)("div",{className:"app",children:Object(d.jsx)(m.c,{children:Object(d.jsx)(m.a,{exact:!0,path:"/*",element:Object(d.jsx)(K,{})})})})},Y=n(20),P=n(123),W=n(57),Z=new P.a({defaultOptions:{queries:{enabled:!0,refetchOnMount:!1,refetchOnWindowFocus:!1,refetchIntervalInBackground:2e4,refetchOnReconnect:!1}}});s.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(W.a,{client:Z,children:Object(d.jsx)(Y.a,{children:Object(d.jsx)(X,{})})})}),document.getElementById("root"))},53:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},93:function(e,t,n){},94:function(e,t,n){},97:function(e,t,n){}},[[120,1,2]]]);
//# sourceMappingURL=main.ae960915.chunk.js.map