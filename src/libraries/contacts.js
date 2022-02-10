const http = require('@/middleware/axios').default

export default {
  doGetContacts: async function () {
    return new Promise((resolve, reject) => {
      http.get('contact').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doGetContact: async function (value) {
    return new Promise((resolve, reject) => {
      http.get('contact/' + value).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doUpdateContact: async function (value) {
    return new Promise((resolve, reject) => {
      http.put('contact/update/' + value.id, value).then(_ => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  doDeleteContact: async function (value) {
    return new Promise((resolve, reject) => {
      http.delete('contact/delete/' + value).then(_ => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  doCreateContact: async function (value) {
    return new Promise((resolve, reject) => {
      http.post('contact/create/', value).then(_ => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}
