<template>
  <test msg = "TEST-SHEET"/>
  <sheet />
</template>

<script>
import test from './components/test.vue'
import sheet from './components/sheet.vue'
export default {
  name: 'App',
  components: {
    test,
    sheet
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
