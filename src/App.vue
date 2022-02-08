<template>
  <div class="app" id="app">
    <navbar />
    <router-view class="container" />
  </div>
</template>

<script>
const navbar = require('@/views/components/navbar').default

export default {
  components: {
    navbar
  },
  data: () => ({
    signedIn: false
  })
}
</script>

<style lang="scss">
body, html {
  min-width: 490px;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.modal-close {
  display: none !important;
}
</style>
