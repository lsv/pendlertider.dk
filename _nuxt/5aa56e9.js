(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{287:function(t,e,n){var content=n(301);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(110).default)("475a0971",content,!0,{sourceMap:!1})},290:function(t,e,n){"use strict";n(206);e.a=function(t,e){function n(t){return t*(Math.PI/180)}return e?{km:(o=t.latitude,r=t.longitude,c=e.latitude,l=e.longitude,f=n(c-o),d=n(l-r),a=Math.sin(f/2)*Math.sin(f/2)+Math.cos(n(o))*Math.cos(n(c))*Math.sin(d/2)*Math.sin(d/2),h=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)),parseFloat((6371*h).toFixed(2)))}:null;var o,r,c,l,f,d,a,h}},297:function(t,e,n){"use strict";n.r(e);n(83);var o=n(21),r=n(44),c=n(58),l=n(59),f=n(31),d=n(11),h=(n(25),n(12),n(84),n(60)),v=n(290),m=n(86);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(f.a)(t);if(e){var r=Object(f.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var k=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},O=function(t){Object(c.a)(n,t);var e=y(n);function n(){var t;return Object(o.a)(this,n),(t=e.apply(this,arguments)).nearbys=[],t.isFetching=!1,t.geoSupport=!1,t}return Object(r.a)(n,[{key:"mounted",value:function(){this.$geolocation.checkSupport()&&(this.geoSupport=!0)}},{key:"distance",value:function(t){if(this.$geolocation.loading||!this.$geolocation.supported)return"";var e=Object(v.a)(t.coordinate,this.$geolocation.coords);return e?e.km.toString():""}},{key:"redirect",value:function(option){this.$router.push("station/".concat(option.id,"/boards"))}},{key:"closest",value:function(){var t,e,n=this;(null===(t=this.$geolocation.coords)||void 0===t?void 0:t.longitude)&&(null===(e=this.$geolocation.coords)||void 0===e?void 0:e.latitude)?this.$api.closest(Object(m.a)(this.$geolocation.coords.longitude,this.$geolocation.coords.latitude,!1)).then((function(data){n.nearbys=data})).catch((function(t){throw n.nearbys=[],t})):this.geoSupport=!1}}]),n}(h.Vue),j=O=k([h.Component],O),w=(n(300),n(43)),component=Object(w.a)(j,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.geoSupport?n("div",[n("b-dropdown",{attrs:{scrollable:!0,"max-height":280,position:"is-bottom-left"},scopedSlots:t._u([{key:"trigger",fn:function(){return[n("b-button",{attrs:{label:"","icon-left":"map-marker"},nativeOn:{click:function(e){return t.closest()}}})]},proxy:!0}],null,!1,2095612680)},[t._v(" "),t._l(t.nearbys,(function(e,o){return n("b-dropdown-item",{key:o,attrs:{value:e,"has-link":"true"}},[n("nuxt-link",{staticClass:"element",attrs:{to:t.localePath({name:"station-station-boards",params:{station:e.id}})}},[n("div",{staticClass:"name",domProps:{textContent:t._s(e.name)}}),t._v(" "),n("div",{staticClass:"distance"},[n("span",{domProps:{textContent:t._s(t.distance(e))}}),t._v(" km")])])],1)}))],2)],1):t._e()}),[],!1,null,"1b5ea8c8",null);e.default=component.exports},300:function(t,e,n){"use strict";n(287)},301:function(t,e,n){var o=n(109)(!1);o.push([t.i,".element[data-v-1b5ea8c8]{display:flex}.element .name[data-v-1b5ea8c8]{font-weight:700;flex-grow:1}.element .distance[data-v-1b5ea8c8]{align-self:flex-end}.element .distance span[data-v-1b5ea8c8]{font-weight:700}",""]),t.exports=o}}]);