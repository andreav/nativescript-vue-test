import Vue from "nativescript-vue";
import App from "./components/App";
import VueDevtools from "nativescript-vue-devtools";

if (TNS_ENV !== "production") {
  Vue.use(VueDevtools);
}
import store from "./store";

const firebase = require("nativescript-plugin-firebase");

firebase
  .init({
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
  })
  .then(
    () => {
      console.log("firebase.init done");

      // Prints Vue logs when --env.production is *NOT* set while building
      Vue.config.silent = TNS_ENV === "production";

      new Vue({
        store,
        render: (h) => h("frame", [h(App)]),
      }).$start();
    },
    (error) => {
      console.log(`firebase.init error: ${error}`);
    }
  );
