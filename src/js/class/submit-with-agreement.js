import Type from 'class/util/type-util';

/**
 * A submit button which will be enabled on checking a linked check-button
 *
 * @class SubmitWithAgreement
 * @constructor
 */

export default class SubmitWithAgreement {
  constructor($elem, prefix = 'js-submit-with-agreement') {
    if (!Type.isElem($elem)) {
      throw new Error('$elem must be a HTMLElement!');
    }

    if (!Type.isString(prefix)) {
      throw new Error('prefix must be a string!');
    }

    this.$target = $elem;
    this.prefix = prefix;

    this.check = `.${this.prefix}-check`;
    this.submit = `.${this.prefix}-submit`;

    this.$check = this.$target.querySelector(this.check);
    this.$submit = this.$target.querySelector(this.submit);

    if (this.$check === null || this.$submit === null) {
      throw new Error(`Required elements are not found!: ${this.check} or ${this.submit}`);
    }

    if (this.$check.type !== 'checkbox') {
      throw new Error(`this.$check must be a checkbox input!: ${this.$check.type}`);
    }
  }

  init() {
    this.$check.addEventListener('change', this._onChange.bind(this));
  }

  _onChange() {
    this.detect();
  }

  detect() {
    if (this.$check.checked) {
      // on checked
      this.enable();
      return;
    }

    // on not checked
    this.disable();
  }

  enable() {
    this.$submit.disabled = false;
  }

  disable() {
    this.$submit.disabled = true;
  }
}
