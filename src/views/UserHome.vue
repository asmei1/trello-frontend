<template>
  <section>
    <div class="full-control">
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Add new board</md-dialog-title>
        <md-tab md-label="General">
          <md-field>
            <label>Title</label>
            <md-input v-model="newBoardTitle" ></md-input>
          </md-field>
        </md-tab>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Cancel</md-button>
          <md-button class="md-primary" @click="createNewTable(newBoardTitle)">Add</md-button>
        </md-dialog-actions>
      </md-dialog>
      <md-toolbar style="color: white; background-color: #0079BF;">
        <h3 class="md-title" style="color: white;">Active tables</h3>
      </md-toolbar>
      <div v-for="(board) in nonArchivedBoards" v-bind:key="board.id">
        <router-link :to="{name: 'UserBoard', params: { titleBoard: board }}">
          <md-button class="md-raised">{{ board }}</md-button>
        </router-link>
      </div>
      <md-button @click="showDialog = true"  class="md-fab md-primary" style="color: black; background-color: #d94395; margin: 30px">
        <md-icon>add</md-icon>
      </md-button>
      <md-toolbar style="color: white; background-color: dimgray;">
        <h3 class="md-title" style="color: white;">Archived tables</h3>
      </md-toolbar>
      <div v-for="(board) in archivedBoards" v-bind:key="board.id">
<!--        <router-link :to="{name: 'UserBoard', params: { titleBoard: board }}">-->
          <md-button class="md-raised">{{ board}}</md-button>
<!--        </router-link>-->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserHome",
  data(){
    return{
      archivedBoards: [],
      nonArchivedBoards: [],
      showDialog: false,
      newBoardTitle: ''
    }
  },
  created: async function () {
    var headers = new Headers();
    headers.append("Authorization", 'Bearer ' + this.$store.state.token);
    let response = await fetch(this.$API + `/get_user_boards?username=` + this.$store.state.user.username, {headers: headers});
    let data = await response.json()
    this.archivedBoards = data.archieve_boards;
    this.nonArchivedBoards = data.non_archieve_boards;
    console.log(this.nonArchivedBoards)
  },
  methods: {
    createNewTable(tableName){
      this.showDialog = false;
      var headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("board_name", tableName);
      formdata.append("username", this.$store.state.user.username);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        headers: headers,
        redirect: 'follow'
      };
      fetch(this.$API + "/add_board", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.nonArchivedBoards.push(tableName);
            } else {
              alert("Can not add new table");
            }
          })
          .catch(error => console.log('error', error));
    }
  }
}
</script>

<style lang="scss" scoped>

section{
  height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('../assets/pink-blue-polygonal-wallapepr-1024x640.jpg');
  background-position: top left;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  font-family: "Segoe Print",serif;

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
  border-radius: 10px;
}

.md-toolbar{
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #eca3cb;
}
.md-content{
  height: 400px;
}

.md-dialog /deep/.md-dialog-container {
  max-width: 200px;
}
</style>