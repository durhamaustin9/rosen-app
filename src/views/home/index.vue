<template>
  <section>
    <b-loading :is-full-page="true" v-model="loading" :can-cancel="false"></b-loading>
    <div class="columns">
      <b-tabs class="ml-2 column is-one-third customClass" size="is-medium" vertical v-model="activeTab" :animated="false" type="is-boxed" v-if="(!loading)" >
        <b-tab-item :label="`${contact.firstName} ${contact.lastName}`" v-for="contact in contacts" :key="contact.id">
          <div>
            <div class="card-container">
              <div class="card">
                <div class="card-content has-text-left">
                  <div class="card-subtext">
                    <h1>Name</h1>
                    <p>{{ contact.firstName + " " + contact.lastName }}</p>
                  </div>
                  <div class="card-subtext">
                    <h1>Phone</h1>
                    <p>{{ contact.phone }}</p>
                  </div>
                  <div class="card-subtext">
                    <h1>Email</h1>
                    <p>{{ contact.email }}</p>
                  </div>
                  <div class="card-subtext">
                    <h1>Address</h1>
                    <p>{{ contact.streetAddress + " " + contact.zip }}</p>
                  </div>
                  <div class="card-subtext">
                    <h1>Notes</h1>
                    <p>{{ contact.notes }}</p>
                  </div>
                </div>
                <div class="card-button-container">
                  <b-button class="mb-2" @click="updateContact(contact.id)" type="is-primary">Update Contact</b-button>
                  <b-button class="mb-2" @click="deleteContact(contact.id)" type="is-primary">Delete Contact</b-button>
                </div>
              </div>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
      <div style="display: contents" class="column">
        <Map ref="map" class="mr-1"></Map>
      </div>
    </div>
    <update-contact ref="updateContact"></update-contact>
    <create-contact/>
  </section>
</template>

<script>
const Map = require('@/views/components/map').default
const updateContact = require('@/views/components/updateContact').default
const createContact = require('@/views/components/createContact').default

export default {
  components: { Map, updateContact, createContact },
  data: () => ({
    loading: false,
    contacts: [],
    activeTab: 0
  }),
  methods: {
    getContacts () {
      this.loading = true
      this.$libraries.contacts.doGetContacts().then(success => {
        if (success.data.message === 'No Contacts') {
          this.contacts = []
        } else {
          this.contacts = success.data
        }
        this.panToAddress()
      }).catch(_ => {
        if (this.contacts.length === 1) {
          this.$buefy.toast.open({
            type: 'is-info',
            message: 'No Contacts',
            duration: 3000
          })
        } else {
          this.$buefy.toast.open({
            type: 'is-danger',
            message: 'Failed to load contacts',
            duration: 3000
          })
        }
      }).finally(_ => {
        this.loading = false
      })
    },
    updateContact (contactId) {
      this.$refs.updateContact.doOpen(contactId)
    },
    deleteContact (contactId) {
      this.$libraries.contacts.doDeleteContact(contactId).then(success => {
        this.$buefy.toast.open({
          type: 'is-success',
          message: 'Contact deleted',
          duration: 3000
        })

        this.getContacts()
      }).catch(_ => {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Failed to delete contact',
          duration: 3000
        })
      })
    },
    panToAddress () {
      this.$refs.map.panToAddress(this.contacts[this.activeTab].streetAddress)
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
      this.panToAddress()
    }
  }
}

</script>

<style lang="scss" scoped >
  .card-container {
    display: grid
  }
  .card{
    display: grid;
    margin-top: 18%;
    margin-bottom: auto;
    height: max-content
  }
  .card-content {
    margin: auto
  }
  .card-subtext h1 {
    font-weight: bold
  }
  .card-button {
  }
  .card-button-container {
    display: grid
  }
  .button {
    margin: auto
  }
  .b-tabs {
    height: 100%;
    padding: 0;
    display: contents !important
  }
  .hidden {
    transform: translateY(-200%)
  }
  .container {
    margin: 0 !important;
    max-width: 100% !important;
    display: grid;
    height: 100%
  }
  .columns {
    height: 100vh;
    min-height: 480px;
    margin: 0
  }
</style>
