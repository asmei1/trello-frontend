<template>
  <div id=app>
    <main>
      <div class="container">
      <h1 class="display-3">{{ greeting }}</h1>
      <h2 class="display-3">{{ flaskGreeting }}</h2>
      <h3 class="display-3">{{ teamName }}</h3>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  components: {},
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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

#app {
  background-image: url('./assets/vue.jpeg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

main {
  min-height: 100vh;
  padding-top: 200px;
  padding-left: 70vh;
}

.container {
  background-color: white;
  border-color: #42b983;
  border-style: dashed;
  border-radius: 14px;
  width: 600px;
  height: 200px;
}
.display-3 {
  padding: 20px;
}
</style>
