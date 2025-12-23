/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { patch } from "@web/core/utils/patch";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { useService } from "@web/core/utils/hooks";
import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";
let check_dol = true;
let num = false;
patch(ProductScreen.prototype, {
  setup() {
    super.setup(...arguments);
    this.pos = usePos();
    this.numberBuffer = useService("number_buffer");
    this.popup = useService("popup");
  },

  async onNumpadClick(buttonValue) {
    let config = this.pos.config;
    let config_otp = config.one_time_valid;
    let result = true;
    let otp = this.pos.otp;
    let order = this.pos.get_order();
    if (this.pos.numpadMode == "quantity") {
      if (
        !["quantity", "discount", "price", "Backspace"].includes(buttonValue)
      ) {
        if (config.qty_detail) {
          if (config_otp && !otp) {
            result = await order.checkPswd();
          }
          if (!config_otp) {
            result = await order.checkPswd();
          }
        }
      }
    }

    if (buttonValue === "Backspace") {
      if (config.order_line_delete && check_dol) {
        if (config_otp && !otp) {
          result = await order.checkPswd();
        }
        if (!config_otp) {
          result = await order.checkPswd();
        }
      } else if (config.qty_detail && check_dol) {
        if (config_otp && !otp) {
          result = await order.checkPswd();
        }
        if (!config_otp) {
          result = await order.checkPswd();
        }
      }
    }
    if (buttonValue === "quantity") {
      num = false;
      if (config.qty_detail) {
        if (config_otp && !otp) {
          result = await order.checkPswd();
        }
        if (!config_otp) {
          result = await order.checkPswd();
        }
      }
    }

    if (buttonValue === "discount") {
      if (config.discount_app) {
        if (config_otp && !otp) {
          result = await order.checkPswd();
          // num = true;
        }
        if (!config_otp) {
          result = await order.checkPswd();
          num = true;
        }
      }
    }

    if (buttonValue === "price") {
      if (config.price_change) {
        if (config_otp && !otp) {
          result = await order.checkPswd();
          // num = true;
        }
        if (!config_otp) {
          result = await order.checkPswd();
          num = true;
        }
      }
    }

    if (num == false) {
      if (!isNaN(buttonValue)) {
        console.log("this is number", buttonValue);
        const currentValue = this.numberBuffer.get();
        console.log("currentValue", currentValue);
        if (currentValue) {
          this.popup.add(ErrorPopup, {
            title: _t("More Quantuty"),
            body: _t("For more quantities plz select product again"),
          });
          return;
        }
      }
    }

    if (result) {
      super.onNumpadClick(buttonValue);
    }
  },
});
