import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/compat/app";
// import db from "./configs/firebase";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyA16EJYhNCHLsUOs6L7qGOCveE9tprR1bU",
  authDomain: "task-management-test.firebaseapp.com",
  projectId: "task-management-test",
  storageBucket: "task-management-test.appspot.com",
  messagingSenderId: "967212194840",
  appId: "1:967212194840:web:7903d404ab7f86bb00376d",
  measurementId: "G-S2MVSHK89T",
};
firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged((user) => {
  // console.log("Auth user", { user });
  // if (user) {
  //   let userInfo = {
  //     id: user.uid,
  //     email: user.email,
  //   };
  //   db.collection("users")
  //     .doc(user.uid)
  //     .get()
  //     .then((user) => {
  //       userInfo = {
  //         ...userInfo,
  //         ...user.data(),
  //       };
  //       console.log("user info", userInfo);
  //       store.commit("updateUser", userInfo);
  //     });
  // } else {
  //   router.replace("/login");
  // }
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

// new Vue({
//   router,
//   store,
//   vuetify,
//   render: (h) => h(App),
// }).$mount("#app");
