/**
 * Manage a class name to hook one-shot functionality which is only needed for one session.
 * This class must be used at head element.
 *
 * @class OneShotHooker
 * @constructor
 */

export default class OneShotHooker {
  constructor() {
    this.$tgt = document.documentElement;
    this.storageKey = 'onceVisited';
    this.activeClass = 'is-first-time';
    this.notActiveClass = 'is-not-first-time';
  }

  init() {
    if (this._isOnceVisited()) {
      this._addNotActiveClass();
      return;
    }

    this._recordVisit();
    this._addActiveClass();
  }

  _recordVisit() {
    window.sessionStorage.setItem(this.storageKey, true);
  }

  _isOnceVisited() {
    // return false; // comment out for testing
    const storageItem = window.sessionStorage.getItem(this.storageKey);
    return (storageItem === true || storageItem === 'true');
  }

  _addActiveClass() {
    this.$tgt.classList.remove(this.notActiveClass);
    this.$tgt.classList.add(this.activeClass);
  }

  _addNotActiveClass() {
    this.$tgt.classList.remove(this.activeClass);
    this.$tgt.classList.add(this.notActiveClass);
  }
}
