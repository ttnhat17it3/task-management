import Vue from "vue";
import Vuex from "vuex";
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import db from "../configs/firebase";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
