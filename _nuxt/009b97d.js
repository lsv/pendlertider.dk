(window.webpackJsonp=window.webpackJsonp||[]).push([[3,5],{284:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"to_start":"Back to now","next":"Next"},"da":{"to_start":"Tilbage til nu","next":"Næste"}}'),delete t.options._Ctor}},294:function(t,e,n){"use strict";var o=n(284),r=n.n(o);e.default=r.a},296:function(t,e,n){"use strict";n.r(e);n(83);var o=n(21),r=n(44),c=n(58),l=n(59),f=n(31),d=n(11),h=(n(25),n(12),n(85),n(60)),v=n(286),y=n(289);function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(f.a)(t);if(e){var r=Object(f.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var O=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},R=function(t){Object(c.a)(n,t);var e=w(n);function n(){var t;return Object(o.a)(this,n),(t=e.apply(this,arguments)).apiRoute="",t.isDeparture=!0,t.loading=!0,t.rows=[],t.reloader=void 0,t.nexttime=null,t.useTog=!0,t.useMetro=!0,t.useBus=!0,t}return Object(r.a)(n,[{key:"resetNext",value:function(){this.nexttime=null}},{key:"loadNext",value:function(){var element=this.rows[this.rows.length-1];this.nexttime=element.time.datetime}},{key:"switches",value:function(t){this.useTog=t.useTog,this.useMetro=t.useMetro,this.useBus=t.useBus}},{key:"loadRows",value:function(){var t=this;this.loading=!0,this.$api[this.apiRoute](this.station.id,this.nexttime,this.useTog,this.useMetro,this.useBus).then((function(data){t.rows=data})).catch((function(t){throw t})).finally((function(){t.loading=!1}))}},{key:"stopReloader",value:function(){clearInterval(this.reloader),this.reloader=void 0}},{key:"startReloader",value:function(){this.reloader=setInterval(this.loadRows,3e4)}},{key:"mounted",value:function(){this.loadRows(),this.startReloader()}}]),n}(h.Vue);O([Object(h.Prop)()],R.prototype,"station",void 0),O([Object(h.Watch)("nexttime"),Object(h.Watch)("useMetro"),Object(h.Watch)("useTog"),Object(h.Watch)("useBus")],R.prototype,"loadRows",null);var j=R=O([Object(h.Component)({components:{BoardSwitches:y.default,Board:v.default}})],R),x=n(43),_=n(294),component=Object(x.a)(j,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("b-loading",{model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}}),t._v(" "),t.rows?[n("board-switches",{on:{update:t.switches}}),t._v(" "),t.nexttime?n("p",{domProps:{textContent:t._s(t.$t("to_start"))},on:{click:t.resetNext}}):t._e(),t._v(" "),n("board",{attrs:{rows:t.rows,departure:t.isDeparture,station:t.station},on:{"view-details":t.stopReloader,"hide-details":t.startReloader}}),t._v(" "),n("p",{domProps:{textContent:t._s(t.$t("next"))},on:{click:t.loadNext}})]:t._e()],2)}),[],!1,null,null,null);"function"==typeof _.default&&Object(_.default)(component);e.default=component.exports;installComponents(component,{BoardSwitches:n(289).default,Board:n(286).default})},328:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return y}));n(83);var o,r=n(21),c=n(58),l=n(59),f=n(31),d=(n(50),n(60)),h=n(296);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(f.a)(t);if(e){var r=Object(f.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var y=Object(d.Component)(o=function(t){Object(c.a)(n,t);var e=v(n);function n(){var t;Object(r.a)(this,n);for(var o=arguments.length,c=new Array(o),l=0;l<o;l++)c[l]=arguments[l];return(t=e.call.apply(e,[this].concat(c))).apiRoute="arrivalBoard",t.isDeparture=!1,t}return n}(h.default))||o}}]);