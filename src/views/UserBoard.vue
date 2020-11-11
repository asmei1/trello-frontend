<template>
  <section>
    <div class="full-control">
      <md-toolbar class="md-transparent" style="width: 100%">
        <h3 class="md-title">{{ titleBoard }}</h3>
      </md-toolbar>

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
      titleBoard: ''
    }
  },
  created: async function () {
    this.titleBoard = this.$route.params.titleBoard
  }
}

</script>

<style scoped>

.full-control {
  display: flex;
  flex-wrap: wrap;
  padding-top: 100px;
  justify-content: left;
}

h3{
  font-family: "Segoe Print",serif;

}

.md-toolbar{
  justify-content: center;
}
</style>