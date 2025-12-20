/** @odoo-module */
import { registry } from "@web/core/registry";

import { Component } from "@odoo/owl";
import { Child } from "../child/child";

export class Example extends Component {
  static template = "my_module.Example";
  static components = { Child };

  setup() {
    this.message = "Hello!";
  }

  readMessage(event) {
    alert(this.message);
    console.log("setup");
  }
}

registry.category("view_widgets").add("example", { component: Example });
