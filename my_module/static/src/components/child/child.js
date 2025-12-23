/** @odoo-module */
import {
  Component,
  onWillStart,
  onWillDestroy,
  useState,
  useRef,
} from "@odoo/owl";

export class Child extends Component {
  static template = "my_module.Child";
  static props = {
    title: { type: String },
    list: { type: Array },
    slots: { type: Object },
    counter: { type: Number },
  };
  setup() {
    // this.state = useState({ counter: 0 });
    this.myInputRef = useRef("my-input");
    onWillStart(() => console.log("Child Hook."));
    // onWillDestroy(() => alert("Destroyed."));
  }

  focusMyInput() {
    this.myInputRef.el.focus();
  }
}
