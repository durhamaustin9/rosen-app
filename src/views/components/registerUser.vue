<template>
  <section>
    <b-loading :is-full-page="true" v-model="loading" :can-cancel="false"></b-loading>

    <b-modal :active="open" has-modal-card trap-focus :can-cancel="false">
      <div class="modal-card p4 has-text-left" style="padding: 20px">
        <section class="modal-card-body has-text-left">
          <b-field label="First Name" class="mt-1">
            <b-input v-model="user.firstName" maxlength="32"></b-input>
          </b-field>
          <b-field label="Last Name" class="mt-1">
            <b-input v-model="user.lastName" maxlength="32"></b-input>
          </b-field>
          <b-field label="Email" class="mt-1">
            <b-input v-model="user.email" maxlength="64"></b-input>
          </b-field>
          <b-field label="Password" class="mt-1">
            <b-input v-model="user.password" type="password" password-reveal></b-input>
          </b-field>
          <b-button @click="doClose()" class="mr-1" type="is-primary">Close</b-button>
          <b-button v-on:click="registerUser()" class="ml-1" type="is-success">Sign Up</b-button>
        </section>
      </div>
    </b-modal>
  </section>
</template>

<script>
export default {
  data: () => ({
    open: false,
    loading: false,
    user: {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    }
  }),
  methods: {
    doOpen () {
      this.open = true
    },
    registerUser () {
      this.loading = true
      this.$libraries.users.doRegisterUser(this.user).then(_ => {
        this.$buefy.toast.open({
          type: 'is-success',
          message: 'Successfully registered',
          duration: 3000
        })

        this.open = false
      }).catch(_ => {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Failed to Save contact',
          duration: 3000
        })

        this.open = true
      }).finally(_ => {
        this.loading = false
      })
    },
    doClose () {
      this.open = false
    }
  }
}
</script>
