<template>
<v-dialog max-width="600px" v-model="dialog">
  <template v-slot:activator="{on}">
    <v-btn text color="" class="primary" v-on="on" dark>
      <v-icon left>mdi-plus</v-icon>
      Add a new task
    </v-btn>
  </template>
  <v-card>
    <v-card-title>
      <h3>Add a new task</h3>
    </v-card-title>
    <v-card-text>
      <v-form class="px-3" ref="form">
        <v-text-field label="Title" v-model="title" prepend-icon="mdi-format-title" :rules="inputRules"></v-text-field>
        <v-textarea label="Information" v-model="content" prepend-icon="mdi-content-paste" :rules="inputRules"></v-textarea>
        <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="computedDateFormatted" label="Due date" hint="MM/DD/YYYY format" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
        </v-menu>
        <div class="text-center mt-4">
          <v-btn text class="success" :loading="loading" @click="submit">
            <v-icon left>mdi-plus</v-icon>
            Add task
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</v-dialog>
</template>

<script>
// import db from '../configs/firebase.js';

export default {
  data: vm => ({
    title: "",
    content: "",
    due: "",
    menu2: false,
    dialog: false,
    loading: false,
    inputRules: [
      v => v && v.length >= 3 || "Minimum is 3 characters"
    ],
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("createTask", {
          content: this.content,
          title: this.title,
          due: this.computedDateFormatted,
          status: "ongoing"
        })
        this.loading = true;
        this.dialog = false
        this.$emit("showSnackBar", "Add task successfully!")
        console.log("Added successfully");
        // const task = {
        //   content: this.content,
        //   title: this.title,
        //   due: this.computedDateFormatted,
        //   person: this.user.id,
        //   status: "ongoing"
        // }
        // db.collection('tasks').add(task)
        //   .then(() => {
        //     this.loading = false
        //     this.dialog = false
        //     this.$emit("showSnackBar", "Add task successfully!")
        //     console.log("Added successfully");
        //   })
          // .catch(err => console.log(err));
      } else {
        console.log("Not validate")
      }
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  }
}
</script>

<style>

</style>
