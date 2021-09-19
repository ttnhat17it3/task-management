<template>
  <v-app class="">
    <Navbar></Navbar>
    <v-main class="grey lighten-3 pt-0">
      <router-view/>
    </v-main>
    <!-- <v-footer class="blue-grey darken-4">footer</v-footer> -->
    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {

  name: 'App',
  components: { 
    Navbar, 
    Footer 
  },
  data: () => ({
    //
  }),
};
</script>
