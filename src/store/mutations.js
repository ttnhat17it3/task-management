const mutations = {
  updateUser(state, user) {
    console.log(user);
    state.user = user;
  },
  setTasks(state, tasks) {
    state.tasks = tasks;
  },
  updateProfile(state, profile) {
    for (let item in profile) {
      state[item] = profile[item];
    }
  },
  getUsers(state, users) {
    state.users = users;
  },
};

export default mutations;
