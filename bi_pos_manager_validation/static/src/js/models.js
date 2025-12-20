/** @odoo-module */

import { PosStore } from "@point_of_sale/app/store/pos_store";
import { Order } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";
import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";
import { NumberPopup } from "@point_of_sale/app/utils/input_popups/number_popup";
import { _t } from "@web/core/l10n/translation";

import { jsonrpc } from "@web/core/network/rpc_service";

let check_pay = true;

patch(PosStore.prototype, {
    // @Override
    async _processData(loadedData) {
        await super._processData(...arguments);
        this.users = loadedData['users'];
    },
   
});

patch(Order.prototype, {
    setup() {
        super.setup(...arguments);
        this.pos.otp = false
    },

    async pay() {
    	let config = this.pos.config;
		let config_otp = config.one_time_valid;
		let result = true;
		let otp =this.pos.otp;
		let order = this.pos.get_order();

		if(config.payment_perm && check_pay){
			if(config_otp && !otp){
				result = await order.checkPswd();
			}
			if(!config_otp){
				result = await order.checkPswd();
			}
		}
		if(result){
			super.pay();
		}
    },

    async checkPswd() {
        let self = this;
        let res = false;
        const { confirmed, payload } = await self.env.services.popup.add(NumberPopup, {
            title: _t('Manager Password'),
            isPassword: true,
        });

        if (confirmed) {
            debugger;
            await jsonrpc('/web/dataset/call_kw/pos.order', {
                model: 'pos.order',
                method: 'get_user_pin',
                args: [1],
                kwargs: {},
            }).then(function (output) {
                if (output == payload) {
                    res = true;
                    self.pos.otp = true;
                } else {
                    self.env.services.popup.add(ErrorPopup, {
                        title: _t('Invalid Password'),
                        body: _t('Wrong Password'),
                    });
                    return false;
                }
            });
        }
        return res;
    }
});