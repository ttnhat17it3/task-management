<template>
<div class="team">
  <v-subheader class="subheading grey--text">Team</v-subheader>
  <v-container class="my-5">

    <v-row>
      <v-col xs="12" sm="6" md="4" lg="3" v-for="person in myTeam" :key="person.id">
        <v-card class="text-center ma-3">
          <v-responsive class="pt-4">
            <v-avatar size="100">
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg">
              </v-img>
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <h3 class="">{{ person.fullName }}</h3>
            <div class="grey--text">{{ person.position }}</div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn depressed class="grey--text">
              <v-icon small left>mdi-message</v-icon>
              <span>Message</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</div>
</template>

<script>
import db from "@/configs/firebase.js"
import 'firebase/compat/auth'
import firebase from 'firebase/compat/app'

export default {
  data() {
    return {
      team: [{
          name: 'The Net Ninja',
          role: 'Web developer'
        },
        {
          name: 'Ryu',
          role: 'Graphic designer'
        },
        {
          name: 'Chun Li',
          role: 'Web developer'
        },
        {
          name: 'Gouken',
          role: 'Social media maverick'
        },
        {
          name: 'Yoshi',
          role: 'Sales guru'
        }
      ],
      profile: {},
      myTeam: []
    }
  },
  async created() {
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
    // console.log(this.profile)

    const snapshot = await db.collection('users').where('team', '==', this.profile.team).get()
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach(doc => {
      this.myTeam.push({
        id: doc.id,
        ...doc.data()
      })
      // console.log(doc.id, '=>', doc.data());
    });
    console.log(this.myTeam)
  }
}
</script>

<style>

</style>
