import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3History from "vue3-history";
import "./assets/main.css";

const app = createApp(App);

console.log(Vue3History);
app.use(router).use(Vue3History, {
  router,
  debug: true,
  onRouteChange: (v: any) => {
    console.log("onRouteChange", v);
  },
  onQuit() {
    console.log("quit");
  },
});

app.mount("#app");
