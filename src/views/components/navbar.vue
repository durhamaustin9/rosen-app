<template>
  <section>
  <b-navbar shadow :class="visible ? '' : 'hidden'">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/logo.png" alt="logo">
      </b-navbar-item>
    </template>
    <template #end v-if="signedIn" class="navbar-end">
      <b-button class="mt-auto mb-auto mr-2 is-primary" @click="createContact()" type="is-primary" icon-right="plus">Create</b-button>
      <b-button class="mt-auto mb-auto is-primary" @click="signOut()" type="is-danger">Sign Out</b-button>
    </template>
  </b-navbar>
  </section>
</template>

<script>
export default {
  data: () => ({
    visible: false,
    signedIn: false
  }),
  methods: {
    signOut: function () {
      localStorage.clear()
      this.$router.push({ path: '/signin' })
    },
    createContact () {
      this.$root.$emit('createContact')
    }
  },
  mounted () {
    this.visible = this.$route.meta.navbar
    this.signedIn = !!(localStorage.getItem('token'))
  },
  watch: {
    $route: function (to, from) {
      this.visible = to.meta.navbar
      this.signedIn = !!(localStorage.getItem('token'))
    }
  }
}
</script>
