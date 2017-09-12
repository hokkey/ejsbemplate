const d = document.documentElement;
const ua = window.navigator.userAgent;
const isIE = (ua.indexOf('MSIE') > 0 || !!ua.match(/Trident.*rv\:11\./));
const isEdge = (ua.indexOf('Edge') > 0);

if (isIE) {
  d.className = 'is-js is-ie';

  // babel polyfill only for IE
  (() => {
    const testObject = {};

    if (!(Object.setPrototypeOf || testObject.__proto__)) {
      const nativeGetPrototypeOf = Object.getPrototypeOf;

      Object.getPrototypeOf = (object) => {
        if (object.__proto__) {
          return object.__proto__;
        }
        return nativeGetPrototypeOf.call(Object, object);
      }
    }
  })();
}

if (!isIE) {
  d.className = 'is-js';
}

if (isEdge) {
  d.className = 'is-js is-edge';
}
