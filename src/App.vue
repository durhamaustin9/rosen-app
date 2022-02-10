<template>
  <div class="app" id="app">
    <navbar/>
    <router-view class="container"/>
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
