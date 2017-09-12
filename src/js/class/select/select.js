import Type from 'class/util/type-util';

/**
 * A select element which can watch its onChange and can get current option
 *
 * @class Select
 * @constructor
 * @param {HTMLElement} $target HTML element wrapping select element
 * @param {String} selectorPrefix A prefix name to find child elements from the inside of $target
 */

export default class Select {
  constructor($target, selectorPrefix = '.js-select') {

    this.$target = $target;
    if (!Type.isElem(this.$target)) {
      throw new Error('$target must be a HTMLElement!');
    }

    this.selectorPrefix = selectorPrefix;
    this.selectElemName = '-select';

    this.$select = this.$target.querySelector(this.selectorPrefix + this.selectElemName);
    if (this.$select === null) {
      throw new Error('Could not find a $select!');
    }
  }

  init() {
    this.lastSelectedVal = this.getCurrentVal();
    this.lastSelectedText = this.getCurrentText();
    this._watchOnChange();
  }

  _watchOnChange() {
    this.$select.addEventListener('change', () => {
      this._isChanged();
    });
  }

  _isChanged() {
    const currentVal = this.getCurrentVal();
    const currentText = this.getCurrentText();

    if (this.lastSelectedVal === currentVal && this.lastSelectedText === currentText) {
      return;
    }

    if (this.onChangeCb !== undefined && !Type.isFunction(this.onChangeCb)) {
      return;
    }

    this.onChangeCb(currentVal, currentText);
  }

  onChangeCb(currentVal, currentText) {
    this.lastSelectedVal = currentVal;
    this.lastSelectedText = currentText;
  }

  _getCurrentOption() {
    return this.$select.options[this.$select.selectedIndex];
  }

  /**
   * @method getCurrentVal
   * Return current selected option value
   *
   * @return {String}
   */
  getCurrentVal() {
    const v = this._getCurrentOption().value;
    if (v === null) {
      return '';
    }
    return v;
  }

  /**
   * @method getCurrentText
   * Return current selected option text
   *
   * @return {String}
   */
  getCurrentText() {
    return this._getCurrentOption().text;
  }
}
