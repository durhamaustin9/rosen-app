<template>
  <section>
    <b-loading :is-full-page="true" v-model="loading" :can-cancel="false"></b-loading>
    <div class="columns">
      <b-tabs class="ml-2 column customClass" size="is-medium" vertical v-model="activeTab" :animated="false" type="is-boxed" v-if="this.contacts.length !== 0">
        <b-tab-item :label="`${contact.firstName} ${contact.lastName}`" v-for="contact in contacts" :key="contact.id" style="height: 76.5%; margin-top: 1.5rem">
          <div>
            <div class="card-container">
              <div class="card is-flex columns">
                <div class="has-text-left column is-half m-3">
                  <div class="card-subtext mb-4">
                    <p class="title is-5">Name</p>
                    <p class="subtitle is-6 pt-1">{{ contact.firstName + " " + contact.lastName }}</p>
                  </div>
                  <div class="card-subtext mb-4">
                    <p class="title is-5">Phone</p>
                    <p class="subtitle is-6 pt-1">{{ contact.phone }}</p>
                  </div>
                  <div class="card-subtext mb-4">
                    <p class="title is-5">Email</p>
                    <p class="subtitle is-6 pt-1">{{ contact.email }}</p>
                  </div>
                  <div class="card-subtext mb-4">
                    <p class="title is-5">Address</p>
                    <p class="subtitle is-6 pt-1 mb-0">{{ contact.streetAddress }}</p>
                    <p class="subtitle is-6">{{ contact.city + " " + contact.state + " " + contact.zip }}</p>
                  </div>
                  <div class="card-subtext mb-4">
                    <p class="title is-5">Notes</p>
                    <p class="subtitle is-6 pt-1">{{ contact.notes }}</p>
                  </div>
                </div>
                <div class="card-button-container column">
                  <div class="columns is-mobile ml-auto">
                    <span class="column mt-auto ml-auto mb-2"><b-button class="" @click="updateContact(contact.id)" type="is-primary" icon-right="pen-clip">Update</b-button></span>
                    <span class="column mt-auto mb-2 pl-0 pr-0"><b-button class="" @click="deleteContact(contact.id)" type="is-danger" icon-right="trash-can"></b-button></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
      <div class="column" v-else>No Contacts</div>
      <div style="display: contents" class="column">
        <Map ref="map" class="mr-1"></Map>
      </div>
    </div>
    <update-contact ref="updateContact"/>
    <create-contact/>
    <confirm-delete ref="confirmDelete"/>
  </section>
</template>

<script>
const Map = require('@/views/components/map').default
const updateContact = require('@/views/components/updateContact').default
const createContact = require('@/views/components/createContact').default
const confirmDelete = require('@/views/components/confirmDelete').default

export default {
  components: { Map, updateContact, createContact, confirmDelete },
  data: () => ({
    loading: false,
    contacts: [],
    activeTab: 0
  }),
  methods: {
    getContacts () {
      this.loading = true
      this.$libraries.contacts.doGetContacts().then(success => {
        this.contacts = success.data
        this.flyToAddress()
      }).catch(error => {
        console.log(error)
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Failed to load contacts',
          duration: 3000
        })
      }).finally(_ => {
        this.loading = false
      })
    },
    updateContact (contactId) {
      this.$refs.updateContact.doOpen(contactId)
    },
    deleteContact (contactId) {
      this.$refs.confirmDelete.doOpen(contactId)
    },
    flyToAddress () {
      if (this.contacts[this.activeTab] !== undefined) {
        this.$refs.map.flyToAddress(this.contacts[this.activeTab].streetAddress + ' ' + this.contacts[this.activeTab].city + ' ' + this.contacts[this.activeTab].state + ' ' + this.contacts[this.activeTab].zip)
      }
    }
  },
  mounted () {
    this.$root.$on('updateContactList', () => {
      this.getContacts()
    })
  },
  created () {
    this.getContacts()
  },
  watch: {
    activeTab: function () {
      this.flyToAddress()
    }
  }
}
</script>
