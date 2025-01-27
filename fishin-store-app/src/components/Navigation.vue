<template>
    <div class="navigation">
      <h1>{{ msg }}</h1>
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavigationSite',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  