/** @odoo-module */
import { registry } from "@web/core/registry";

import { Component } from "@odoo/owl";
import { Child } from "../child/child";

export class Example extends Component {
  static template = "my_module.Example";
  static components = { Child };
}

registry.category("view_widgets").add("example", { component: Example });
