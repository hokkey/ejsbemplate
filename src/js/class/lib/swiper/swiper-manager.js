import Type from 'class/util/type-util';
import 'swiper';

/**
 * Manage a carousel using swiper.js
 *
 * @class SwiperManager
 * @constructor
 * @param {HTMLElement} $carousel
 * @param {Object} option Swipe.js options
 * @param {baseName} baseName
 */

export default class SwiperManager {
  constructor($carousel, option, baseName = 'swiper') {

    // Check data type

    if (!Type.isElem($carousel)) {
      throw new Error('$target must be HTMLElement!');
    }

    if (!Type.isObject(option)) {
      throw new Error('option must be Object!');
    }

    if (!Type.isString(baseName)) {
      throw new Error('baseName must be String!');
    }

    this.baseName = baseName;

    this.$carousel = $carousel;
    this.$next = $carousel.querySelector('.js-next');
    this.$prev = $carousel.querySelector('.js-prev');

    this.defaultOption = {
      // http://idangero.us/swiper/api/#.WYGHl9Pyjvo

      loop: true,
      centeredSlides: true,
      paginationClickable: true,
      keyboardControl: false,
      slideToClickedSlide: true,

      bulletClass: `${this.baseName}__bullet`,

      pagination: `.${this.baseName}__pagination`,
      nextButton: `.${this.baseName}__next`,
      prevButton: `.${this.baseName}__prev`,

      bulletActiveClass: 'is-active',
      wrapperClass: 'swiper-wrapper',
      slideClass: 'swiper-slide',
      slideActiveClass: 'is-active',
      slideNextClass: 'is-next',
      slidePrevClass: 'is-prev',
      slideDuplicateClass: 'is-duplicated',
      slideDuplicateActiveClass: 'is-active-dup',
      slideDuplicateNextClass: 'is-next-dup',
      slideDuplicatePrevClass: 'is-prev-dup',

      speed: 800,
      slidesPerView: 'auto',
      spaceBetween: 0,

      // Custom config key
      smMinSlideLength: 3
    };

    this.swiper = null;

    // Merge options
    this.option = Object.assign({}, this.defaultOption, option);
  }

  /**
   * @method init A first-time one-shot initialize
   * @return {void}
   */
  init() {
    // Do not continue if the slides are less than smMinSlideLength.
    if (this.$carousel.querySelectorAll('.' + this.option.slideClass).length < this.option.smMinSlideLength) {
      return;
    }
    this.renew();
  }

  /**
   * @method renew Renew state of the swiper.js instance. Also re-link next/prev buttons if it is necessary.
   * @return {void}
   */
  renew() {
    this.destroy();
    this.swiper = this._createSwiper(this.option);
    this._manageNextBtn('add');
    this._managePrevBtn('add');
  }

  // Original Swiper.js can't handle next/prev buttons outside of the container element by default.
  // These methods link such buttons as next/prev buttons.
  _manageNextBtn(mode = 'add') {
    this._manageBtn(this.$next, 'nextListener', 'slideNext', mode);
  }

  _managePrevBtn(mode = 'add') {
    this._manageBtn(this.$prev, 'prevListener', 'slidePrev', mode);
  }

  _manageBtn($btn, listenerName, methodName, mode = 'add') {
    if ($btn === null) {
      return;
    }

    if (typeof this[listenerName] === 'undefined') {
      this[listenerName] = this[methodName].bind(this);
    }

    switch (mode) {

    case 'add':
      $btn.addEventListener('click', this[listenerName]);
      break;

    case 'remove':
      $btn.removeEventListener('click', this[listenerName]);
      break;

    default:
      throw new Error('Unexpected default switch!');
    }
  }

  slideNext() {
    if (this.swiper === null) {
      return;
    }
    this.swiper.slideNext();
  }

  slidePrev() {
    if (this.swiper === null) {
      return;
    }
    this.swiper.slidePrev();
  }

  destroy() {
    if (this.swiper !== null) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }

    this._manageNextBtn('remove');
    this._managePrevBtn('remove');
  }

  _createSwiper(option) {
    return new Swiper(this.$carousel, option);
  }

}
