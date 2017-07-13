// Lib:
import svg4everybody from 'svg4everybody';
// Function:
import dotdotdot from 'util/jq-dotdotdot';
import scrollToAnchor from 'util/jq-scroll-to-anchor'

/**
 * @constructor
 */
export class App {
  constructor() {
  }

  init() {
    scrollToAnchor(400, -60);
    dotdotdot('.js-dotdotdot');
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
