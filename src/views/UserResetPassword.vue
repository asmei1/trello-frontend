<template>
  <section>
    <div class="full-control" style="padding-top: 200px">
      <div class="md-card" style="border-radius: 10px; border-width: 4px; width: 600px">
        <md-card-header>
          <div class="md-title" align="center" style="color: #0079bf; font-size: 40px;">Password reset</div>
        </md-card-header>
        <div :key="resetToken" v-if="!isResetTokenSet()">
          <hr class="line1">
          <form name="userForm">
            <md-field>
              <label>Email</label>
              <md-input v-on:keyup.enter="sendResetRequest" v-model="email"></md-input>
              <span class="md-suffix"></span>
            </md-field>
            <div :key="wasResetRequestSend" v-if="wasResetRequestSend">
              <md-field>
                <label>Email with password reset was send!</label>
              </md-field>
            </div>
          </form>
          <md-button @click="sendResetRequest()" class="md-raised" style="color: white; background-color: #0079BF;">
            Reset
          </md-button>
        </div>
        <div :key="resetToken" v-else>
          <hr class="line1">
          <form name="userForm">
            <md-field>
              <label>New password</label>
              <md-input v-on:keyup.enter="sendResetRequest" v-model="password" type="password"></md-input>
              <span class="md-suffix"></span>
            </md-field>
            <md-field>
              <label>Repeat password</label>
              <md-input v-on:keyup.enter="sendResetRequest" v-model="repeat_password" type="password"></md-input>
              <span class="md-suffix"></span>
            </md-field>
          </form>
          <md-button @click="tryChangePassword()" class="md-raised" style="color: white; background-color: #0079BF;">
            Reset
          </md-button>
          <div :key="passwordWasChanged" v-if="passwordWasChanged">
            <md-field>
              <label>Password was changed</label>
            </md-field>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserResetPassword",
  data() {
    return {
      resetToken: "",
      email: "",
      password: "",
      repeat_password: "",
      wasResetRequestSend: false,
      passwordWasChanged: false,
    }
  },
  created() {
    if(this.$route.query.reset_token !== undefined){
      this.resetToken = this.$route.query.reset_token;
    }else{
      this.resetToken = "";
    }
  },
  methods: {
    isResetTokenSet(){
      return this.resetToken.length > 0;
    },
    async sendResetRequest() {
      var headers = new Headers();
      var formdata = new FormData();
      formdata.append("email", this.email);
      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
      };

      await fetch(this.$API + "/try_to_reset_pass", requestOptions)
          .then(async response => {
            if (response.ok) {
              this.wasResetRequestSend = true;
            }
          })
          .catch(error => console.log('error', error));
    },
    async tryChangePassword(){
      var headers = new Headers();
      var formdata = new FormData();
      formdata.append("email", this.email);
      formdata.append("new_password", this.password);
      formdata.append("repeated_password", this.repeat_password);
      formdata.append("reset_token", this.resetToken);
      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
      };

      await fetch(this.$API + "/reset_password", requestOptions)
          .then(async response => {
            if (response.ok) {
              this.passwordWasChanged = true;
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