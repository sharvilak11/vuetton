<template>
  <div id="app">
    <Vuetton
      text="Submit Data"
      type="submit"
      size="lg"
      custom-class="primary"
      :action="callApi"
      loader-text="Loading..."
      color="#d21211"
      @mouseover="toggleOn"
      @mouseout="toggleOff"
      ripple
      align-icon="right"
    >
      <i class="material-icons">save</i>
    </Vuetton>
    <div v-show="isToggle">
      <p>Toggle is on</p>
    </div>
  </div>
</template>

<script>
import Vuetton from './Vuetton';
import axios from 'axios';

export default {
  name: 'app',
  components: {
    Vuetton,
  },
  data() {
    return {
      isToggle: false,
      task: null
    }
  },
  methods: {
    async callApi(){
      let result = await axios.get('https://jsonplaceholder.typicode.com/todos/2');
      this.task = result.data;
    },
    toggleOn() {
      this.isToggle = true;
    },
    toggleOff() {
      this.isToggle = false;
    }
  }
}
</script>

<style lang="scss">
  @import './style';
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
i {
  font-size: 14px !important;
}
  .vtn {
    color: #fff;
  }
</style>
