import axios from 'axios'

const http = require('@/middleware/axios').default

export default {
  doGetContacts: async function () {
    return new Promise((resolve, reject) => {
      http.get('/contact/', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doGetLatLong: async function (location) {
    return new Promise((resolve, reject) => {
      axios.get('http://www.mapquestapi.com/geocoding/v1/address', { params: { key: 'MderQFkJDZSlcpLFtVdXAC2UniZTbiUN', location: location } }).then(response => {
        resolve(response.data.results.shift().locations.shift())
      }).catch(error => {
        reject(error)
      })
    })
  },
  doGetContact: async function (value) {
    return new Promise((resolve, reject) => {
      http.get('/contact/' + value, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doUpdateContact: async function (value) {
    return new Promise((resolve, reject) => {
      http.put('/contact/update/' + value.id, value, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(_ => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  doDeleteContact: async function (value) {
    return new Promise((resolve, reject) => {
      http.delete('contact/delete/' + value, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(_ => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  doCreateContact: async function (value) {
    return new Promise((resolve, reject) => {
      http.post('contact/create', value, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(_ => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}
