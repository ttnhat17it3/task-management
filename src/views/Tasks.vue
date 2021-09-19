<template>
<div class="tasks">
  <v-subheader class="subheading grey--text">Tasks</v-subheader>
  <v-container class="my-5">
    <v-expansion-panels>
      <!-- <v-expansion-panel v-for="project in projects" :key="project.title">
          <v-expansion-panel-header>{{ project.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text class="px-4 py-0 grey--text">
                <div class="font-weight-bold">due by {{ project.due }}</div>
                <div>{{ project.content }}</div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>         -->
        <v-expansion-panel v-for="task in tasks" :key="task.id">
          
          <v-expansion-panel-header disable-icon-rotate>
            <h4>{{ task.title }}</h4>
            <template v-slot:actions>
              <v-icon color="error" v-if="task.status === 'overdue'">
                mdi-alert-circle
              </v-icon>
              <v-icon color="teal" v-else-if="task.status === 'complete'">
                mdi-check
              </v-icon>
              <v-icon color="primary" v-if="task.status === 'ongoing'">
                mdi-progress-clock
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="grey--text">
            {{ typeof task.content }}
          </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</div>
</template>

<script>
// import db from "@/configs/firebase.js"
// import 'firebase/compat/auth'
// import firebase from 'firebase/compat/app'
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      projects: [],
      profile: {},
    }
  },
  computed: {
    ...mapGetters(['tasks', 'user'])
  },
  async mounted() {
    console.log("tasks: ", this.tasks)
    this.$store.dispatch("getTasks", { role: this.user.role })
    // const user = firebase.auth().currentUser
    // const database = await db.collection('users').doc(user.uid).get()
    // this.profile = {
    //   id: database.id,
    //   email: database.email,
    //   address: database.data().address,
    //   avatar: database.data().avatar,
    //   fullName: database.data().fullName,
    //   gender: database.data().gender,
    //   position: database.data().position,
    //   phoneNumber: database.data().phoneNumber,
    //   birthday: database.data().birthday,
    //   role: database.data().role,
    //   team: database.data().team,
    // }
    // console.log(this.profile)

    // db.collection('tasks').onSnapshot(res => {
    //   const changes = res.docChanges()

    //   changes.forEach(change => {
    //     if (change.type === "added" || change.type === "updated") {
    //       this.projects.push({
    //         ...change.doc.data(),
    //         id: change.doc.id
    //       })
    //     }
    //   })
    // })
  }
}
</script>

<style>

</style>
