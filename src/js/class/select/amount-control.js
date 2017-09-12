import Select from 'class/select/select';
import Elem from 'class/util/element-util';
import Type from 'class/util/type-util';

/**
 * A button which increases/decreases amount synced with select element
 *
 * @class AmountControl
 * @constructor
 * @extends Select
 */

export default class AmountControl extends Select {
  constructor($target, selectorPrefix) {
    super($target, selectorPrefix);

    this.activeClass = 'is-active';

    // minimum value and maximum value of
    this.dataKey = {
      min: 'min',
      max: 'max'
    };

    this.defaultMin = 1;
    this.defaultMax = 9;

    this.$countUpBtns = this.$target.querySelectorAll(`${this.selectorPrefix}-up`);
    this.$countDownBtns = this.$target.querySelectorAll(`${this.selectorPrefix}-down`);
  }

  init() {
    [this.min, this.max] = this._getMinMax();
    super.init();

    if (this.lastSelectedVal === -1) {
      throw new Error('No options!');
    }

    this._updateBtnsState(this.lastSelectedVal);
    this._watchCountUp();
    this._watchCountDown();
  }

  onChangeCb(currentVal, currentText) {
    super.onChangeCb(currentVal, currentText);
    this._updateBtnsState(currentVal);
  }

  countUp() {
    const nextVal = this.lastSelectedVal + 1;

    if (this._isHigherThanMax(nextVal)) {
      return false;
    }

    this.select(nextVal);
    return true;
  }

  countDown() {
    const nextVal = this.lastSelectedVal - 1;

    if (this._isLowerThanMin(nextVal)) {
      return false;
    }

    this.select(nextVal);
    return true;
  }

  select(nextVal) {
    const $nextOption = this.$select.querySelector(`option[value="${nextVal}"]`);

    if ($nextOption === null) {
      throw new Error(`$nextOption is not found! (nextVal: ${nextVal})`);
    }

    $nextOption.selected = true;
    this.lastSelectedVal = nextVal;
    this._updateBtnsState(this.lastSelectedVal);
  }

  getCurrentVal() {
    return parseInt(super.getCurrentVal(), 10);
  }

  _watchCountUp() {
    Elem.addClickForEach(this.$countUpBtns, () => {
      this.countUp();
    });
  }

  _watchCountDown() {
    Elem.addClickForEach(this.$countDownBtns, () => {
      this.countDown();
    });
  }

  _updateBtnsState(val) {
    this._updateBtns(this._isLowerThanMin(val, true),  this.$countDownBtns);
    this._updateBtns(this._isHigherThanMax(val, true), this.$countUpBtns);
  }

  _updateBtns(result, $targets) {

    if (result) {
      this._disableBtns($targets);
      return;
    }

    this._enableBtns($targets);
  }

  _enableBtns($targets) {
    Elem.addClassForEach($targets, this.activeClass);
  }

  _disableBtns($targets) {
    Elem.removeClassForEach($targets, this.activeClass);
  }

  _isLowerThanMin(val, includeEqual = false) {
    return this._isVal1LowerThanVal2(val, this.min, includeEqual);
  }

  _isHigherThanMax(val, includeEqual = false) {
    return this._isVal1LowerThanVal2(this.max, val, includeEqual);
  }

  _isVal1LowerThanVal2(val1, val2, includeEqual = false) {
    if (!Type.isValidNum(val1) || !Type.isValidNum(val2)) {
      throw new Error(`The values are not valid! (val1:${val1}, val2:${val2})`);
    }

    if (includeEqual) {
      return val1 <= val2;
    }

    return val1 < val2;
  }

  _getMinMax() {
    const min = (() => {

      const mn = this.$target.dataset[this.dataKey.min];
      if (mn === null) {
        return this.defaultMin;
      }
      return mn;

    })();

    const max = (() => {

      const mx = this.$target.dataset[this.dataKey.max];
      if (mx === null) {
        return this.defaultMax;
      }
      return mx;

    })();

    return [parseInt(min, 10), parseInt(max, 10)];
  }
}
