<template>
  <section>
    <div class="full-control" style="padding-top: 200px">
      <div class="md-card" style="border-radius: 10px; border-width: 4px; width: 600px">
        <md-card-header>
          <div class="md-title" align="center" style="color: #0079bf; font-size: 40px;">User profile edition</div>
        </md-card-header>

        <hr class="line1">
        <form name="userForm">
          <md-field>
            <label>Username</label>
            <md-input v-on:keyup.enter="register" :disabled="true" v-model="username"></md-input>
            <span class="md-suffix"></span>
          </md-field>


          <md-field :md-toggle-password="true">
            <label>Old password</label>
            <md-input v-on:keyup.enter="confirmUserEdit" v-model="oldPassword" type="password"></md-input>
          </md-field>

          <md-field :md-toggle-password="true">
            <label>New password</label>
            <md-input v-on:keyup.enter="confirmUserEdit" v-model="newPassword" type="password"></md-input>
          </md-field>

          <md-field :md-toggle-password="true">
            <label>Repeat new password</label>
            <md-input v-on:keyup.enter="confirmUserEdit" v-model="repeatedNewPassword" type="password"></md-input>
          </md-field>

          <div :key="tooShortPassword" v-if="tooShortPassword">
            <md-field>
              <label style="color:red">Password is too short, please, change it!</label>
            </md-field>
          </div>
          <div :key="ok" v-if="ok">
            <md-field>
              <label>Ok!</label>
            </md-field>
          </div>
          <div :key="error" v-if="error">
            <md-field>
              <label style="color:red">{{ errString }}</label>
            </md-field>
          </div>
        </form>
        <md-button @click="confirmUserEdit" class="md-raised" style="color: white; background-color: #0079BF;">Confirm
          data
        </md-button>
      </div>
    </div>
  </section>
</template>

<script>


import store from "@/store";

export default {
  name: "UserEdit",
  components: {},
  data() {
    return {
      error: false,
      errString: "",
      ok: false,
      username: "",
      oldPassword: "",
      newPassword: "",
      repeatedNewPassword: "",
      tooShortPassword: false
    }
  },
  created() {
    this.username = this.$store.state.user.username;
  },
  methods: {
    async confirmUserEdit() {
      this.tooShortPassword = this.newPassword.length < 8;
      if (this.tooShortPassword) {
        return;
      }


      const headers = new Headers();
      headers.append("Authorization", 'Bearer ' + store.state.token);
      var formdata = new FormData();

      formdata.append("old_password", this.oldPassword);
      formdata.append("new_password", this.newPassword);
      formdata.append("repeated_password", this.repeatedNewPassword);

      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
      };

      const response = await fetch(this.$API + "/change_password", requestOptions);
      const data = await response.json();
      this.error = false;
      this.ok = false;
      if (!response.ok) {
        this.error = true;
        this.ok = false;
        this.errString = data.errString;
      } else {
        this.ok = true;

      }

      console.log(data);

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
