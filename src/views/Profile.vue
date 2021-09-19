<template>
<div class="profile">
  <v-snackbar v-model="snackbar" timeout="3000" top>
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>

  <v-subheader class="subheading grey--text">Profile</v-subheader>

  <v-container class="my-5">

    <v-row class="">
      <v-col cols="4" md="4" sm="12" xs="12" class="text-center">
        <div class="">
          <v-avatar size="200" class="mb-4">
            <img :src="profile.avatar" alt="">
          </v-avatar>
        </div>
        <div class="">
          <v-btn @click="editProfile">
            <v-icon left>mdi-pencil</v-icon>
            Edit profile
          </v-btn>
        </div>
      </v-col>

      <v-col cols="8" md="8" sm="12" xs="12">

        <v-row>
          <v-col cols="6" md="6" sm="12" xs="12">
            <v-text-field :value="user.fullName" label="Full name" outlined :readonly="uneditable" v-model="profile.fullName"></v-text-field>
            <v-text-field :value="user.gender" label="Gender" outlined :readonly="uneditable" v-model="profile.gender"></v-text-field>
            <v-text-field :value="user.birthday" label="Birthday" outlined :readonly="uneditable" v-model="profile.birthday"></v-text-field>
          </v-col>

          <v-col cols="6" md="6" sm="12" xs="12">
            <v-text-field :value="user.address" label="Address" outlined :readonly="uneditable" v-model="profile.address"></v-text-field>
            <v-text-field :value="user.phoneNumber" label="Phone number" outlined :readonly="uneditable" v-model="profile.phoneNumber"></v-text-field>
            <v-text-field :value="user.position" label="Position" outlined :readonly="uneditable" v-model="profile.position"></v-text-field>
          </v-col>

        </v-row>
        <div class="text-center">
          <v-btn class="success" :disabled="unsave" @click="saveProfile">
            <v-icon left>mdi-content-save</v-icon>
            Save changes
          </v-btn>
        </div>

        <div class="text-center">
          <p class="success" :disabled="unsave" @click="saveProfile">
            <!-- {{ this.currentUser }} dsadoj -->
          </p>
        </div>
      </v-col>
    </v-row>

  </v-container>

</div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import db from '../configs/firebase'

export default {
  data() {
    return {
      uneditable: true,
      unsave: true,
      profile: {},
      snackbar: false,
      message: '',
      messageType: 'primary'
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {

  },
  methods: {
    editProfile() {
      this.uneditable = false
      this.unsave = false
    },
    async saveProfile() {
      console.log("ahihi: ", {
        fullName: this.profile.fullName,
        address: this.profile.address,
        gender: this.profile.gender,
        birthday: this.profile.birthday,
        position: this.profile.position,
        phoneNumber: this.profile.phoneNumber
      })
      this.$store.dispatch("updateProfile", { 
        id: this.user.id, 
        profile: {
          fullName: this.profile.fullName,
          address: this.profile.address,
          gender: this.profile.gender,
          birthday: this.profile.birthday,
          position: this.profile.position,
          phoneNumber: this.profile.phoneNumber
        }
      })
      // try {
      //   await db.collection('users').doc(this.profile.id).update({
      //     fullName: this.profile.fullName,
      //     address: this.profile.address,
      //     gender: this.profile.gender,
      //     birthday: this.profile.birthday,
      //     position: this.profile.position,
      //     phoneNumber: this.profile.phoneNumber
      //   })
      //   this.uneditable = true
      //   this.unsave = true
      //   this.message = "Edit profile successfully"
      //   this.snackbar = true
      // } catch (error) {
      //   console.log(error)
      //   this.message = error.message
      // }
    }
  },
  async created() {
    this.$store.dispatch("getCurrentUser")
    console.log("profile", this.user)
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
      team: database.data().team,
    }
    console.log(this.profile)
  }
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
