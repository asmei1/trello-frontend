<template>
  <section :style="{backgroundImage: `url(${board.background})`, backgroundSize: 'cover', backgroundPosition: 'topLeft', linearGradient: '(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))'}">
    <div class="full-control">
      <md-dialog :md-active.sync="showDialogEditCard" style="justify-content: center;">
        <!--        <md-dialog-title>{{ currentCard.title }}</md-dialog-title>-->
        <md-dialog-content>
          <md-field>
            <md-input v-model="newEditCardTitle" style="font-size: 30px"></md-input>
          </md-field>

          <md-field>
            <label>Description</label>
            <md-textarea v-model="newEditCardDescription" style="width: 600px;"></md-textarea>
            <md-icon>description</md-icon>
          </md-field>

          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: transparent;" @click="archiveCard()">
            Archive
          </md-button>
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: transparent;" @click="removeCard()">Remove
          </md-button>


          <md-field>
            <md-input v-model="newCommentContent" placeholder="Type your comment"></md-input>
          </md-field>
          <div style="padding-top: -10px; text-align: right">
            <md-button class="" style="width: 70px; font-size: 12px; background-color: #0079BF; color: white;"
                       @click="sendComment(newCommentContent)">Send
            </md-button>
          </div>
          <md-button v-if="showCommentsInCard" v-on:click="showCommentsInCard = false">Hide the comments below
          </md-button>
          <md-button v-if="!showCommentsInCard" v-on:click="showCommentsInCard = true">
            Show the comments below
          </md-button>
          <div style="min-width: 100%">
            <md-content v-if="showCommentsInCard" class="md-scrollbar" style="max-height: 200px; min-width: 100%">
              <div v-for="(comment) in activeCardComments" v-bind:key="comment.id"
                   style="width: 100%; background-color: lightgray; padding: 10px; margin-bottom: 10px">
                <div>
                  <span class="md-alignment-left"
                        style="font-size: 10px; display: inline-block; width: 50%">{{ comment.author.username }}</span>
                  <span class="md-alignment-right"
                        style="font-size: 10px; padding-right: 5px;text-align: right; display: inline-block; width: 50%">{{
                      formatDate(comment.created_date)
                    }}</span>
                </div>
                <div>{{ comment.content }}</div>
              </div>

              <br>
            </md-content>
          </div>
          <md-dialog-actions>
            <md-button class="md-raised" :md-ripple="false"
                       style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                       @click="newCommentContent = ''; updateCardProperties(newEditCardTitle, newEditCardDescription)">
              Close
            </md-button>
          </md-dialog-actions>

        </md-dialog-content>
      </md-dialog>

      <md-dialog :md-active.sync="showDialogBackgroundEdit">
        <md-dialog-content>
          <md-dialog-title>Change background</md-dialog-title>
          <md-tab md-label="General">
            <md-field>
              <label>Only images</label>
              <md-file v-model="single" accept="image/*" @change="previewFile()"/>
            </md-field>
            <img src="newBackground64" height="200px" width="300px" alt="Image preview...">
            <template v-if="newBackground64 != null">
              <div class="image">
                <img :src="newBackground64">
              </div>
            </template>
            <!--          <img :src="newBackground" class="image">-->
          </md-tab>
          <md-dialog-actions>
            <md-button class="md-raised" :md-ripple="false"
                       style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                       @click="saveNewBackground()">OK
            </md-button>
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
          <md-button class="md-raised" :md-ripple="false" style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;" @click="showDialogList = false">Cancel</md-button>
          <md-button class="md-raised" :md-ripple="false" style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;" @click="addList(newListTitle)">Add</md-button>
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
          <md-button class="md-raised" :md-ripple="false" style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;" @click="showDialogAddCard = false">Cancel</md-button>
          <md-button class="md-raised" :md-ripple="false" style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;" @click="addCard(newCardTitle)">Add</md-button>
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
          <md-button class="md-raised" :md-ripple="false" style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;" @click="showDialogRenameList = false">Cancel</md-button>
          <md-button class="md-raised" :md-ripple="false" style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;" @click="renameTitleOfList(newTitleOfList)">Save</md-button>
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
          <md-button class="md-raised" :md-ripple="false" style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;" @click="showDialogRenameBoard = false">Cancel</md-button>
          <md-button class="md-raised" :md-ripple="false" style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;" @click="renameTitleOfBoard(newTitleOfBoard)">Save</md-button>
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
              <md-menu-item @click="showDialogBackgroundEdit = true;">Edit background</md-menu-item>
              <md-menu-item>Archived items</md-menu-item>
              <md-menu-item @click="archiveBoard()">Archive board</md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-toolbar>

      <div class="wrapp">
        <draggable
            :list="lists"
            :animation="200"
            ghost-class="moving-card"
            group="lists"
            filter=".action-button"
            class="w-full max-w-xs"
            tag="elevation"
            @change="cardDraggedAction(lists)"
            style="display: flex;
              flex-wrap: wrap;"
        >
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
                        <md-menu-item @click="removeList(list.id)">Remove list</md-menu-item>
                      </md-menu-content>
                    </md-menu>
                  </div>
                </md-toolbar>

                <md-content class="md-scrollbar">
                  <draggable
                      :list="list.cards"
                      :animation="200"
                      ghost-class="moving-card"
                      group="list.cards"
                      filter=".action-button"
                      class="w-full max-w-xs"
                      tag="ul"
                      @change="cardDraggedAction(lists)"
                  >
                    <div v-for="(card) in list.cards" v-bind:key="card.id">
                      <template v-if="!card.is_archieve">
                        <div class="elevation-demo" @click="showDialogEditCard = true; currentCard = card; currentListID=list.id; newEditCardTitle = card.title; newEditCardDescription = card.description">                      <md-card md-with-hover style="margin: 5px; border-radius: 5px;">
                          <md-ripple>
                            <md-card-header>
                              <div class="md-title">{{ card.title }}</div>
                            </md-card-header>
                            <!--                          <md-button class="md-icon-button">-->
                            <!--                            <md-icon>favorite</md-icon>-->
                            <!--                          </md-button>-->
                          </md-ripple>
                        </md-card>
                        </div>
                      </template>
                    </div>
                  </draggable>
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
        </draggable>
      </div>
    </div>
  </section>
</template>

<script>
import Moment from "moment-js";

import draggable from 'vuedraggable';
export default {
  components: {
    draggable
  },
  name: "UserBoard",
  data() {
    return {
      newTitleOfBoard: "",
      currentCard: {},
      board: '',
      newBackground64: '',
      lists: [],
      cardName: '',
      listName: '',
      showDialogList: false,
      showDialogAddCard: false,
      showDialogRenameList: false,
      showDialogRenameBoard: false,
      showDialogEditCard: false,
      showDialogBackgroundEdit: false,
      closeOnClick: false,
      closeOnSelect: true,
      description: null,
      files: null,
      showCommentsInCard: false,
      newCommentContent: "",
      newListTitle: false,
      activeCardComments: []
    }
  },
  created: async function () {
    this.board = {"title": this.$route.params.boardTitle, "id": this.$route.params.boardID};
    this.loadContent();
  },
  methods: {
    cardDraggedAction(lists){
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("lists_state", JSON.stringify(lists));

      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://localhost:5000/save_components_state", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));


    },
    loadContent: async function () {
      var headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      let response = await fetch(this.$API + "/board_context?board_id=" + this.board.id, {headers: headers})
      let data = await response.json()
      this.board.background = data.board_properties.background;
      this.lists = data.lists;

      // this.newBackground64 = this.board.background;
      console.log("RESULT" + data)

      console.log("lists" + this.lists)
      console.log("board_properties " + this.newBackground64)
    },
    loadCommentsForCurrentCard: async function () {
      console.log("Zaczał ładować " + this.currentCard.id)

      this.activeCardComments = [];
      var headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      let response = await fetch(this.$API + "/card/" + this.currentCard.id + "/get_comments", {headers: headers})
      let data = await response.json()
      this.activeCardComments = data;

      console.log(this.activeCardComments)
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
    removeList(currentListID) {
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

      fetch(this.$API + "/remove_list", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.loadContent();
            }
          })
          .catch(error => console.log('error', error));
    },
    archiveCard() {
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("list_id", this.currentListID);
      formdata.append("card_id", this.currentCard.id);


      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      fetch(this.$API + "/archieve_card", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.loadContent();
              this.showDialogEditCard = false;
            }
          })
          .catch(error => console.log('error', error));
    },
    removeCard() {
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("list_id", this.currentListID);
      formdata.append("card_id", this.currentCard.id);


      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      fetch(this.$API + "/remove_card", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.loadContent();
              this.showDialogEditCard = false;
            }
          })
          .catch(error => console.log('error', error));
    },
    renameTitleOfBoard(newTitle) {
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
      const id = this.board.id;
      fetch(this.$API + "/rename_title_board", requestOptions)
          .then(async response => {
            if (response.ok) {
              console.log("Should be changed")
              this.showDialogRenameBoard = false;
              await this.$router.replace({
                name: 'UserBoard',
                params: {boardID: id, boardTitle: newTitle}
              })
                  .then(() => {
                    this.board.title = newTitle;
                    this.newTitleOfBoard = "";
                  })
                  .catch(error => console.log('error', error));
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


    },
    saveNewBackground() {
      this.showDialogBackgroundEdit = false;
    },

    sendComment(commentContent) {
      this.newCommentContent = '';
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("content", commentContent);

      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      fetch(this.$API + "/card/" + this.currentCard.id + "/add_comment", requestOptions)
          .then(async response => {
            if (response.ok) {
              await this.loadCommentsForCurrentCard();
            }
          })
          .catch(error => console.log('error', error));

    },
    previewFile() {
      const preview = document.querySelector('img');
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();
      let vm = this;

      reader.onload = function (){
        preview.src = reader.result;
        console.log("RESULT: " + reader.result)
        this.background = reader.result;
        console.log("PREVIEW11111: " + this.background )
        const headers = new Headers();
        headers.append("Authorization", 'Bearer ' + vm.$store.state.token);
        var formdata = new FormData();
        formdata.append("board_id", vm.board.id);
        formdata.append("image", this.background);


        var requestOptions = {
          method: 'POST',
          headers: headers,
          body: formdata,
          redirect: 'follow'
        };

        fetch(vm.$API + "/set_background_board", requestOptions)
            .then(response => {
              console.log(response.ok)
              vm.loadContent();
            })
            .catch(error => console.log('error', error));
      }



      reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
        console.log("RESULT: " + reader.result)
        this.background = reader.result;

      })



      if (file) {
        reader.readAsDataURL(file);
      }


    },
    updateCardProperties(newCardTitle, newCardDescription){
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("card_id", this.currentCard.id);
      formdata.append("list_id", this.currentListID);
      formdata.append("new_title_card", newCardTitle);
      formdata.append("new_description_card", newCardDescription);
      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };
      fetch(this.$API + "/update_card_properties", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.loadContent();
              this.showDialogEditCard = false;
              this.currentCard.title = newCardTitle;
              this.currentCard.description = newCardDescription;
            }
          })
          .catch(error => console.log('error', error));
    },
    formatDate(date) {
      return Moment(date).format('DD.MM.YYYY h:mm:ss');
    }



  }
}

</script>

<style lang="scss" scoped>


section{
  height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
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

.image {
  float: right;
  margin-right: 300px;
  padding-top: 75px;
}

.moving-card {
  opacity: 0.5;
  background: #f7fafc;
}

ul{
  padding: 0px;
}
</style>