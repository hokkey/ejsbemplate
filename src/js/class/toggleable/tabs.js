import Type from 'class/util/type-util';
import Elem from 'class/util/element-util';
import ToggleableBtn from 'class/toggleable/toggleable-btn';

/**
 * A exclusive tab navigation
 *
 * @class Tabs
 * @extends ToggleableBtn
 * @constructor
 */

export default class Tabs extends ToggleableBtn {
  constructor($btns, Toggleable) {
    super($btns, Toggleable);
    this.stateClass = 'is-active';
  }

  _onClick($elem) {
    this._switchTabFrom($elem);
    if (Type.isFunction(this.onToggleCb)) this.onToggleCb();
  }

  _removeAllActiveClasses() {
    Object.keys(this.toggleables).forEach((key) => {
      const $tgt = this.toggleables[key];
      $tgt.remove();
    });

    Elem.eachNode(this.$btns, ($btn) => {
      $btn.classList.remove(this.stateClass);
    });
  }

  _switchTabFrom($btn) {
    const selector = this._getSelectorFrom($btn);
    const tgt = this.toggleables[selector];

    if (typeof tgt === 'undefined') {
      throw new Error('An instance of Toggleable was not created!');
    }

    if (!tgt instanceof this.Toggleable) {
      throw new Error('A target instance is not expected type!');
    }

    // Disable all tabs before showing others
    this._removeAllActiveClasses();

    tgt.add();
    $btn.classList.add(this.stateClass);
  }
}
