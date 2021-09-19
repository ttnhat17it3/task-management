<template>
<nav>

  <v-snackbar v-model="snackbar" top color="success">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false" timeout="3000">
        Close
      </v-btn>
    </template>
  </v-snackbar>

  <v-app-bar flat app>
    <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-uppercase grey--text">
      <span class="font-weight-light">tasks </span>
      <span>Management</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <div class="text-center">
      <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" class="">
            <v-avatar size="40" class="mr-2">
              <img :src="profile.avatar">
            </v-avatar>
            <span>{{ profile.fullName }}</span>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ profile.fullName }}</v-list-item-title>
                <v-list-item-subtitle>{{ profile.position }}</v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>

            <v-list-item v-for="item in menu" :key="item.text" router :to="item.route" class="">
              <v-list-item-icon>
                <v-icon class="">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="signOut">
              <v-list-item-icon>
                <v-icon class="">mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sign out</v-list-item-title>
            </v-list-item>

          </v-list>
        </v-card>
      </v-menu>
    </div>

  </v-app-bar>

  <v-navigation-drawer text-center items-center app v-model="drawer" class="blue-grey darken-4 white--text pt-4">

    <v-row class="mt-4 text-center">
      <v-col>
        <v-avatar size="100">
          <img :src="profile.avatar">
        </v-avatar>
        <div><span class="white--text subtitle-1 mt-1">{{ profile.fullName }}</span></div>
      </v-col>

      <v-col class="mb-12">
        <Popup @showSnackBar="showSnackBar"></Popup>
      </v-col>
    </v-row>

    <v-list nav dense class="white--text">
      <!-- <p class="text-center">Tasks Management</p> -->

      <v-list-item-group v-model="group" active-class="active">
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route" class="grey--text">
          <v-list-item-icon>
            <v-icon class="grey--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="grey--text" @click="signOut">
          <v-list-item-icon>
            <v-icon class="grey--text">mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

</nav>
</template>

<script>
import Popup from './Popup.vue';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import db from '../configs/firebase'
import { mapGetters } from 'vuex';

export default {
  components: {
    Popup
  },
  data() {
    return {
      drawer: false,
      group: null,
      snackbar: false,
      profile: {},
      message: "",
      links: [{
          icon: 'mdi-view-dashboard',
          text: 'Dashboard',
          route: '/'
        },
        {
          icon: 'mdi-file-tree',
          text: 'Tasks',
          route: '/tasks'
        },
        {
          icon: 'mdi-account',
          text: 'Users',
          route: '/users'
        },
        {
          icon: 'mdi-account-supervisor-circle',
          text: 'Team',
          route: '/team'
        },
      ],
      menu: [{
          icon: 'mdi-account',
          text: 'Profile',
          route: '/profile'
        },
        {
          icon: 'mdi-file-tree',
          text: 'Tasks',
          route: '/tasks'
        },
        {
          icon: 'mdi-account-supervisor-circle',
          text: 'Team',
          route: '/team'
        },
      ]
    }
  },
  computed: {
    ...mapGetters['user']
  },
  methods: {
    showSnackBar(message) {
      this.snackbar = true;
      this.message = message;
    },
    signOut() {
      firebase.auth().signOut();
      window.location.reload();
    }
  },
  async mounted() {
    const user = firebase.auth().currentUser
    const database = await db.collection('users').doc(user.uid).get()
    // const profile = await database.data().fullName
    this.profile = {
      id: database.id,
      email: database.email,
      address: database.data().address,
      avatar: database.data().avatar,
      fullName: database.data().fullName,
      gender: database.data().gender,
      position: database.data().position,
      phoneNumber: database.data().phoneNumber,
      birthday: database.data().birthday,
      role: database.data().role,
    }
    console.log(this.profile)
  }
}
</script>

<style>
.active {
  background: white;
  color: white;
}
</style>
