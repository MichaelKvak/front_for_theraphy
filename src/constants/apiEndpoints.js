export default {
  pills: {
    readList: `${process.env.VUE_APP_API_URL}/pills`,
    create: `${process.env.VUE_APP_API_URL}/pills/add`,
    update: `${process.env.VUE_APP_API_URL}/pills/update`,
    delete: `${process.env.VUE_APP_API_URL}/pills`,
    getPillById: (pillId) => `${process.env.VUE_APP_API_URL}/pills/${pillId}`,
  },
  user: {
    signup: `${process.env.VUE_APP_API_URL}/users/signup`,
    login: `${process.env.VUE_APP_API_URL}/users/login`,
  },
};
