<template>
  <section>
    <div class="full-control">
      <md-toolbar class="md-transparent" style="width: 100%">
        <h3 class="md-title" style="font-weight: bold; color: white">{{ titleBoard }}</h3>
      </md-toolbar>
      <div v-for="(list) in lists" v-bind:key="list.id">
        <div class="viewport">
          <md-toolbar :md-elevation="1">
            <span class="md-title">{{ list.id }}</span>
          </md-toolbar>
          <div v-for="(card) in list" v-bind:key="card.id">
            <md-list class="md-double-line">
              <md-list-item>
                <div class="md-list-item-text">
                  <span>{{ card }}</span>
                </div>
              </md-list-item>
              <md-divider></md-divider>
            </md-list>
          </div>
        </div>
      </div>
      <md-content class="md-scrollbar">

      </md-content>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserBoard",
  data() {
    return {
      titleBoard: '',
      lists: []
    }
  },
  created: async function () {
    this.titleBoard = this.$route.params.titleBoard
    var headers = new Headers();
    headers.append("Authorization", 'Bearer ' + this.$store.state.token);
    await fetch("http://localhost:5000/board_context?board_title=" + this.titleBoard, {headers: headers})
        .then(response => response.json())
        .then(result => {
          this.lists = result
          console.log(this.lists)
        })
        .catch(error => console.log('error', error));


    // let response = await fetch(`http://localhost:5000/board_context?board_title=`+ this.titleBoard);
    // let data = await response.json();
    // this.lists = data
    // console.log(this.lists)
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
  line-height: 40px;
}

.md-toolbar{
  justify-content: center;
}
.viewport{
  width: 300px;
  margin: 20px;
}
</style>