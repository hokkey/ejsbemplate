import $ from 'jquery';

const $win = $(window);

export default class ScreenUtil {
  static isWiderThan(width) {
    return $win.width() > width;
  }

  static isNarrowerThan(width) {
    return $win.width() < width;
  }
}
