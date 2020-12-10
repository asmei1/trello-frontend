<template>
  <div>
    <md-content class="md-scrollbar">
      <md-card md-with-hover style="background-color: #008000">
        <md-ripple class="md-toolbar-section-end">
          <md-card-header class="md-toolbar-section-start">
            <div class="md-title" style="color: white">#008000</div>
          </md-card-header>
          <div>
            <md-icon class="md-size-2x" style="margin-right: 30px; color: white">check</md-icon>
          </div>
        </md-ripple>
      </md-card>
      <md-card md-with-hover style="background-color: #FFD700">
        <md-ripple class="md-toolbar-section-end">
          <md-card-header class="md-toolbar-section-start">
            <div class="md-title" style="color: white">#FFD700</div>
          </md-card-header>
        </md-ripple>
      </md-card>
      <md-card md-with-hover style="background-color: #FF6600">
        <md-ripple class="md-toolbar-section-end">
          <md-card-header class="md-toolbar-section-start">
            <div class="md-title" style="color: white">#000fff</div>
          </md-card-header>
        </md-ripple>
      </md-card>
      <md-card md-with-hover style="background-color: #FF0000">
        <md-ripple class="md-toolbar-section-end">
          <md-card-header class="md-toolbar-section-start">
            <div class="md-title" style="color: white">#FF0000</div>
          </md-card-header>
        </md-ripple>
      </md-card>
      <md-card md-with-hover style="background-color: #FF00AF">
        <md-ripple class="md-toolbar-section-end">
          <md-card-header class="md-toolbar-section-start">
            <div class="md-title" style="color: white">#FF00AF</div>
          </md-card-header>
        </md-ripple>
      </md-card>
      <md-card md-with-hover style="background-color: #FF00FF">
        <md-ripple class="md-toolbar-section-end">
          <md-card-header class="md-toolbar-section-start">
            <div class="md-title" style="color: white">#FF00FF</div>
          </md-card-header>
        </md-ripple>
      </md-card>
      <md-card md-with-hover style="background-color: #0047AB">
        <md-ripple class="md-toolbar-section-end">
          <md-card-header class="md-toolbar-section-start">
            <div class="md-title" style="color: white">#0047AB</div>
          </md-card-header>
        </md-ripple>
      </md-card>
      <md-card md-with-hover style="background-color: #000000">
        <md-ripple class="md-toolbar-section-end">
          <md-card-header class="md-toolbar-section-start">
            <div class="md-title" style="color: white">#000000</div>
          </md-card-header>
        </md-ripple>
      </md-card>
    </md-content>
  </div>
</template>

<script>
export default {
  name: "ColorSelection",
  data() {
    return {
      colors: ['#008000', '#FFD700', '#FF6600', '#FF0000', '#FF00AF', '#FF00FF', '#0047AB', '#000000']
    }

    }
}
</script>

<style scoped>

.md-card {
  margin: 10px;
  width: 600px;
  border-radius: 10px;
}

.md-content {
  max-width: 800px;
  max-height: 200px;
  overflow: auto;
  display: inline-block;
  vertical-align: top;
}
</style>