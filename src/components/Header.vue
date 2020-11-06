<template>
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar style="background-color: #0079BF;">
        <span class="md-title" style="color: white;">Cripplello</span>
        <div class="md-toolbar-section-end">
          <md-button class="md-raised" style="color: white; background-color: #d94395;">Zarejestruj się</md-button>
          <md-button class="md-raised" style="color: white; background-color: #d94395;">Zaloguj się</md-button>
        </div>
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
}

.md-title{
  font-family: "Segoe Print";
  font-size: 32px;
  height: 32px;
}

.md-raised {
  border-radius: 10px;
  font-family: "Segoe Print";
}


</style>

