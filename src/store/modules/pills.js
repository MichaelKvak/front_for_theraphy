import axios from "axios";
import apiEndpoints from "@/constants/apiEndpoints.js";

export default {
  namespaced: true,
  state: {
    pillsList: [],
    editedObj: null,

    loading: false, //Індикатор загрузки
    error: null, //Індикатор помилки
  },
  getters: {
    getPillsList: (state) => state.pillsList,
    getEditedObj: (state) => state.editedObj,

    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
  mutations: {
    setPillList(state, list) {
      state.pillsList = list;
    },
    setEditedObj(state, obj) {
      state.editedObj = obj;
    },
    deletePill(state, pillId) {
      state.pillsList = state.pillsList.filter((item) => item._id !== pillId);
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    loadPills({ commit }, filterParams) {
      commit("setLoading", true); //Встановлюємо індикатор загрузки (розпочинається завантаження даних)
      commit("setError", null); //Поки помилки ще немає
      let paramsObj = null;
      if (filterParams) {
        paramsObj = {
          params: filterParams,
        };
      }

      axios
        .get(apiEndpoints.pills.readList, paramsObj)
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("setPillList", resData.data);
          else throw new Error("Fetch faild!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },
    createPill({ commit }, { pillTitle, pillDescription, pillDate, pillTags }) {
      commit("setLoading", true); //Встановлюємо індикатор загрузки (розпочинається завантаження даних)
      commit("setError", null); //Поки помилки ще немає
      return new Promise((resolve, reject) => {
        axios
          .post(apiEndpoints.tasks.create, {
            pillTitle,
            pillDescription,
            pillDate,
            pillTags,
          })
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw resData.err;
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },
    updatePill(
      { commit, state },
      { pillTitle, pillDescription, pillDate, pillTags }
    ) {
      commit("setLoading", true); //Встановлюємо індикатор загрузки (розпочинається завантаження даних)
      commit("setError", null); //Поки помилки ще немає
      return new Promise((resolve, reject) => {
        axios
          .put(apiEndpoints.tasks.update, {
            pillId: state.editedObj._id,
            pillTitle,
            pillDescription,
            pillDate,
            pillTags,
          })
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fetch faild!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },
    deletePills({ commit }, pillId) {
      commit("setLoading", true); //Встановлюємо індикатор загрузки (розпочинається завантаження даних)
      commit("setError", null); //Поки помилки ще немає
      axios
        .delete(apiEndpoints.tasks.delete, {
          data: {
            pillId,
          },
        })
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("deletePill", pillId);
          else throw new Error("Fetch faild!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },
    getPillById({ commit }, pillId) {
      commit("setLoading", true); //Встановлюємо індикатор загрузки (розпочинається завантаження даних)
      commit("setError", null); //Поки помилки ще немає
      return new Promise((resolve, reject) => {
        axios
          .get(apiEndpoints.pills.getPillById(pillId))
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) {
              commit("setEditedObj", resData.data);
              resolve(resData.data);
            } else throw new Error("Fetch faild!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },
  },
};
