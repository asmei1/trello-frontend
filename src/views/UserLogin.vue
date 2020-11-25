<template>
  <section>
    <div class="full-control" style="padding-top: 200px">
      <div class="md-card" style="border-radius: 10px; border-width: 4px; width: 600px">
        <md-card-header>
          <div class="md-title" align="center" style="color: #0079bf; font-size: 40px;">Sign in</div>
        </md-card-header>

        <hr class="line1">
        <form name="userForm">
          <md-field>
            <label>Username</label>
            <md-input v-on:keyup.enter="signIn" v-model="username"></md-input>
            <span class="md-suffix"></span>
          </md-field>

          <md-field :md-toggle-password="false">
            <label>Password</label>
            <md-input v-on:keyup.enter="signIn" v-model="userPassword" type="password"></md-input>
          </md-field>
        </form>
        <md-button @click="signIn()" class="md-raised" style="color: white; background-color: #0079BF;">Sign in
        </md-button>
        <br>
        <br>
        <router-link to="/reset_password" style="text-decoration: none; color: inherit;">
          <span>Forget password?</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>


export default {
  name: "UserLogin",
  components: {},
  data() {
    return {
      username: '',
      userPassword: ''
    }
  },
  methods: {
    async signIn() {
      var headers = new Headers();
      var formdata = new FormData();
      formdata.append("username", this.username);
      formdata.append("password", this.userPassword);
      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
      };

      fetch(this.$API + "/login", requestOptions)
          .then(async response => {
            const data = await response.json();
            if (response.ok) {
              //in future we can get whole information about user here
              this.$store.commit('USER_LOGIN', {"username": this.username});
              this.$store.commit('USER_TOKEN', data.access_token);

              await this.$router.replace("/userHome");
            } else {
              alert("Invalid Email or Password");
            }
          })
          .catch(error => console.log('error', error));
    }
  }
}
</script>

<style scoped>
.full-control {
  width: auto;
  height: 100vh;
  font-family: "Segoe Print", serif;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('../assets/loginBackground.jpg');
  background-position: top left;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.md-card {
  height: auto;
  alignment: center;
  margin-left: auto;
  margin-right: auto;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.7);
}

.md-raised {
  width: 500px;
  border-radius: 20px;
  font-size: 20px;
  height: 50px;
}

hr.line1 {
  border-top: 1px solid #0079bf;
  width: 300px;
}


</style>
