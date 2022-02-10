<template>
  <section>
    <b-loading :is-full-page="true" v-model="loading" :can-cancel="false"></b-loading>

    <b-modal :active="open" has-modal-card trap-focus :can-cancel="false">
      <div class="modal-card p4">
        <section class="modal-card-body has-text-left">
          <b-field label="First Name" class="mt-1">
            <b-input v-model="contact.firstName"></b-input>
          </b-field>
          <b-field label="Last Name" class="mt-1">
            <b-input v-model="contact.lastName"></b-input>
          </b-field>
          <b-field label="Email" class="mt-1">
            <b-input v-model="contact.email" type="email"></b-input>
          </b-field>
          <b-field label="Phone Number" class="mt-1">
            <b-input v-model="contact.phone"></b-input>
          </b-field>
          <b-field label="Street Address" class="mt-1">
            <b-input v-model="contact.streetAddress"></b-input>
          </b-field>
          <b-field label="City" class="mt-1">
            <b-input v-model="contact.city"></b-input>
          </b-field>
          <b-field label="State" class="mt-1">
            <b-select placeholder="Select state" v-model="contact.state">
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AZ">AZ</option>
              <option value="AR">AR</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="IA">IA</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="ME">ME</option>
              <option value="MD">MD</option>
              <option value="MA">MA</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MS">MS</option>
              <option value="MO">MO</option>
              <option value="MT">MT</option>
              <option value="NE">NE</option>
              <option value="NV">NV</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NY">NY</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WV">WV</option>
              <option value="WI">WI</option>
              <option value="WY">WY</option>
            </b-select>
          </b-field>
          <b-field label="Zip Code" class="mt-1">
            <b-input v-model="contact.zip"></b-input>
          </b-field>
          <b-field label="Notes" class="mt-1">
            <b-input v-model="contact.notes" type="textarea"></b-input>
          </b-field>
          <b-button @click="doClose()" class="mr-1" type="is-primary">Cancel</b-button>
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
      city: '',
      zip: '',
      state: '',
      notes: ''
    }
  }),
  methods: {
    createContact () {
      if (!this.contact.firstName || !this.contact.lastName || !this.contact.email || !this.contact.phone || !this.contact.streetAddress || !this.contact.city || !this.contact.zip || !this.contact.state) {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'All fields except notes required',
          duration: 3000
        })
      } else {
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
      }
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
        city: '',
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
