<template>
    <div class="main">
      <h1>{{ msg }}</h1>
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainSite',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  