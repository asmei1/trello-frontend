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
            <md-menu md-direction="end" :mdCloseOnClick="closeOnClick" :mdCloseOnSelect="closeOnSelect">
              <md-button md-menu-trigger class="md-icon-button" style="color: white">
                {{ this.$store.state.user.username.charAt(0) }}
              </md-button>
              <md-menu-content>
                <router-link to="/userHome"
                             style="text-decoration: none; color: white; font-family: 'Segoe Print',serif">
                  <md-menu-item @click="data = 'click 1'">Home</md-menu-item>
                </router-link>
                <md-menu-item :to="{path: '/userEdit'}" class="md-raised">Settings</md-menu-item>
                <md-menu-item @click="logout()" class="md-raised">Logout</md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </template>
        <template v-else>
          <md-button :to="{path: '/registration'}" class="md-raised" style="color: white; background-color: #d94395;">Register</md-button>
          <md-button :to="{path: '/login'}" class="md-raised" style="color: white; background-color: #d94395;">Login
          </md-button>
        </template>
      </div>
    </md-app-toolbar>
  </md-app>
</template>

<script>

import store from "@/store";

export default {
  name: 'Header',
  data: () => ({
    user: null,
    closeOnClick: false,
    closeOnSelect: true,
    background_token_checking: null,
  }),
  computed: {
    isUserLogIn() {
      return this.user;
    }
  },
  created() {
    this.user = this.$store.state.user;
  },
  methods: {
    checkIfTokenIsStillActive: async function () {
      const token = store.state.token;
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + token);
      const response = await fetch(this.$API + "/check_user_activity", {headers: headers, method: "GET"});
      const data = await response.json();
      if (token !== "" && data.status_code === 401) {
        console.log("should send")
        const refreshResponse = await fetch(this.$API + "/refresh_token", {headers: headers, method: "POST"});
        const refreshData = await refreshResponse.json();
        if (refreshResponse.ok) {
          console.log("Auth token refresh");
          store.commit('USER_TOKEN', refreshData.access_token);
        } else {
          console.log("Cannot refresh your auth token!");
          store.commit('USER_LOGOUT');
          this.$router.push("/");
        }
      }
    },
    checkIfTokenIsStillActiveWorker: function () {
      this.background_token_checking = setInterval(this.checkIfTokenIsStillActive, 5000);
    },
    logout: async function () {
      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.$store.state.token);
      await fetch(this.$API + "/logout", {headers: headers, method: "POST"})
          .then(response => response.json())
          .then(() => {
            this.$store.commit('USER_LOGOUT');
            this.$router.push("/");
          })
          .catch(error => console.log('error', error));

    }
  },
  mounted() {
    this.user = this.$store.state.user;
    this.checkIfTokenIsStillActive();
    this.checkIfTokenIsStillActiveWorker();
  },
  beforeDestroy() {
    clearInterval(this.background_token_checking)
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
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

.md-icon-button {
  background-color: darkgray;
  font-size: 20px;
  font-family: "Segoe Print", serif;
  font-weight: bold;
}

</style>

