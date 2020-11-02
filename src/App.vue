<template>
  <div id=app>
    <div class="md-fixed">
      <Header/>
    </div>
<!--    <div class="full-control">-->
<!--    <md-card style="background: linear-gradient(135deg, #0079bf, #5067c5) no-repeat top left; width: auto; height: 600px; position: center; alignment: center">-->
<!--      <md-card-header>-->
<!--        <md-card-header-text>-->
<!--          <div class="md-title" style="color: white; width: 300px;">Aplikacja Trello pomaga we współpracy i wykonywaniu większej liczby zadań.</div>-->
<!--          <div class="md-subhead" style="color: white; width: 300px;">Tablice, listy i karty Trello umożliwiają zespołom organizację i szeregowanie projektów w przystępny, elastyczny i praktyczny sposób.</div>-->
<!--        </md-card-header-text>-->

<!--        <img src="https://i.pinimg.com/originals/15/53/58/155358fcb5830aa596ac191b15bb0bb2.png" >-->
<!--      </md-card-header>-->
<!--    </md-card>-->
<!--    </div>-->

<!--&lt;!&ndash;      <md-card-actions>&ndash;&gt;-->
<!--&lt;!&ndash;        <md-button>Action</md-button>&ndash;&gt;-->
<!--&lt;!&ndash;        <md-button>Action</md-button>&ndash;&gt;-->
<!--&lt;!&ndash;      </md-card-actions>&ndash;&gt;-->
<!--&lt;!&ndash;    </md-card>&ndash;&gt;-->
<!--    </div>-->
    <div class="full-control">
        <h1 style="color:white;">Aplikacja Trello pomaga we współpracy i wykonywaniu większej liczby zadań.</h1>
        <div class="image">
        <img src="https://i.pinimg.com/originals/15/53/58/155358fcb5830aa596ac191b15bb0bb2.png" >
      </div>

    </div>
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

.full-control {
  padding-top: 100px;
  width: auto;
  height: 500px;
  background: linear-gradient(135deg, #0079bf, #5067c5) no-repeat top left;
  background-size: cover;
}

.md-fixed {
  position: fixed;
  width: 100%;
}

.image{
  float: right;
  margin-right: 300px;
}
h1{
  padding-top: 40px;
  color: white;
  width: 600px;
  font-size: 40px;
  height: 400px;
  margin-left: 300px;
  float: left;
  line-height: 45px;
}
h2{
  padding-top: 120px;
  color: white;
  width: 600px;
  height: 400px;
  margin-left: 300px;
  float: left;
}


md-card{
  margin-right: auto;
  margin-left: auto;
}


</style>
