<template>
  <section>
    <div class="full-control">
      <md-dialog :md-active.sync="showDialogEditCard" style="justify-content: center;">
<!--        <md-dialog-title>{{ currentCard.title }}</md-dialog-title>-->
        <md-dialog-content>
          <md-field>
            <md-input v-model="currentCard.title" style="font-size: 30px"></md-input>
          </md-field>


            <md-field>
              <label>Description</label>
              <md-textarea v-model="description" style="width: 600px;"></md-textarea>
              <md-icon>description</md-icon>
            </md-field>

          <md-dialog-actions>
            <md-button class="md-primary" @click="showDialogEditCard = false">Close</md-button>
            <md-button class="md-primary" @click="showDialogEditCard = false">Save</md-button>
          </md-dialog-actions>
        </md-dialog-content>
      </md-dialog>

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

      <md-dialog :md-active.sync="showDialogAddCard">
        <md-dialog-title>Add new card</md-dialog-title>
        <md-tab md-label="General">
          <md-field>
            <label>Title</label>
            <md-input v-model="newCardTitle"></md-input>
          </md-field>
        </md-tab>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogAddCard = false">Cancel</md-button>
          <md-button class="md-primary" @click="addCard(newCardTitle)">Add</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="showDialogRenameList">
        <md-dialog-title>Rename</md-dialog-title>
        <md-tab md-label="General">
          <md-field>
            <label>New title</label>
            <md-input v-model="newTitleOfList"></md-input>
          </md-field>
        </md-tab>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogRenameList = false">Cancel</md-button>
          <md-button class="md-primary" @click="renameTitleOfList(newTitleOfList)">Save</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="showDialogRenameBoard">
        <md-dialog-title>Rename</md-dialog-title>
        <md-tab md-label="General">
          <md-field>
            <label>New title</label>
            <md-input v-model="newTitleOfBoard"></md-input>
          </md-field>
        </md-tab>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogRenameBoard = false">Cancel</md-button>
          <md-button class="md-primary" @click="renameTitleOfBoard(newTitleOfBoard)">Save</md-button>
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
              <md-menu-item @click="showDialogRenameBoard = true;">Edit title</md-menu-item>
              <md-menu-item>Edit background</md-menu-item>
              <md-menu-item>Archived items</md-menu-item>
              <md-menu-item @click="archiveBoard()">Archive board</md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-toolbar>

      <div class="wrapp">

        <div v-for="(list) in lists" v-bind:key="list.id">
          <template v-if="!list.is_archieve">
            <div class="viewport">
              <md-toolbar :md-elevation="1">
                <span class="md-title">{{ list.title }}</span>
                <div class="separator md-toolbar-section-end">
                  <md-menu md-direction="end" :mdCloseOnClick="closeOnClick" :mdCloseOnSelect="closeOnSelect">
                    <md-button md-menu-trigger class="md-icon-button" style="background: transparent">
                      <md-icon style="color: black;">more_vert</md-icon>
                    </md-button>
                    <md-menu-content>
                      <md-menu-item @click="showDialogRenameList = true; currentListID = list.id">Edit title</md-menu-item>
                      <md-menu-item>Move list</md-menu-item>
                      <md-menu-item @click="archiveList(list.id)">Archive list</md-menu-item>
                    </md-menu-content>
                  </md-menu>
                </div>
              </md-toolbar>

              <md-content class="md-scrollbar">
                <div v-for="(card) in list.cards" v-bind:key="card.id">
                  <template v-if="!card.is_archieve">
                    <div class="elevation-demo" @click="showDialogEditCard = true; currentCard = card">
                      <md-card md-with-hover style="margin: 5px; border-radius: 5px;">
                        <md-ripple>
                          <md-card-header>
                            <div class="md-title">{{ card.title }}</div>
                          </md-card-header>
                        </md-ripple>
                      </md-card>
                    </div>
                  </template>
                  <!--                <md-list class="md-double-line">-->
                  <!--                  <md-list-item>-->
                  <!--                    <div class="md-list-item-text">-->
                  <!--                      <span>{{ card.title }}</span>-->
                  <!--                    </div>-->
                  <!--                    &lt;!&ndash;                <div class="separator md-toolbar-section-end">&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                  <md-menu md-direction="end" :mdCloseOnClick="closeOnClick" :mdCloseOnSelect="closeOnSelect">&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                    <md-button md-menu-trigger  class="md-icon-button" style="background: transparent">&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                      <md-icon style="color: black;">more_vert</md-icon>&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                    </md-button>&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                    <md-menu-content>&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                      <md-menu-item>Edit title</md-menu-item>&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                      <md-menu-item>Edit background</md-menu-item>&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                      <md-menu-item @click="archiveBoard()">Archive board</md-menu-item>&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                    </md-menu-content>&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                  </md-menu>&ndash;&gt;-->
                  <!--                    &lt;!&ndash;                </div>&ndash;&gt;-->
                  <!--                  </md-list-item>-->
                  <!--                  <md-divider></md-divider>-->
                  <!--                </md-list>-->
                </div>

              </md-content>
              <md-list class="md-double-line">
                <md-list-item style="margin-right: auto; margin-left: auto;">
                  <md-button @click="showDialogAddCard = true; currentListID = list.id" class="md-icon-button"
                             style="color: white; background-color: #d94395;">
                    <md-icon style="color: white;">add</md-icon>
                  </md-button>
                </md-list-item>
              </md-list>

          </div>
        </template>
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
      currentCard: {},
      board: '',
      lists: [],
      cardName: '',
      listName: '',
      showDialogList: false,
      showDialogAddCard: false,
      showDialogRenameList: false,
      showDialogRenameBoard: false,
      showDialogEditCard: false,
      closeOnClick: false,
      closeOnSelect: true,
      description: null
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
      this.showDialogAddCard = false;

      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);

      var formdata = new FormData();
      formdata.append("list_id", this.currentListID);
      formdata.append("board_id", this.board.id);
      formdata.append("new_card_title", cardTitle);
      formdata.append("new_card_description", '');
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
    },

    archiveList(currentListID) {
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("board_id", this.board.id);
      formdata.append("list_id", currentListID);

      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      fetch(this.$API + "/archieve_list", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.loadContent();
            }
          })
          .catch(error => console.log('error', error));
    },
    renameTitleOfBoard(newTitle){
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("board_id", this.board.id);
      formdata.append("new_title_board", newTitle);


      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      fetch(this.$API + "/rename_title_board", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.loadContent();
              this.showDialogRenameBoard = false;
            }
          })
          .catch(error => console.log('error', error));

    },
    renameTitleOfList(newTitle){

      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("board_id", this.board.id);
      formdata.append("list_id", this.currentListID);
      formdata.append("new_title_list", newTitle);


      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      fetch(this.$API + "/rename_title_list", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.loadContent();
              this.showDialogRenameList = false;
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
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('../assets/boardDefaultBackground.jpg');
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

span {
  line-height: 30px;
}

.md-dialog-content {
  max-width: 800px;
}

</style>