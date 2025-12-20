/** @odoo-module */

import { Navbar } from "@point_of_sale/app/navbar/navbar";
import { patch } from "@web/core/utils/patch";
let check_close = true;
patch(Navbar.prototype, {
   async closeSession() {
		let self = this;
		let config = this.pos.config;
		let config_otp = config.one_time_valid;
		let result = true;
		let otp =this.pos.otp;
		let order = this.pos.get_order();

		if(config.close_pos && check_close){
			if(config_otp && !otp){
				result = await order.checkPswd();
			}
			if(!config_otp){
				result = await order.checkPswd();
			}
		}

		if(result){
			check_close = false;
			super.closeSession();
		}
    }
});