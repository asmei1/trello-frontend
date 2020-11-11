<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar style="background-color: #0079BF;">
      <router-link to="/" style="text-decoration: none; color: inherit;">
        <span class="md-title" style="color: white;">Cripplello</span>
      </router-link>
      <div class="md-toolbar-section-end">
<!--        <template v-if="isUserLogIn">-->
<!--          <span class="md-title" style="color: white; font-size: 20px">{{ this.$store.state.user.username }}</span>-->
<!--          <md-button @click="logout()" class="md-raised" style="color: white; background-color: #d94395;">Logout-->
<!--          </md-button>-->
<!--        </template>-->
        <template v-if="isUserLogIn">
          <div class="separator">
            <md-menu md-direction="top-end" :mdCloseOnClick="closeOnClick" :mdCloseOnSelect="closeOnSelect">

            <md-button md-menu-trigger class="md-icon-button" style="color: white">{{this.$store.state.user.username.charAt(0)}}</md-button>
            <md-menu-content>
              <router-link to="/userHome" style="text-decoration: none; color: white; font-family: 'Segoe Print',serif">
                <md-menu-item @click="data = 'click 1'">Home</md-menu-item>
              </router-link>
              <md-menu-item @click="logout()" class="md-raised">Logout</md-menu-item>
            </md-menu-content>
            </md-menu>
          </div>
        </template>
        <template v-else>
          <md-button class="md-raised" style="color: white; background-color: #d94395;">Register</md-button>
          <md-button :to="{path: '/login'}" class="md-raised" style="color: white; background-color: #d94395;">Login
          </md-button>
        </template>
      </div>
    </md-app-toolbar>
  </md-app>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    user: null,
    closeOnClick: false,
    closeOnSelect: true
  }),
  computed:{
    isUserLogIn(){
      return this.user;
    }
  },
  methods:{
    logout: async function () {
      this.$store.commit('USER_LOGOUT');
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      await fetch("http://localhost:5000/logout", {headers: headers, method: "POST"})
          .then(response => response.json())
          .then(() => {
            this.$router.push("/");
          })
          .catch(error => console.log('error', error));

    }
  },
  created() {
    this.user = this.$store.state.user;
  },
  watch:{
    '$store.state.user'(user) {
      this.user = this.$store.state.user;
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

.md-icon-button{
  background-color: darkgray;
  font-size: 20px;
  font-family: "Segoe Print",serif;
  font-weight: bold;
}

</style>

