<template>
  <section>
    <div class="full-control">
<!--      <div class="elevation-demo">-->
        <md-toolbar style="color: white; background-color: #0079BF;">
          <h3 class="md-title" style="color: white;">Active tables</h3>
        </md-toolbar>
        <div v-for="(board) in nonArchivedBoards" v-bind:key="board.id">
          <md-button class="md-raised">{{ board }}</md-button>
        </div>
<!--      <md-button class="md-raised">{{ nonArchivedBoards}}</md-button>-->
        <md-button class="md-raised" style="color: black; background-color: #F0F0F0;">Create new table</md-button>
        <md-toolbar style="color: white; background-color: dimgray;">
          <h3 class="md-title" style="color: white;">Archived tables</h3>
        </md-toolbar>
        <div v-for="(board) in archivedBoards" v-bind:key="board.id">
          <md-button class="md-raised">{{ board.id }}</md-button>
        </div>
<!--      <md-button class="md-raised">{{ archivedBoards}}</md-button>-->
<!--      </div>-->
    </div>
  </section>
</template>

<script>
export default {
name: "UserHome",
  data(){
  return{
    archivedBoards: [],
    nonArchivedBoards: []
    }
  },
  created: async function () {

    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'http://localhost:5000/get_user_boards?username=User',
      'headers': {
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      var data = JSON.parse(response.body);
      this.archivedBoards = data.archieve_boards;
      this.nonArchivedBoards = data.non_archieve_boards;
      console.log(this.archivedBoards);
      console.log(this.nonArchivedBoards);
    });


  }
}
</script>

<style lang="scss" scoped>

section{
  height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('../assets/homeUserBackground.jpg');
  background-position: top left;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.full-control {
  display: flex;
  flex-wrap: wrap;
  padding-top: 100px;
  max-width: 800px;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.elevation-demo {
  display: flex;
  flex-wrap: wrap;
  padding-top: 100px;
  max-width: 800px;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.md-content {
  width: 100px;
  height: 100px;
  margin: 24px;
  display: flex;
  justify-content: center;
}

.md-raised{
  height: 100px;
  width: 200px;
}
.md-toolbar{
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #eca3cb;
}

</style>