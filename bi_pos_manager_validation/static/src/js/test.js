/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { patch } from "@web/core/utils/patch";
import { useBus } from "@web/core/utils/hooks";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { useService } from "@web/core/utils/hooks";
import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";

patch(ProductScreen.prototype, {
  setup() {
    super.setup(...arguments);
    this.pos = usePos();
    this.numberBuffer = useService("number_buffer");
    this.popup = useService("popup");
    this.bus = useBus();

    // Initialize variables
    this.check_dol = true;
    this.num = false;

    // Setup keyboard listener
    this._subscribeToKeyboard();
  },

  _subscribeToKeyboard() {
    // Listen to keyboard events
    this.bus.on("pos-keyboard-input", this, this._onKeyboardInput);

    // Also setup direct keyboard listener for physical keyboard
    this._setupDirectKeyboardListener();
  },

  _setupDirectKeyboardListener() {
    const handleKeyDown = (event) => {
      // Check if we're in POS screen
      if (!this.__owl__.isMounted) return;

      const key = event.key;

      // Handle numeric keys from keyboard
      if ((key >= "0" && key <= "9") || key === "." || key === ",") {
        event.preventDefault();
        event.stopPropagation();
        this._handleNumericInput(key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    this._keyboardHandler = handleKeyDown;
  },

  _onKeyboardInput(event) {
    const key = event.detail?.key || event;
    console.log("POS keyboard event:", key);

    if (!isNaN(key) || key === "." || key === ",") {
      this._handleNumericInput(key);
    }
  },

  _handleNumericInput(key) {
    console.log("Handling numeric input:", key);

    // Don't check if we're in discount/price mode
    if (this.num === true) {
      // Send key to buffer and return
      const normalizedKey = key === "," ? "." : key;
      this.numberBuffer.sendKey(normalizedKey);
      return;
    }

    // Check current buffer value for quantity mode
    const currentValue = this.numberBuffer.get();
    console.log("Current buffer value:", currentValue);

    if (currentValue && currentValue.trim() !== "") {
      this.popup.add(ErrorPopup, {
        title: _t("More Quantity"),
        body: _t("For more quantities please select product again"),
      });
      return;
    }

    // Send key to buffer
    const normalizedKey = key === "," ? "." : key;
    this.numberBuffer.sendKey(normalizedKey);
  },

  async onNumpadClick(buttonValue) {
    let config = this.pos.config;
    let config_otp = config.one_time_valid;
    let result = true;
    let otp = this.pos.otp;
    let order = this.pos.get_order();

    // Reset num flag for new button press
    this.num = false;

    // Handle quantity mode
    if (this.pos.numpadMode == "quantity") {
      if (
        !["quantity", "discount", "price", "Backspace"].includes(buttonValue)
      ) {
        if (config.qty_detail) {
          if ((config_otp && !otp) || !config_otp) {
            result = await order.checkPswd();
          }
        }
      }
    }

    // Handle Backspace
    if (buttonValue === "Backspace") {
      if (
        (config.order_line_delete && this.check_dol) ||
        (config.qty_detail && this.check_dol)
      ) {
        if ((config_otp && !otp) || !config_otp) {
          result = await order.checkPswd();
        }
      }
    }

    // Handle quantity button
    if (buttonValue === "quantity") {
      if (config.qty_detail) {
        if ((config_otp && !otp) || !config_otp) {
          result = await order.checkPswd();
        }
      }
    }

    // Handle discount button
    if (buttonValue === "discount") {
      if (config.discount_app) {
        if ((config_otp && !otp) || !config_otp) {
          result = await order.checkPswd();
          if (!config_otp) {
            this.num = true; // Allow multiple numeric inputs for discount
          }
        }
      }
    }

    // Handle price button
    if (buttonValue === "price") {
      if (config.price_change) {
        if ((config_otp && !otp) || !config_otp) {
          result = await order.checkPswd();
          if (!config_otp) {
            this.num = true; // Allow multiple numeric inputs for price
          }
        }
      }
    }

    // Check numeric input for quantity mode only
    if (this.num === false && !isNaN(buttonValue)) {
      console.log("Numpad numeric input:", buttonValue);
      const currentValue = this.numberBuffer.get();
      console.log("Current buffer from numpad:", currentValue);

      if (currentValue && currentValue.trim() !== "") {
        this.popup.add(ErrorPopup, {
          title: _t("More Quantity"),
          body: _t("For more quantities please select product again"),
        });
        return;
      }
    }

    // Call original method if result is true
    if (result) {
      super.onNumpadClick(buttonValue);
    }
  },

  willUnmount() {
    // Clean up event listeners
    if (this.bus) {
      this.bus.off("pos-keyboard-input", this);
    }
    if (this._keyboardHandler) {
      document.removeEventListener("keydown", this._keyboardHandler);
    }
  },
});
