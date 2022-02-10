<template>
  <section>
    <b-loading :is-full-page="true" v-model="loading" :can-cancel="false"></b-loading>

    <b-modal :active="open" has-modal-card trap-focus :can-cancel="false" style="z-index: 1000">
      <div class="modal-card p4" style="max-width: 300px">
        <section class="modal-card-body">
          <b-button @click="doClose()" class="mr-1" type="is-primary">Cancel</b-button>
          <b-button @click="deleteContact()" class="ml-1" type="is-success">Delete Contact</b-button>
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
      id: 0
    }
  }),
  methods: {
    doOpen (contactId) {
      this.open = true
      this.loading = true
      this.contact.id = contactId
    },
    deleteContact () {
      this.$libraries.contacts.doDeleteContact(this.contact.id).then(_ => {
        this.$buefy.toast.open({
          type: 'is-success',
          message: 'Contact deleted',
          duration: 3000
        })
        this.$root.$emit('updateContactList')
        this.doClose()
      }).catch(error => {
        console.log(error)
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Failed to delete contact',
          duration: 3000
        })
      })
    },
    doClose () {
      this.loading = false
      this.open = false
    }
  }
}
</script>
