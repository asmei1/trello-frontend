<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar style="background-color: #0079BF;">
      <router-link to="/" style="text-decoration: none; color: inherit;">
        <span class="md-title" style="color: white;">Cripplello</span>
      </router-link>
      <div class="md-toolbar-section-end">
        <div v-if="isUserLogged">
          <md-label>Welcome {{ this.user.username }}</md-label>
          <md-button :to="{path: '/logout'}" class="md-raised" style="color: white; background-color: #d94395;">Logout
          </md-button>
        </div>
        <div v-else>
          <md-button class="md-raised" style="color: white; background-color: #d94395;">Register</md-button>
          <md-button :to="{path: '/login'}" class="md-raised" style="color: white; background-color: #d94395;">Login
          </md-button>
        </div>
      </div>
    </md-app-toolbar>
  </md-app>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    user: null
  }),
  computed:{
    isUserLogged(){
      return this.user;
    }
  },
  mounted() {
    this.user = this.$store.state.user;
  },
  watch:{
    '$store.state.user'(user) {
      console.log(user);
      this.user = user;
    }
  }
}

</script>


<style lang="scss" scoped>


.md-app {
  border: 1px solid rgba(#0079BF, 1);
}

.md-title {
  font-family: "Segoe Print", serif;
  font-size: 32px;
  height: 32px;
}

.md-raised {
  border-radius: 10px;
  font-family: "Segoe Print", serif;
}

</style>

