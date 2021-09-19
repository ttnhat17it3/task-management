import db from "../configs/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";

const actions = {
  async getTasks(context, payload) {
    let tasksRef = db.collection("tasks");
    console.log("role", payload.role);
    let snapshot;
    if (payload.role === 1) {
      snapshot = await tasksRef.get();
    }
    if (payload.role === 0) {
      snapshot = await tasksRef
        .where("person", "==", context.getters.user.id)
        .collection("users")
        .get();
    }
    const tasks = [];
    snapshot.forEach(async (doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log("show tasks: ", tasks);
    context.commit("setTasks", tasks);
  },

  async createTask(context, payload) {
    db.collection("tasks")
      .add({
        ...payload,
        person: context.getters.user,
      })
      .then(() => {
        console.log("Add task: ", {
          ...payload,
          person: context.getters.user,
        });
      })
      .catch((err) => console.log(err));
  },

  async getCurrentUser(context) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          const profile = {
            id: user.uid,
            email: user.email,
            ...doc.data(),
          };
          context.commit("updateUser", profile);
        });
      console.log("user ne: ", user.uid, user.email);
    } else {
      console.log("khong co");
    }
    console.log(context);
  },

  async updateProfile(context, payload) {
    console.log("update profile", payload);
    await db
      .collection("users")
      .doc(payload.id)
      .update({
        fullName: payload.profile.fullName,
        address: payload.profile.address,
        gender: payload.profile.gender,
        birthday: payload.profile.birthday,
        position: payload.profile.position,
        phoneNumber: payload.profile.phoneNumber,
      });
    context.commit("updateProfile", payload.profile);
  },

  async login(context, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((data) => {
        console.log("ID", data.user.uid);
        db.collection("users")
          .doc(data.user.uid)
          .get()
          .then((user) => {
            const profile = {
              id: user.id,
              email: user.email,
              ...user.data(),
            };
            console.log("user role", user.data().role);
            context.commit("updateUser", profile);
            context.commit("setTasks", user.data().role);
          });
        this.$router.push({ name: "Dashboard" });
        // this.error = false;
        // this.errorMsg = "";
        // console.log(firebase.auth().currentUser.uid);
      })
      .catch((err) => {
        console.log(err);
        // this.error = true;
        // this.errorMsg = err.message;
      });
  },
  async getUsers(context) {
    const users = [];
    const snapshot = await db.collection("users").get();
    snapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    context.commit("getUsers", users);
  },
};
export default actions;
