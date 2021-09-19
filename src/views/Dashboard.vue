<template>
<div class="dashboard">
  <v-subheader class="subheading grey--text">Dashboard</v-subheader>

  <v-container class="my-5">

    <v-row class="mb-3">

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small depressed v-bind="attrs" v-on="on" class="grey--text mr-1" @click="sortBy('title')">
            <v-icon left small>mdi-sort-alphabetical-ascending</v-icon>
            <span class="caption text-lowercase">By project name</span>
          </v-btn>
        </template>
        <span>Sort projects by project name</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small depressed v-bind="attrs" v-on="on" class="grey--text mr-1" @click="sortBy('person')">
            <v-icon left small>mdi-account</v-icon>
            <span class="caption text-lowercase">By project person</span>
          </v-btn>
        </template>
        <span>Sort projects by project person</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small depressed v-bind="attrs" v-on="on" class="grey--text mr-1" @click="sortBy('due')">
            <v-icon left small>mdi-calendar-range</v-icon>
            <span class="caption text-lowercase">By project due date</span>
          </v-btn>
        </template>
        <span>Sort projects by due date</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small depressed v-bind="attrs" v-on="on" class="grey--text mr-1" @click="sortBy('status')">
            <v-icon left small>mdi-list-status</v-icon>
            <span class="caption text-lowercase">By project status</span>
          </v-btn>
        </template>
        <span>Sort projects by project status</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small depressed v-bind="attrs" v-on="on" class="grey--text mr-1" @click="sortBy('id')">
            <v-icon left small>mdi-cancel</v-icon>
            <span class="caption text-lowercase">Clear sort</span>
          </v-btn>
        </template>
        <span>Clear sorting filter</span>
      </v-tooltip>
    </v-row>

    <div class="mb-4">
      <v-form>
        <v-text-field label="Search tasks" hide-details="auto" v-model="search" @change="searchTasks">
        </v-text-field>
      </v-form>
    </div>

    <v-card flat class="pa-3" v-for="task in tasks" :key="task.title">
      <v-row :class="`project ${task.status}`">
        <v-col cols="12" md="6">
          <div class="caption grey--text">Project Title</div>
          <div>{{ task.title }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="caption grey--text">Person</div>
          <template v-for="(info, index) in task.person">
            <div v-if="index === 'fullName'" :key="index">{{ info }}</div>
          </template>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="caption grey--text">Due Date</div>
          <div>{{ task.due }}</div>
        </v-col>
        <v-col xs="2" sm="4" md="2" class="align-self-center">
          <div class="align-self-center text-right">
            <v-chip small :class="`${task.status} white--text caption my-2`">{{ task.status }}</v-chip>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-divider></v-divider>
      </v-row>
    </v-card>

  </v-container>

</div>
</template>

<script>
// import db from "@/configs/firebase"
import { mapGetters } from 'vuex'
// import { mapActions } from 'vuex'

export default {
  data() {
    return {
      projects: [],
      search: ""
    }
  },
  computed: {
    ...mapGetters(['tasks', 'user'])
  },
  watch: {

  },
  methods: {
    sortBy(type) {
      this.tasks.sort((a, b) => a[type] < b[type] ? -1 : 1)
    },
    searchTasks() {
      console.log(this.search)
      this.tasks.filter(project => {
        return project.title.match(this.search)
      })
    }
  },
  mounted() {
    // [...mapActions(['getTasks'])]
    this.$store.dispatch("getCurrentUser")
    this.$store.dispatch("getTasks", { role: this.user.role })
    console.table("role", this.tasks)
  },
  // async created() {
    // const tasks = db.collection('tasks');
    // const snapshot = await tasks.get();
    // snapshot.forEach(doc => {
    //   this.projects.push({
    //     id: doc.id,
    //     ...doc.data()
    //   })
    //   console.log(doc.id, '=>', doc.data());
    // });

    // console.log(this.projects)

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
  // }
}
</script>

<style>
.v-card {
  word-break: normal;
}

.project.complete {
  border-left: 4px solid #3cd1c2;
}

.project.ongoing {
  border-left: 4px solid orange;
}

.project.overdue {
  border-left: 4px solid tomato;
}

.v-chip.v-chip--no-color.theme--light.complete {
  background: #3cd1c2;
}

.v-chip.v-chip--no-color.theme--light.ongoing {
  background: orange;
}

.v-chip.v-chip--no-color.theme--light.overdue {
  background: tomato;
}
</style>
