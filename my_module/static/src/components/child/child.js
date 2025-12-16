/** @odoo-module */

import { Component } from "@odoo/owl";

export class Child extends Component {
  static template = "my_module.Child";
  static props = {
    title: { type: String },
  };
}
