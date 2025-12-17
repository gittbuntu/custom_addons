/** @odoo-module */
import { registry } from "@web/core/registry";

import { Component } from "@odoo/owl";

export class Counter extends Component {
  static template = "my_module.Counter";

  setup() {
    this.something = "Hello";
  }
}

registry.category("view_widgets").add("counter", { component: Counter });
