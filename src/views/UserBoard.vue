<template>
  <section>
    <div class="full-control">
      <md-dialog :md-active.sync="showDialogList">
        <md-dialog-title>Add new list</md-dialog-title>
        <md-tab md-label="General">
          <md-field>
            <label>Title</label>
            <md-input v-model="newListTitle" ></md-input>
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
            <md-input v-model="newCardTitle" ></md-input>
          </md-field>
        </md-tab>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogCard = false">Cancel</md-button>
          <md-button class="md-primary" @click="addList(newCardTitle, cardName)">Add</md-button>
        </md-dialog-actions>
      </md-dialog>
      <md-toolbar class="md-transparent" style="width: 100%">
        <h3 class="md-title" style="font-weight: bold; color: white">{{ titleBoard }}</h3>
      </md-toolbar>
      <div v-for="(list, key) in lists" v-bind:key="list.id">
        <div class="viewport">
          <md-toolbar :md-elevation="1">
            <span class="md-title">{{ key }}</span>
          </md-toolbar>
          <div v-for="(card) in list" v-bind:key="card.id">
            <md-list class="md-double-line">
              <md-list-item>
                <div class="md-list-item-text">
                  <span>{{ card }}</span>
                </div>
                <md-button class="md-icon-button">
                  <md-icon>edit</md-icon>
                </md-button>
              </md-list-item>
              <md-divider></md-divider>
            </md-list>
          </div>
          <md-list class="md-double-line">
            <md-list-item style="margin-right: auto; margin-left: auto;">
            <md-button @click="showDialogCard = true" class="md-icon-button" style="color: white; background-color: #d94395;">
              <md-icon style="color: white;">add</md-icon>
            </md-button>
            </md-list-item>
          </md-list>
        </div>
      </div>
      <div>
        <md-button @click="showDialogList = true" class="md-raised" style="color: white; background-color: #d94395;">Add list</md-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserBoard",
  data() {
    return {
      titleBoard: '',
      lists: [],
      cardName: '',
      listName: '',
      showDialogList: false,
      showDialogCard: false,
    }
  },
  created: async function () {
    this.titleBoard = this.$route.params.titleBoard
    await fetch("http://localhost:5000/board_context?board_title=" + this.titleBoard)
        .then(response => response.json())
        .then(result => {
          this.lists = result
          console.log(this.lists)
        })
        .catch(error => console.log('error', error));
  },
  methods: {
    addList(listName) {
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      this.showDialogList = false;
      var formdata = new FormData();
      formdata.append("board_title", this.titleBoard);
      formdata.append("new_list_title", listName);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        header: headers
      };
      fetch("http://127.0.0.1:5000/add_list", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.$router.go();
            } else {
              alert("Can not add new table");
            }
          })
          .catch(error => console.log('error', error));
    },

    addCard(cardName){
      this.showDialogCard = false;
      var formdata = new FormData();
      formdata.append("list_name", cardName);
      formdata.append("board_name", this.titleBoard);
      formdata.append("username", this.$store.state.user.username);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:5000/add_card", requestOptions)
          .then(response => {
            console.log(response.ok)
            if (response.ok) {
              this.$router.go();
            } else {
              alert("Can not add new table");
            }
          })
          .catch(error => console.log('error', error));
    }
  }
}

</script>

<style scoped>

section{
  height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('../assets/userBoardBackground.jpg');
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
}

h3{
  font-family: "Segoe Print",serif;
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

.md-toolbar{
  justify-content: center;
}
.viewport{
  width: 300px;
  margin: 20px;
}

.md-double-line{
  justify-content: center;
}
</style>