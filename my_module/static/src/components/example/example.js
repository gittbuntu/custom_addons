/** @odoo-module */
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, useState, useSubEnv } from "@odoo/owl";
import { Child } from "../child/child";

export class Example extends Component {
  static template = "my_module.Example";
  static components = { Child };

  setup() {
    // this.myService = useService("my_service");\
    this.orm = useService("orm");
    // debugger;
    useSubEnv({ data: "Info" });
    this.message = "Hello!";
    this.state = useState({ counter: 0 });
  }
  increment(event) {
    this.state.counter++;
    this.orm.call("crm.lead", "create", [{ name: "new" }]);
  }

  readMessage(event) {
    alert(this.message);
    console.log("setup");
  }
}

registry.category("view_widgets").add("example", { component: Example });
