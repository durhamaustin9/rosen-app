<template>
  <section>
    <b-loading :is-full-page="true" v-model="loading" :can-cancel="false" ></b-loading>

    <b-modal :active="open" has-modal-card trap-focus :can-cancel="false">
      <div class="modal-card p4">
        <section class="modal-card-body has-text-left">
          <b-field label="First Name" class="mt-1" >
            <b-input v-model="contact.firstName"  maxlength="32"></b-input>
          </b-field>
          <b-field label="Last Name" class="mt-1">
            <b-input v-model="contact.lastName" maxlength="32"></b-input>
          </b-field>
          <b-field label="Email" class="mt-1">
            <b-input v-model="contact.email"  maxlength="64"></b-input>
          </b-field>
          <b-field label="Phone Number" class="mt-1">
            <b-input v-model="contact.phone" maxlength="10"></b-input>
          </b-field>
          <b-field label="Street Address" class="mt-1">
            <b-input v-model="contact.streetAddress"></b-input>
          </b-field>
          <b-field label="Zip Code" class="mt-1">
            <b-input v-model="contact.zip" maxlength="5"></b-input>
          </b-field>
          <b-field label="State" class="mt-1">
            <b-input v-model="contact.state" maxlength="2"></b-input>
          </b-field>
          <b-field label="Notes" class="mt-1">
            <b-input v-model="contact.notes" type="textarea"></b-input>
          </b-field>
          <b-button @click="doClose()" class="mr-1" type="is-info">Cancel</b-button>
          <b-button @click="createContact()" class="ml-1" type="is-success">Create Contact</b-button>
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
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      streetAddress: '',
      zip: '',
      state: '',
      notes: ''
    }
  }),
  methods: {
    createContact () {
      this.loading = true
      this.$libraries.contacts.doCreateContact(this.contact).then(_ => {
        this.open = false
        this.doReset()

        this.$buefy.toast.open({
          type: 'is-success',
          message: 'Successfully created contact',
          duration: 3000
        })

        this.$root.$emit('updateContactList')
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
      this.doReset()
      this.open = false
    },
    doReset () {
      this.contact = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        streetAddress: '',
        zip: '',
        state: '',
        notes: ''
      }
    }
  },
  mounted () {
    this.$root.$on('createContact', () => {
      this.open = true
    })
  }
}
</script>

<style scoped >
.modal-card { width: 30em!important; }
</style>
