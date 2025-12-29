/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { numberBufferService } from "@point_of_sale/app/utils/number_buffer_service";

patch(numberBufferService, {
  start(env, deps) {
    console.log("start number buffer validator");
    const numberBuffer = super.start(env, deps);
    console.log("after number buffer validator");
    // // Store original method
    const originalOnKeyboardInput = numberBuffer._onKeyboardInput;

    // window.removeEventListener("keyup", this._onKeyboardInput);

    // // Override _onKeyboardInput
    numberBuffer._onKeyboardInput = function (event) {
      // Get the key
      const key = event.key;

      // Skip if not a numpad key
      // if (!this._isNumpadKey(key)) {
      //     return originalOnKeyboardInput.call(this, event);
      // }

      // Validate the key
      console.log("validation testing", key);
      if (false) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // Call original handler if validation passes
      return originalOnKeyboardInput.call(this, event);
    };
    window.addEventListener(
      "keyup",
      numberBuffer._onKeyboardInput.bind(numberBuffer)
    );
    return numberBuffer;
  },
});
