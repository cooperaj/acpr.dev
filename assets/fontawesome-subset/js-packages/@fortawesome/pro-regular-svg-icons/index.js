(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['pro-regular-svg-icons'] = {})));
}(this, (function (exports) { 'use strict';

  var prefix = "far";
  var faEnvelopeSquare = {
    prefix: 'far',
    iconName: 'envelope-square',
    icon: [448, 512, [], "f199", "M187.293 260.374C114.743 210.491 115.482 210.366 96 196v-12c0-13.255 10.745-24 24-24h208c13.255 0 24 10.745 24 24v12c-19.497 14.376-18.747 14.494-91.293 64.374-8.414 5.812-25.104 19.79-36.707 19.625-11.6.166-28.296-13.816-36.707-19.625zm91.563 26.355C267.519 294.575 247.377 312.105 224 312c-23.241.104-43.082-17.118-54.849-25.266-45.054-30.977-62.02-42.883-73.151-50.958V328c0 13.255 10.745 24 24 24h208c13.255 0 24-10.745 24-24v-92.224c-11.13 8.074-28.094 19.978-73.144 50.953zM448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-48 346V86a6 6 0 0 0-6-6H54a6 6 0 0 0-6 6v340a6 6 0 0 0 6 6h340a6 6 0 0 0 6-6z"]
  };
  var faSquare = {
    prefix: 'far',
    iconName: 'square',
    icon: [448, 512, [], "f0c8", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"]
  };
  var _iconsCache = {
    faEnvelopeSquare: faEnvelopeSquare,
    faSquare: faSquare
  };

  exports.far = _iconsCache;
  exports.prefix = prefix;
  exports.faEnvelopeSquare = faEnvelopeSquare;
  exports.faSquare = faSquare;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
