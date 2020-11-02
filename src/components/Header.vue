<template>
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar style="background-color: #0079BF;">
        <span class="md-title" style="color: white;">Trello</span>
      </md-app-toolbar>
    </md-app>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    menuVisible: false
  })
}
</script>


<style lang="scss" scoped>


.md-app {
  border: 1px solid rgba(#0079BF, 1);
  height: 70px;
}

.md-title{
  font-family: "Segoe Print";
  font-size: 30px;
}


</style>

