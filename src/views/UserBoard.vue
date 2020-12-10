<template>
  <section
      :style="{backgroundImage: `url(${board.background})`, backgroundSize: 'cover', backgroundPosition: 'topLeft', linearGradient: '(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))'}">
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

          <!--          <v-swatches v-model="color">-->
          <!--          </v-swatches>-->

          <md-button md-menu-trigger class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: transparent;"
                     @click="getLabel();  palletColorShow = !palletColorShow; currentCard = card; currentListID=list.id">
            Add label
          </md-button>

          <template v-if="palletColorShow">
            <md-content class="md-scrollbar" style="height: 200px;">
              <div v-for="(color) in colors" v-bind:key="color.id">
                <div @click="color.active = !color.active; setLabelOnCard(color.color, color.active);"
                     class="elevation-demo">
                  <md-card md-with-hover :style="`background-color: #${color.color}`"
                           style="border-radius: 15px; margin: 10px; height: 30px">
                    <md-ripple class="md-toolbar-section-end">
                      <md-card-header class="md-toolbar-section-start">
                        <div class="md-title" style="color: white; font-size: 16px">{{ color.color }}</div>
                      </md-card-header>
                      <template v-if="color.active">

                        <div>
                          <md-icon class="md-size-x" style="margin-right: 30px; color: white">check</md-icon>
                        </div>
                      </template>
                    </md-ripple>
                  </md-card>
                </div>
              </div>
            </md-content>
          </template>


          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: transparent;" @click="archiveCard()">
            Archive
          </md-button>

<!--          <md-dialog-actions>-->
<!--            <md-button class="md-raised" :md-ripple="false"-->
<!--                       style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"-->
<!--                       @click="updateCardProperties(newEditCardTitle, newEditCardDescription); showDialogEditCard = false">-->
<!--              Close-->
<!--            </md-button>-->
<!--          </md-dialog-actions>-->
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
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                     @click="showDialogList = false">Cancel
          </md-button>
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                     @click="addList(newListTitle)">Add
          </md-button>
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
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                     @click="showDialogAddCard = false">Cancel
          </md-button>
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                     @click="addCard(newCardTitle)">Add
          </md-button>
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
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                     @click="showDialogRenameList = false">Cancel
          </md-button>
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                     @click="renameTitleOfList(newTitleOfList)">Save
          </md-button>
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
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                     @click="showDialogRenameBoard = false">Cancel
          </md-button>
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                     @click="renameTitleOfBoard(newTitleOfBoard)">Save
          </md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="showMoveList">
        <md-dialog-title>Move list to:</md-dialog-title>
        <md-tab md-label="General">
          <div v-for="(boardReader) in nonArchivedBoards" v-bind:key="boardReader.id">
            <template v-if="board.id != boardReader.id">
              <md-radio v-model="radio" :value=boardReader.id>{{ boardReader.title }}</md-radio>
            </template>
          </div>
        </md-tab>
        <md-dialog-actions>
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                     @click="showMoveList = false">Cancel
          </md-button>
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                     @click="saveMoveList(radio)">Move
          </md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="showArchivedItems" >
        <md-dialog-title>Archived items</md-dialog-title>
        <md-tab md-label="General">

          <md-list class="md-double-line">
            <md-card-header style="font-size: 18px">Archived lists</md-card-header>
            <md-content class="md-scrollbar" style="height: 200px; width: 400px; border-color: #0047AB">

              <div v-for="(archived_list) in archived_lists" v-bind:key="archived_list.id">
                <md-list-item>
                  <div class="md-list-item-text">
                    <span>{{ archived_list.title }}</span>
                  </div>

                  <md-button @click="unarchiveList(archived_list.id)" class="md-icon-button md-list-action">
                    <md-icon style="color: darkgreen">restore</md-icon>
                  </md-button>
                  <md-button @click="removeList(archived_list.id)" class="md-icon-button md-list-action">
                    <md-icon style="color: black">delete</md-icon>
                  </md-button>
                </md-list-item>
              </div>
            </md-content>

            <br>
            <hr size="1" width="90%" color="grey">

            <md-card-header style="font-size: 18px">Archived cards</md-card-header>
            <md-content class="md-scrollbar" style="height: 200px; width: 400px;">
              <div v-for="(archived_cards, archived_list_title) in archieved_cards_from_list"
                   v-bind:key="archived_cards.id">
                <div v-for="(archived_card) in archived_cards" v-bind:key="archived_card.id">
                  <md-list-item class="md-scrollbar">
                    <div class="md-list-item-text">
                      <span>{{ archived_card.title }}</span>
                      <span>{{ archived_list_title }}</span>
                    </div>

                    <md-button @click="unarchiveCard(archived_card.id, archived_card.list_id)"
                               class="md-icon-button md-list-action">
                      <md-icon style="color: darkgreen">restore</md-icon>
                    </md-button>
                    <md-button @click="removeCard(archived_card.id, archived_card.list_id)"
                               class="md-icon-button md-list-action">
                      <md-icon style="color: black">delete</md-icon>
                    </md-button>
                  </md-list-item>
                </div>
              </div>
            </md-content>
          </md-list>

        </md-tab>
        <md-dialog-actions>
          <md-button class="md-raised" :md-ripple="false"
                     style="width: 100px; font-size: 14px; background-color: #0079BF; color: white;"
                     @click="showArchivedItems = false">Ok
          </md-button>
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
              <md-menu-item @click="getArchivedItem()">Archived items</md-menu-item>
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
                        <md-menu-item @click="showDialogRenameList = true; currentListID = list.id">Edit title
                        </md-menu-item>
                        <md-menu-item @click="showMoveList = true; currentListID = list.id">Move list</md-menu-item>
                        <md-menu-item @click="archiveList(list.id)">Archive list</md-menu-item>
                        <!--                        <md-menu-item @click="removeList(list.id)">Remove list</md-menu-item>-->
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
                  >
                    <div v-for="(card) in list.cards" v-bind:key="card.id">
                      <template v-if="!card.is_archieve">

                        <div class="elevation-demo"
                             @click="clearColorsActive(); palletColorShow = false; showDialogEditCard = true; currentCardId = card.id; currentCard = card; currentListID=list.id; newEditCardTitle = card.title; newEditCardDescription = card.description;">
                          <md-card md-with-hover style="margin: 5px; border-radius: 5px;">
                            <md-ripple>
                              <div style="justify-content: left;display: flex; flex-wrap: wrap;">
                                  <div v-for="(colorCard) in card.label" v-bind:key="colorCard">
                                      <md-icon class="md-size-2x" :style="`color: #${colorCard}`">label</md-icon>
                                  </div>
                              </div>
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
            <md-button @click="showDialogList = true" class="md-raised"
                       style="color: white; background-color: #d94395;">Add
              list
            </md-button>
          </div>
        </draggable>
      </div>
    </div>
  </section>
</template>

<script>
// import VSwatches from 'vue-swatches'
import draggable from 'vuedraggable';
import 'vue-swatches/dist/vue-swatches.css'

export default {
  components: {
    draggable,
  },
  name: "UserBoard",
  data() {
    return {
      newTitleOfBoard: "",
      currentCard: {},
      currentCardId: null,
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
      archivedBoards: [],
      nonArchivedBoards: [],
      showMoveList: false,
      radio: false,
      showArchivedItems: false,
      archieved_cards_from_list: [],
      archived_lists: [],
      color: '#1CA085',
      palletColorShow: false,
      colors: [
        {'active': false, 'color': '008000'},
        {'active': false, 'color': 'FFD700'},
        {'active': false, 'color': 'FF6600'},
        {'active': false, 'color': 'FF0000'},
        {'active': false, 'color': 'FF00AF'},
        {'active': false, 'color': '0047AB'},
        {'active': false, 'color': '000000'},
      ],
      colorCardArray: []
    }
  },
  created: async function () {
    this.board = {"title": this.$route.params.boardTitle, "id": this.$route.params.boardID};
    this.getUserBoards();
    this.loadContent();
  },
  methods: {
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
    getUserBoards: async function () {
      var headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      let response = await fetch(this.$API + `/get_user_boards?username=` + this.$store.state.user.username, {headers: headers});
      let data = await response.json()
      this.archivedBoards = data.archieve_boards;
      this.nonArchivedBoards = data.non_archieve_boards;
      console.log(this.nonArchivedBoards)
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
      console.log("karta: " + cardTitle)
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
    unarchiveList(currentListID) {
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

      fetch(this.$API + "/unarchieve_list", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.loadContent();
              this.getArchivedItem();
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
              this.getArchivedItem();
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
    unarchiveCard(currentCard, currentListID) {
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("card_id", currentCard);
      formdata.append("list_id", currentListID);


      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      fetch(this.$API + "/unarchieve_card", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.loadContent();
              this.getArchivedItem();
            }
          })
          .catch(error => console.log('error', error));
    },
    removeCard(currentCard, currentListID) {
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("list_id", currentListID);
      formdata.append("card_id", currentCard);


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
              this.getArchivedItem();
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
    renameTitleOfList(newTitle) {

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
    previewFile() {
      const preview = document.querySelector('img');
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();
      let vm = this;

      reader.onload = function () {
        preview.src = reader.result;
        console.log("RESULT: " + reader.result)
        this.background = reader.result;
        console.log("PREVIEW11111: " + this.background)
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
    updateCardProperties(newCardTitle, newCardDescription) {
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

    saveMoveList(newBoardId) {
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var formdata = new FormData();
      formdata.append("current_board_id", this.board.id);
      formdata.append("new_board_id", newBoardId);
      formdata.append("list_id", this.currentListID);

      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      fetch(this.$API + "/move_list_to_another_board", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            this.showMoveList = false;
            this.loadContent();
          })
          .catch(error => console.log('error', error));
    },

    getArchivedItem() {
      this.showArchivedItems = true;
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);


      var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      };

      fetch(this.$API + "/get_boards_archieved_elements?board_id=" + this.board.id, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result.archieved_cards_from_list)
            console.log(result.archived_lists)
            this.archieved_cards_from_list = result.archieved_cards_from_list
            this.archived_lists = result.archived_lists
          })
          .catch(error => console.log('error', error));
    },
    async setLabelOnCard(color, active) {

      console.log("setLabel")
      console.log("list: " + this.currentListID)

      console.log("card: " + this.currentCardId)

      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);

      console.log("colors: " + this.colorCardArray)

      if (!active) {
        for (const i in this.colorCardArray) {
          console.log("from: " + this.colorCardArray[i])
          if (this.colorCardArray[i] === color) {
            this.colorCardArray.splice(i, 1);
            console.log("remove")
          }
        }
      }
      else {
        this.colorCardArray.push(color)
        console.log("push")
      }

      console.log("colors: " + this.colorCardArray)

      var formdata = new FormData();
      formdata.append("list_id", this.currentListID);
      formdata.append("card_id", this.currentCardId);
      formdata.append("card_label", JSON.stringify({'labels': this.colorCardArray}));

      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      await fetch("http://localhost:5000/set_card_label", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            this.loadContent();
          })
          .catch(error => console.log('error', error));

    },
    async getLabel() {
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      var requestOptions1 = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      };

      await fetch("http://localhost:5000/get_card_label?list_id=" + this.currentListID + "&card_id=" + this.currentCard.id, requestOptions1)
          .then(response => response.json())
          .then(result => {
            if (result.card_label != null) {
              this.colorCardArray = result.card_label;
              console.log("result label: " + this.colorCardArray);

              for (const i in this.colors) {
                this.colors[i].active = false;
              }
              for (const j in this.colorCardArray) {
                for (const i in this.colors) {
                  if (this.colors[i].color === this.colorCardArray[j]) {
                    this.colors[i].active = true;
                    console.log(this.colors[i])
                    console.log(this.colorCardArray[j])
                    console.log("true")
                  }
                }
              }
            }
            console.log(this.colors)
          })
          .catch(error => console.log('error', error));
    },
    clearColorsActive(){
      for (const i in this.colors) {
        this.colors[i].active = false;
      }
    }


  }
}

</script>

<style lang="scss" scoped>


section {
  height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
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

.image {
  float: right;
  margin-right: 300px;
  padding-top: 75px;
}

.moving-card {
  opacity: 0.5;
  background: #f7fafc;
}

ul {
  padding: 0px;
}

</style>