(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{248:function(t,e,r){var content=r(252);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(75).default)("592d402d",content,!0,{sourceMap:!1})},251:function(t,e,r){"use strict";r(248)},252:function(t,e,r){var n=r(74)(!1);n.push([t.i,".switches[data-v-e89a7f36]{display:flex;text-align:right;justify-content:flex-end}",""]),t.exports=n},258:function(t,e,r){"use strict";r.r(e);r(112),r(10),r(57);var n=r(21),o=r(29),l=r(55),c=r(56),f=r(39),d=r(9),v=r(113),h=r(242);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(c.a)(this,r)}}var m=function(t,e,r,desc){var n,o=arguments.length,l=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(l=(o<3?n(l):o>3?n(e,r,l):n(e,r))||l);return o>3&&l&&Object.defineProperty(e,r,l),l},O=function(t){Object(l.a)(r,t);var e=y(r);function r(){var t;return Object(n.a)(this,r),(t=e.apply(this,arguments)).loading=!0,t.arrivals=[],t.useTog=!0,t.useBus=!0,t.useMetro=!0,t.reloader=void 0,t.nexttime=null,t}return Object(o.a)(r,[{key:"stopReloader",value:function(){clearInterval(this.reloader),this.reloader=void 0}},{key:"startReloader",value:function(){this.reloader=setInterval(this.loadArrivals,3e4)}},{key:"resetNext",value:function(){this.nexttime=null}},{key:"loadNext",value:function(){var element=this.arrivals[this.arrivals.length-1];this.nexttime=element.time.datetime,this.loadArrivals()}},{key:"loadArrivals",value:function(){var t=this;this.loading=!0,this.$api.arrivalBoard(this.station.id,this.nexttime,this.useTog,this.useMetro,this.useBus).then((function(data){t.arrivals=data})).catch((function(t){throw t})).finally((function(){t.loading=!1}))}},{key:"mounted",value:function(){this.loadArrivals(),this.startReloader()}}]),r}(v.Vue);m([Object(v.Prop)()],O.prototype,"station",void 0);var j=O=m([Object(v.Component)({components:{Board:h.default}})],O),x=(r(251),r(28)),component=Object(x.a)(j,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",[r("b-loading",{model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}}),t._v(" "),t.arrivals?[r("div",{staticClass:"switches"},[r("b-field",[t._v("\n        Use train\n        "),r("b-switch",{attrs:{size:"is-small"},on:{input:t.loadArrivals},model:{value:t.useTog,callback:function(e){t.useTog=e},expression:"useTog"}})],1),t._v(" "),r("b-field",[t._v("\n        Use bus\n        "),r("b-switch",{attrs:{size:"is-small"},on:{input:t.loadArrivals},model:{value:t.useBus,callback:function(e){t.useBus=e},expression:"useBus"}})],1),t._v(" "),r("b-field",[t._v("\n        Use metro\n        "),r("b-switch",{attrs:{size:"is-small"},on:{input:t.loadArrivals},model:{value:t.useMetro,callback:function(e){t.useMetro=e},expression:"useMetro"}})],1)],1),t._v(" "),t.nexttime?r("p",{on:{click:t.resetNext}},[t._v("To start")]):t._e(),t._v(" "),r("board",{attrs:{rows:t.arrivals,departure:!1,station:t.station},on:{"view-details":t.stopReloader,"hide-details":t.startReloader}}),t._v(" "),r("p",{on:{click:t.loadNext}},[t._v("Next")])]:t._e()],2)}),[],!1,null,"e89a7f36",null);e.default=component.exports;installComponents(component,{Board:r(242).default})},264:function(t,e,r){"use strict";r.r(e);r(112);var n=r(21),o=r(55),l=r(56),c=r(39),f=r(9),d=r(113),v=r(250),h=r(258);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(c.a)(t);if(e){var o=Object(c.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(l.a)(this,r)}}var m=function(t,e,r,desc){var n,o=arguments.length,l=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(l=(o<3?n(l):o>3?n(e,r,l):n(e,r))||l);return o>3&&l&&Object.defineProperty(e,r,l),l},O=function(t){Object(o.a)(r,t);var e=y(r);function r(){var t;return Object(n.a)(this,r),(t=e.apply(this,arguments)).activeTab="departure",t}return r}(d.Vue);m([Object(d.Prop)()],O.prototype,"station",void 0);var j=O=m([Object(d.Component)({components:{DepartureBoard:v.default,ArrivalBoard:h.default}})],O),x=r(28),component=Object(x.a)(j,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-tabs",{staticClass:"block",attrs:{position:"is-centered",size:"is-medium",type:"is-toggle",animated:!1},model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}},[r("b-tab-item",{key:"departure",attrs:{value:"departure",label:"Departures"}},[r("departure-board",{attrs:{station:t.station}})],1),t._v(" "),r("b-tab-item",{key:"arrival",attrs:{value:"arrival",label:"Arrivals"}},[r("arrival-board",{attrs:{station:t.station}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{DepartureBoard:r(250).default,ArrivalBoard:r(258).default})}}]);