import Vue from "nativescript-vue";
import HomePage from "./components/HomePage.vue";
// import LoginPage from "./components/LoginPage.vue";
import LoginPage from "./components/LoginSOSPage.vue";
import VueDevtools from "nativescript-vue-devtools";

if (TNS_ENV !== "production") {
  Vue.use(VueDevtools);
}
import store from "./store";

const firebase = require("nativescript-plugin-firebase");

// firebase
//   .init({
//     // Optionally pass in properties for database, authentication and cloud messaging,
//     // see their respective docs.
//   })
//   .then(
//     () => {
//       console.log("firebase.init done");

//       // Prints Vue logs when --env.production is *NOT* set while building
//       Vue.config.silent = TNS_ENV === "production";

//     },
//     (error) => {
//       console.log(`firebase.init error: ${error}`);
//     }
//   );

new Vue({
  store,
  render: (h) => h("frame", [h(LoginPage)]),
}).$start();
