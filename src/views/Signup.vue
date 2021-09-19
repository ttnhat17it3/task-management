<template>
<v-app id="inspire">
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-row class="fill-height">
              <v-col cols="12" md="4" class="teal accent-3">
                <v-card-text class="white--text mt-12">
                  <h1 class="text-center display-1">Hello friend!</h1>
                  <h5 class="text-center">Enter your personal details and start journey with us</h5>
                </v-card-text>
                <div class="text-center">
                  <router-link to="/login" style="text-decoration: none;">
                    <v-btn rounded outlined dark @click="step--">Log in</v-btn>
                  </router-link>
                </div>
              </v-col>

              <v-col cols="12" md="8">
                <v-card-text class="mt-12">
                  <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
                  <div class="text-center mt-4">
                    <v-btn class="mx-2" fab color="black" outlined>
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>

                    <v-btn class="mx-2" fab color="black" outlined>
                      <v-icon>mdi-google</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" fab color="black" outlined>
                      <v-icon>mdi-linkedin</v-icon>
                    </v-btn>
                  </div>
                  <h4 class="text-center mt-4">Ensure your email for registration</h4>
                  <v-form @submit.prevent="submit">
                    <v-text-field label="Name" name="Name" prepend-icon="mdi-account" type="text" color="teal accent-3" v-model="fullName"/>
                    <v-text-field label="Email" name="Email" prepend-icon="mdi-email" type="text" color="teal accent-3" v-model="email" />

                    <v-text-field id="password" label="Password" name="password" prepend-icon="mdi-lock" type="password" color="teal accent-3" v-model="password" />
                  </v-form>
                </v-card-text>
                <div class="text-center mt-n5 mb-3">
                  <v-btn rounded color="teal accent-3" dark @click="submit">SIGN UP</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import db from '../configs/firebase.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      fullName: '',
    }
  },
  methods: {
    async submit() {
      try {
        const firebaseAuth = await firebase.auth();
        firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            if (cred.user) {
              cred.user.updateProfile({
                displayName: this.fullName,
                photoURL: "https://cdn.vuetifyjs.com/images/john.jpg"
              })
            }
            return db.collection("users").doc(cred.user.uid).set({
              fullName: this.fullName,
              address: "",
              gender: "",
              phoneNumber: "",
              position: "",
              role: 1,
              avatar: "https://cdn.vuetifyjs.com/images/john.jpg"
            })
          })
          .then(() => {
            this.$router.push({
              name: "Dashboard"
            });
          })
        // const result = await createUser;
        // const dataBase = db.collection("users").doc(result.user.uid);
        // await dataBase.set({
        //   email: this.email,
        //   password: this.password
        // });

      } catch (error) {
        console.log(error)
      }

    }
  }
}
</script>

<style>

</style>
