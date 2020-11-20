<template>
  <section>
    <div class="full-control" style="padding-top: 200px">
      <div class="md-card" style="border-radius: 10px; border-width: 4px; width: 600px">
        <md-card-header>
          <div class="md-title" align="center" style="color: #0079bf; font-size: 40px;">Registration</div>
        </md-card-header>

        <hr class="line1">
        <form name="userForm">
          <md-field>
            <label>Username</label>
            <md-input v-on:keyup.enter="signIn" v-model="username"></md-input>
            <span class="md-suffix"></span>
          </md-field>

          <md-field>
            <label>Email</label>
            <md-input v-on:keyup.enter="signIn" v-model="email"></md-input>
            <span class="md-suffix"></span>
          </md-field>

          <md-field :md-toggle-password="false">
            <label>Password</label>
            <md-input v-on:keyup.enter="signIn" v-model="userPassword" type="password"></md-input>
          </md-field>

          <template v-if="duplicatedUser">
            <md-field>
              <label style="color:red">User name or email exists, please, change it!</label>
            </md-field>
          </template>
          <div :key="tooShortPassword" v-if="tooShortPassword">
            <md-field>
              <label style="color:red">Password is too short, please, change it!</label>
            </md-field>
          </div>
        </form>
        <md-button @click="register()" class="md-raised" style="color: white; background-color: #0079BF;">Sign in
        </md-button>
      </div>
    </div>
  </section>
</template>

<script>


export default {
  name: "UserRegistration",
  components: {},
  data() {
    return {
      username: '',
      email: '',
      userPassword: '',
      duplicatedUser: false,
      tooShortPassword: false,
    }
  },
  methods: {
    async register() {
      this.tooShortPassword = this.userPassword.length < 8;
      if(this.tooShortPassword){
        return;
      }


      var headers = new Headers();
      var formdata = new FormData();
      formdata.append("username", this.username);
      formdata.append("email", this.email);
      formdata.append("password", this.userPassword);
      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
      };

      fetch(this.$API + "/register", requestOptions)
          .then(async response => {
            if (response.status === 409) {
              this.duplicatedUser = true;
            } else if (response.ok) {
              this.duplicatedUser = false;
              alert("Confirmation mail was send!");
            } else {
              alert("There was some error during registration process.\nPlease, try again later!");
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
