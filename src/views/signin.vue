<template>
  <section class="section is-medium">
    <div class="signInContainer has-text-left">
      <b-field label="Email">
        <b-input v-model="email" type="email" placeholder="Email" maxlength="64"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input v-model="password" type="password" placeholder="Password"></b-input>
      </b-field>

      <b-button @click="doSignIn" class="mr-2" type="is-success">Sign In</b-button>
      <b-button @click="doRegister" type="is-primary">Sign Up</b-button>
      <register-user ref="registerUser"></register-user>
    </div>
  </section>
</template>

<script>
import http from '@/middleware/axios'
const registerUser = require('@/views/components/registerUser').default

export default {
  components: { registerUser },
  data: () => ({
    email: null,
    password: null
  }),
  methods: {
    doSignIn () {
      this.$libraries.users.doSignIn(this.email, this.password).then(success => {
        localStorage.setItem('token', success.token)
        http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
        this.$router.push({ path: '/home' })
      }).catch(_ => {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Failed to login',
          duration: 5000
        })
      })
    },
    doRegister () {
      this.$refs.registerUser.doOpen()
    }
  }
}
</script>
