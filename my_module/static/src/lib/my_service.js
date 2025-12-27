/** @odoo-module */

import { registry } from "@web/core/registry";

// registry.category("services").add("my_service", {
//   dependencies: ["notification"],
//   start(env, { notification }) {
//     setInterval(() => {
//       notification.add("Hello!.");
//     }, 5000);
//     return "Helllo!.";
//   },
// });
// its simply an object also define like this

const my_object = {
  dependencies: ["notification"],
  start(env, { notification }) {
    // setInterval(() => {
    //   notification.add("Hello!.");
    // }, 5000);
    return "Helllo!.";
  },
};
registry.category("services").add("my_service", my_object);
