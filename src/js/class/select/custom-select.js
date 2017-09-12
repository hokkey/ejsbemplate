import Select from 'class/select/select';

/**
 * A custom-styled dummy select element covering hidden select element
 *
 * @class CustomSelect
 * @extend Select
 * @constructor
 * @param {HTMLElement} $target
 * @param {String} selectorPrefix
 */

export default class CustomSelect extends Select {
  constructor($target, selectorPrefix) {
    super($target, selectorPrefix);

    this.labelElemName = '-label';
    this.$labelElem = this.$customSelect.querySelector(this.selectorPrefix + this.labelElemName);

    if (this.$labelElem === null) {
      throw new Error('Could not find a $labelElem!');
    }
  }

  init() {
    super.init();
    this._updateLabel(this.lastSelectedText);
  }

  _updateLabel(text) {
    this.$labelElem.textContent = text;
  }

  onChangeCb(currentVal, currentText) {
    try {
      this._updateLabel(currentText);
      location.href = currentVal;
    }

    catch (e) {
      throw e;
    }
  }
}
