import Vue from "vue";
import Vuex from "vuex";

import pills from "./modules/pills";
import auth from "./modules/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    pills,
    auth,
  },
});

export default store;
