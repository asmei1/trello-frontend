<template>
  <section>
    <div class="full-control" style="padding-top: 200px">
      <div class="md-card" style="border-radius: 10px; border-width: 4px; width: 600px">
        <md-card-header>
          <div class="md-title" align="center" style="color: #0079bf; font-size: 40px;">Account activation
            successfully!
          </div>
        </md-card-header>
        <div>
          <md-button :to="{path: '/login'}" class="md-raised" style="color: white; background-color: #0079BF;">Login</md-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserActivation",
  data() {
    return {
      valid: false,
    }
  },
  beforeCreate() {
    fetch(this.$API + "/finalize/" + this.$route.params.token)
        .then(response => {
          if (response.status !== 200) {
            this.$router.push("/");
          }
        })
        .catch(error => console.log('error', error));
  },

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