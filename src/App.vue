<template>
  <div id="app">
    <Vuetton text="Sample" custom-class="primary" hover-class="primary-hover"></Vuetton>
  </div>
</template>

<script>
import Vuetton from './Vuetton';

export default {
  name: 'app',
  components: {
    Vuetton,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.primary {
  background-color: #e9e9e9;
}
.primary-hover {
  background-color: #ccc;
}
</style>
