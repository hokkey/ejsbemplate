import Type from 'class/util/type-util';
import SwiperManager from 'class/lib/swiper/swiper-manager';

/**
 * Create and connect two carousels to make a carousel with a thumbnail navigation
 *
 * @class ThumbnailSwiper
 * @constructor
 * @param {HTMLElement} $carouselWrapper A parent HTML element of main and nav carousels
 * @param {Object} mainOption Options for main carousel
 * @param {Object} navOption Options for nav carousel
 */

export default class ThumbnailSwiper {

  constructor($carouselWrapper, mainOption = {}, navOption = {}) {

    this.$mainCarousel = $carouselWrapper.querySelector('.js-image-slider-carousel');
    this.$navCarousel = $carouselWrapper.querySelector('.js-image-slider-nav-carousel');

    if (!Type.isElem(this.$mainCarousel) || !Type.isElem(this.$navCarousel)) {
      throw new Error('$carousel and $navCarousel must be HTMLElement!');
    }

    if (!Type.isObject(mainOption) || !Type.isObject(navOption)) {
      throw new Error('option must be Object!');
    }

    this.mainOption = mainOption;
    this.navOption = navOption;

    this.mainSwiper = null;
    this.navSwiper = null;
  }

  init() {
    this.mainSwiper = new SwiperManager(this.$mainCarousel, this.mainOption);
    this.navSwiper = new SwiperManager(this.$navCarousel, this.navOption);

    this.mainSwiper.init();
    this.navSwiper.init();

    // Connect mainSwiper into navSwiper
    this.navSwiper.swiper.params.control = this.mainSwiper.swiper;
  }
}
