<template>
  <section>
    <div class="full-control">
      <h1>Do you want to easily plan your work?</h1>
      <div class="image">
        <img
            src="https://miro.medium.com/max/1126/1*UaZKTtSbz0EkoHL4FSsVvQ@2x.png" style="height: 400px;">
      </div>
    </div>
    <div class="full-control1">
      <div class="image1">
        <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg">
      </div>
      <h11 style="color: #0079BF;">Use Cripplello!</h11>
    </div>
    <div class="full-control2">
      <div>
        <h12 style="color: #0079BF;">Don't have an account? Register for free !</h12>
      </div>
      <div>
        <md-button class="md-raised" style="color: white; background-color: #0079BF;">Register</md-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
}
</script>

<style lang="scss" scoped>
.full-control {
  width: auto;
  height: 600px;
  background: linear-gradient(180deg, #0079bf, #eca3cb) no-repeat top left;
  background-size: cover;
}

.full-control1 {
  width: auto;
  height: 700px;
  background: linear-gradient(180deg, #eca3cb, #ffffff) no-repeat top left;
  background-size: cover;
}

.full-control2 {
  width: auto;
  height: 200px;
  background: white no-repeat top left;
  background-size: cover;
  margin-right: auto;
  text-align: center;
  display: block;

}

.md-fixed {
  position: fixed;
  width: 100%;
  float: top;
}

.image {
  float: right;
  margin-right: 300px;
  padding-top: 75px;
}

.image1 {
  float: left;
  margin-left: 300px;
  padding-top: 0px;
}

.image2 {
  padding-top: 70px;
  alignment: center;

}

h1 {
  padding-top: 200px;
  color: white;
  width: 600px;
  font-size: 40px;
  height: 400px;
  margin-left: 300px;
  float: left;
  line-height: 45px;
  font-family: "Segoe Print";
}

h11 {
  padding-top: 150px;
  color: white;
  width: 600px;
  font-size: 40px;
  height: 400px;
  margin-right: 300px;
  float: right;
  line-height: 45px;
  font-family: "Segoe Print";
}

h12 {
  padding-top: 200px;
  color: white;
  font-size: 40px;
  line-height: 45px;
  font-family: "Segoe Print";
}

.md-raised {
  margin-top: 50px;
  width: 500px;
  border-radius: 20px;
  font-size: 20px;
  height: 50px;
  font-family: "Segoe Print";
}

md-card {
  margin-right: auto;
  margin-left: auto;
}
</style>