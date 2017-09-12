import SwiperManager from 'class/lib/swiper/swiper-manager'
import Event from 'class/util/lazy-event-util';
import Screen from 'class/util/screen-util';

/**
 * Manage a carousel which only necessary to initialize for one side of PC or SP, about RWD site
 *
 * @class MultiDeviceSwiperManager
 * @constructor
 * @extends SwiperManager
 */

export default class MultiDeviceSwiperManager extends SwiperManager {
  constructor($carousel, option, baseName = 'swiper') {
    super($carousel, option, baseName);

    // Additional option
    this.option = Object.assign({}, {
      mdsmLimitationScreenWidth: 720,
      mdsmLimitationIsMinValue: true
    }, this.option);

    this.screenState = null;
  }

  init() {
    if (this._isAvailableWidth()) {
      super.init();
    }
    this._watchResize();
  }

  update() {
    const swiperIsUsed = (this.swiper !== null);
    const isAvailableWidth = this._isAvailableWidth();

    // Case: swiper is already available and we don't need it.
    if (swiperIsUsed && !isAvailableWidth) {
      this.destroy();
      return;
    }

    // Case: swiper isn't available but we need it.
    if (!swiperIsUsed && isAvailableWidth) {
      this.renew();
      // return;
    }

    // Case: swiper is already available and we still need it.
    // Case: swiper isn't available and we don't need it.
    // Do nothing in those cases
  }

  _watchResize() {
    Event.attachLazyHorizontalResizeCb(window, () => {
      this.update();
    });
  }

  _isAvailableWidth() {
    return Screen.isNarrowerThan(this.option.mdsmLimitationScreenWidth) !== this.option.mdsmLimitationIsMinValue;
  }

}
