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
                  <md-input v-model="username" ></md-input>
                  <span class="md-suffix"></span>
                </md-field>

                <md-field :md-toggle-password="false">
                  <label>Password</label>
                  <md-input v-model="userPassword" type="password"></md-input>
                </md-field>
              </form>
              <md-button @click="signIn()" class="md-raised" style="color: white; background-color: #0079BF;">Sign in</md-button>
            </div>
    </div>
  </section>
</template>

<script>


export default {
  name: "UserLogin",
  components: {

  },
  data() {
    return {
      username: '',
      userPassword: ''
    }
  },
  methods:{
  async signIn(){
    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username: this.username, password: this.userPassword})
    };


    const response = await fetch("http://localhost:5000/login", requestOptions);
    const token = await response.json();
    // console.log(token)

    const requestTokenOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'My-Custom-Header': 'foobar'
      },
      body: JSON.stringify({ title: 'Vue POST Request Example' })
    };
    fetch('http://localhost:5000/login', requestTokenOptions)
        .then(response => response.json())
        .then(data => this.postId = data.id);

  }
  }
}
</script>

<style scoped>
.full-control {
  width: auto;
  height: 100vh;
  font-family: "Segoe Print",serif;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('../assets/abstractBackground.jpg');
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

.md-raised{
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