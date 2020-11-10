<template>
  <div id=app>
    <div class="md-fixed">
      <Header/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import Header from "./components/Header";

export default {
  components: {
    Header
  },
  data: function () {
    return {
      greeting: 'Hello, Vue!',
      flaskGreeting: '',
      teamName: ''
    }
  },
  created: async function () {
    const gResponse = await fetch("https://trelloprojectapp.herokuapp.com");
    const gObject = await gResponse.json();
    this.flaskGreeting = gObject.greeting;
    this.teamName = gObject.team;
  }
}
</script>

<style lang="scss" scoped>
.md-fixed {
  position: fixed;
  width: 100%;
  float: top;
}

</style>
