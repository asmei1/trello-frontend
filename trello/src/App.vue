<template>
<div id="app">
    <p>{{ greeting }}</p>
    <p>{{ flaskGreeting }}</p>
    <p>{{ teamName }}</p>
</div>
</template>

<script>

export default {
    components: {
    },
    data: function(){
        return {
            greeting: 'Hello, Vue!',
            flaskGreeting: '',
            teamName: '',
            board: ''
        }
    },
    created: async function(){
        const gResponse = await fetch("http://localhost:5000/");
        const gObject = await gResponse.json();
        this.flaskGreeting = gObject.greeting;
        this.teamName = gObject.team;
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
