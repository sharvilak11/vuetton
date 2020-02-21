<template>
  <div id="app">
    <Vuetton 
      text="Submit Data" 
      type="submit"
      size="sm"
      custom-class="primary" 
      hover-class="primary-hover" 
      :action="callApi"
      :async="true"
      loader-text="Loading..."
      loader-image="@/assets/loader.svg"
      @mouseover="toggleOn"
      @mouseout="toggleOff"
    >
      <i class="material-icons">submit</i>
    </Vuetton>
  </div>
</template>

<script>
import Vuetton from './Vuetton';

export default {
  name: 'app',
  components: {
    Vuetton,
  },
  methods: {
    callApi(){
      window.alert('Helloooooo');
    },
    toggleOn() {

    },
    toggleOff() {

    }
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
