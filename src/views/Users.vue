<template>
<div class="dashboard">
  <v-subheader class="subheading grey--text">Dashboard</v-subheader>

  <v-container class="my-5">

    <v-row class="mb-3">

    </v-row>
    <v-dialog max-width="600px" v-model="dialog" class="">
      <template v-slot:activator="{on}" class="">
        <v-btn text color="" class="primary mb-3" v-on="on" dark>
          <v-icon left>mdi-plus</v-icon>
          Add a new user
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h3>Add a new user</h3>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field label="Full name" v-model="title" prepend-icon="mdi-format-title"></v-text-field>
            <v-text-field label="Gender" v-model="content" prepend-icon="mdi-content-paste"></v-text-field>
            <v-text-field label="Position" v-model="content" prepend-icon="mdi-content-paste"></v-text-field>
            <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="computedDateFormatted" label="Birthday" hint="MM/DD/YYYY format" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
            </v-menu>
            <div class="text-center mt-4">
              <v-btn text class="success" :loading="loading" @click="submit">
                <v-icon left>mdi-plus</v-icon>
                Add user
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card flat class="pa-3" v-for="user in users" :key="user.id" router="">
      <v-row :class="`project `">

        <v-col cols="12" md="6">
          <div class="caption grey--text">ID</div>
          <router-link :to="{
            name: 'user',
            params: {
              id: user.id
            }
          }">
            <div>{{ user.id }}</div>
          </router-link>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="caption grey--text">Full name</div>
          <template>
            <div>{{ user.fullName }}</div>
          </template>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="caption grey--text">Gender</div>
          <div>{{ user.gender }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="caption grey--text">Birthday</div>
          <div>{{ user.birthday }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="caption grey--text">Position</div>
          <div>{{ user.position }}</div>
        </v-col>

      </v-row>
      <v-row>
        <v-divider></v-divider>
      </v-row>
    </v-card>

    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="users" :search="search"></v-data-table>
    </v-card>

  </v-container>

</div>
</template>

<script>
export default {
  data: (vm) => {
    return {
      menu2: false,
      dialog: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      // search: '',
      headers: [{
          text: 'ID',
          align: 'start',
          filterable: false,
          value: 'name',
        },
        {
          text: 'Full Name',
          value: 'calories'
        },
        {
          text: 'Gender',
          value: 'fat'
        },
        {
          text: 'Birthday',
          value: 'carbs'
        },
        {
          text: 'Posision',
          value: 'protein'
        },
      ],
    }
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  mounted() {
    this.$store.dispatch("getUsers")
    console.log("Users list: ", this.users)
  }
}
</script>

<style>

</style>
