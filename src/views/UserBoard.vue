<template>
  <section>
    <div class="full-control">

      <md-dialog :md-active.sync="showDialogList">
        <md-dialog-title>Add new list</md-dialog-title>
        <md-tab md-label="General">
          <md-field>
            <label>Title</label>
            <md-input v-model="newListTitle"></md-input>
          </md-field>
        </md-tab>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogList = false">Cancel</md-button>
          <md-button class="md-primary" @click="addList(newListTitle)">Add</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="showDialogCard">
        <md-dialog-title>Add new card</md-dialog-title>
        <md-tab md-label="General">
          <md-field>
            <label>Title</label>
            <md-input v-model="newCardTitle"></md-input>
          </md-field>
        </md-tab>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogCard = false">Cancel</md-button>
          <md-button class="md-primary" @click="addCard(newCardTitle)">Add</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-toolbar class="md-transparent" style="width: 100%">
        <div class="md-toolbar-section-end" style="width:100%;">
          <h3 class="md-title" style="font-weight: bold; color: white">{{ board.title }}</h3>
        </div>
        <div class="separator md-toolbar-section-end">
          <md-menu md-direction="end" :mdCloseOnClick="closeOnClick" :mdCloseOnSelect="closeOnSelect">
            <md-button md-menu-trigger class="md-icon-button"
                       style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))">
              <md-icon style="color: white;">more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item>Edit title</md-menu-item>
              <md-menu-item>Edit background</md-menu-item>
              <md-menu-item @click="archiveBoard()">Archive board</md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-toolbar>

      <div class="wrapp">

        <div v-for="(list) in lists" v-bind:key="list.id">
          <div class="viewport">
            <md-toolbar :md-elevation="1">
              <span class="md-title">{{ list.title }}</span>
              <div class="separator md-toolbar-section-end">
                <md-menu md-direction="end" :mdCloseOnClick="closeOnClick" :mdCloseOnSelect="closeOnSelect">
                  <md-button md-menu-trigger  class="md-icon-button" style="background: transparent">
                    <md-icon style="color: black;">more_vert</md-icon>
                  </md-button>
                  <md-menu-content>
                    <md-menu-item>Edit title</md-menu-item>
                    <md-menu-item>Move list</md-menu-item>
                    <md-menu-item>Archive list</md-menu-item>
                  </md-menu-content>
                </md-menu>
              </div>
            </md-toolbar>
            <md-content class="md-scrollbar">
              <div v-for="(card) in list.cards" v-bind:key="card.id">
                <md-list class="md-double-line">
                  <md-list-item>
                    <div class="md-list-item-text">
                      <span>{{ card.title }}</span>
                    </div>
                    <!--                <div class="separator md-toolbar-section-end">-->
                    <!--                  <md-menu md-direction="end" :mdCloseOnClick="closeOnClick" :mdCloseOnSelect="closeOnSelect">-->
                    <!--                    <md-button md-menu-trigger  class="md-icon-button" style="background: transparent">-->
                    <!--                      <md-icon style="color: black;">more_vert</md-icon>-->
                    <!--                    </md-button>-->
                    <!--                    <md-menu-content>-->
                    <!--                      <md-menu-item>Edit title</md-menu-item>-->
                    <!--                      <md-menu-item>Edit background</md-menu-item>-->
                    <!--                      <md-menu-item @click="archiveBoard()">Archive board</md-menu-item>-->
                    <!--                    </md-menu-content>-->
                    <!--                  </md-menu>-->
                    <!--                </div>-->
                  </md-list-item>
                  <md-divider></md-divider>
                </md-list>
              </div>
            </md-content>
            <md-list class="md-double-line">
              <md-list-item style="margin-right: auto; margin-left: auto;">
                <md-button @click="showDialogCard = true; currentListName = key" class="md-icon-button"
                           style="color: white; background-color: #d94395;">
                  <md-icon style="color: white;">add</md-icon>
                </md-button>
              </md-list-item>
            </md-list>
          </div>
        </div>
        <div>
          <md-button @click="showDialogList = true" class="md-raised" style="color: white; background-color: #d94395;">Add
            list
          </md-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserBoard",
  data() {
    return {
      board: '',
      lists: [],
      cardName: '',
      listName: '',
      showDialogList: false,
      showDialogCard: false,
      closeOnClick: false,
      closeOnSelect: true
    }
  },
  created: async function () {
    this.board = {"title": this.$route.params.boardTitle, "id": this.$route.params.boardID};
    this.loadContent();
  },
  methods: {
    loadContent: async function () {
      var headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      await fetch(this.$API + "/board_context?board_id=" + this.board.id, {headers: headers})
          .then(response => response.json())
          .then(result => {
            this.lists = result
            console.log(this.lists)
          })
          .catch(error => console.log('error', error));
    },
    addList(newListName) {
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      this.showDialogList = false;
      var formdata = new FormData();
      formdata.append("board_id", this.board.id);
      formdata.append("new_list_title", newListName);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        header: headers
      };
      fetch(this.$API + "/add_list", requestOptions)
          .then(response => {
            if (response.ok) {
              this.loadContent();
            } else {
              alert("Can not add new list to this table");
            }
          })
          .catch(error => console.log('error', error));
    },

    addCard(cardTitle) {
      this.showDialogCard = false;

      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);

      var formdata = new FormData();
      formdata.append("list_id", this.currentListID);
      formdata.append("board_id", this.board.id);
      formdata.append("new_card_title", cardTitle);
      formdata.append("username", this.$store.state.user.username);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        headers: headers,
        redirect: 'follow'
      };
      fetch(this.$API + "/add_card", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.loadContent();
            } else {
              alert("Can not add new card to this list");
            }
          })
          .catch(error => console.log('error', error));
    },
    archiveBoard() {
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("board_id", this.board.id);
      console.log(this.board)
      console.log(this.$store.state.user.username)
      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      fetch(this.$API + "/archieve_board", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.$router.replace("/userHome");
            }
          })
          .catch(error => console.log('error', error));
    }
  }
}

</script>

<style scoped>

section {
  height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('../assets/userBoardBackground.jpg');
  background-position: top left;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  font-family: "Segoe Print", serif;

}


.full-control {
  display: flex;
  flex-wrap: wrap;
  padding-top: 100px;
  justify-content: left;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.wrapp {
  display: flex;
  justify-content: left;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  height: 770px;
}

h3 {
  font-family: "Segoe Print", serif;
  font-size: 40px;
  line-height: 60px;
}

.md-raised {
  margin-top: 20px;
  width: 300px;
  border-radius: 20px;
  font-size: 20px;
  height: 50px;
  font-family: "Segoe Print";
}

.md-toolbar {
  justify-content: center;
}

.viewport {
  width: 300px;
  margin: 20px;
}

.md-double-line {
  justify-content: center;
}

.md-content {
  max-width: 400px;
  max-height: 550px;
  overflow: auto;
}

span{
  line-height: 30px;
}

</style>