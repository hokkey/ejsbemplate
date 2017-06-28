// Lib:
import svg4everybody from 'svg4everybody';
// Function:
import dotdotdot from 'util/jq-dotdotdot';
import scrollToAnchor from 'util/jq-scroll-to-anchor'
// Class:
import Elem from 'class/util/element-util';
import Particles from 'class/particles.js';
import Drawer from 'class/drawer';
import Toggleable from 'class/toggleable';
import ToggleableBtn from 'class/toggleable-btn';
import JqAccordion from 'class/jq/accordion';
import JqPulldown from 'class/jq/pulldown';
import Gmap from 'class/Gmap.js';
import Event from 'class/util/lazy-event-util';

/**
 * @constructor
 */
export class App {
  constructor() {
  }

  init() {
    this._startTopContent();
    this._initDrawers();
    this._initAccordions();
    this._initPulldownMenus();
    this._initParticles();
    this._initGmap();
    this._initFloatingHeader();
    scrollToAnchor(400, -60);
    dotdotdot('.js-dotdotdot');
  }

  _initFloatingHeader() {
    const header = document.querySelectorAll('.js-site-header');
    const hook = document.querySelector('.js-site-header-hook');

    if (hook === null) {
      return;
    }

    const toggle = new Toggleable(header, 'is-hidden', true);
    const offsetTop = hook.offsetTop;

    Event.attachLazyScrollCb(window, (e, scroll) => {
      if (scroll.y > offsetTop) {
        toggle.remove();
        return;
      }
      toggle.add();
    });
  };

  _startTopContent() {
    const top = document.querySelectorAll('.js-top-content');
    Elem.eachNode(top, (elem) => {
      elem.classList.add('is-started');
    });
  }

  _initPulldownMenus() {
    const menus = document.querySelectorAll('.js-pulldown');
    Elem.eachNode(menus, (elem) => {
      new JqPulldown(elem);
    });
  }

  _initGmap() {
    const gmaps = document.querySelectorAll('.js-gmap');
    Elem.eachNode(gmaps, (elem) => {
      try {
        const map = new Gmap(elem);
        map.init();
      } catch(e) {
        this.debug(e);
      }
    });
  }

  _initAccordions() {
    const accordions = document.querySelectorAll('.js-accordion');
    Elem.eachNode(accordions, (elem) => {
      try {
        new JqAccordion(elem);
      } catch(e) {
        this.debug(e);
      }
    });
  }

  _initParticles() {
    const jspElems = document.querySelectorAll('.js-particles');
    Elem.eachNode(jspElems, (elem) => {
      try {
        new Particles(elem);
      } catch(e) {
        this.debug(e);
      }
    });
  }

  // init drawer elements
  _initDrawers() {
    try {
      const btns = new ToggleableBtn(document.querySelectorAll('.js-toggle-drawer'), Drawer);
      btns.init();
    } catch (e) {
      this.debug(e);
    }
  }

  polyfill() {
    svg4everybody();
  }

  debug(e) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(e);
    }
  }
}

const app = new App('main');
app.polyfill();
app.init();
if (process.env.NODE_ENV === 'development') {
  app.debug('On debug mode');
}
