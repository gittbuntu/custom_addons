/** @odoo-module */

import { TicketScreen } from "@point_of_sale/app/screens/ticket_screen/ticket_screen";
import { patch } from "@web/core/utils/patch";

patch(TicketScreen.prototype, {
    async onDeleteOrder(order) {
		let config = this.pos.config;
		let config_otp = config.one_time_valid;
		let result = true;
		let otp =this.pos.otp;
		let odr = this.pos.get_order();

		if(config.order_delete && check_do){
			if(config_otp && !otp){
				result = await odr.checkPswd();
			}
			if(!config_otp){
				result = await odr.checkPswd();
			}
		}

		if(result){
			super.onDeleteOrder(order);
		}
	}
});

