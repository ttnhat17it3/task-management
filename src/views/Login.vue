<template>
<v-app id="inspire">
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-row>
              <v-col cols="12" md="8">
                <v-card-text class="mt-12">
                  <h1 class="text-center display-2 teal--text text--accent-3">LOG IN</h1>
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
                  <v-form @submit.prevent="submit" ref="form">
                    <v-text-field label="Email" name="Email" prepend-icon="mdi-email" type="text" color="teal accent-3" v-model="email"/>

                    <v-text-field id="password" label="Password" name="password" prepend-icon="mdi-lock" type="password" color="teal accent-3" v-model="password"/>
                  </v-form>
                  <h3 class="text-center mt-4">Forgot your password ?</h3>
                </v-card-text>
                <div class="text-center mt-3 mb-3">
                  <v-btn rounded color="teal accent-3" dark @click="submit">LOG IN</v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="4" class="teal accent-3">
                <v-card-text class="white--text mt-12">
                  <h1 class="text-center " style="">Welcome back!</h1>
                  <h5 class="text-center">To Keep connected with us please login with your personnel info</h5>
                </v-card-text>
                <div class="text-center">
                  <router-link to="/signup" style="text-decoration: none;">
                    <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                  </router-link>
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
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("login", {
        email: this.email, 
        password: this.password
      });
      this.$router.push({ name: "Dashboard" });
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(this.email, this.password)
      //   .then(() => {
      //     this.$router.push({ name: "Dashboard" });
      //     // this.error = false;
      //     // this.errorMsg = "";
      //     console.log(firebase.auth().currentUser.uid);
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     // this.error = true;
      //     // this.errorMsg = err.message;
      //   });
    }
  }
}
</script>

<style>

</style>
