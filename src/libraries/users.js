const http = require('@/middleware/axios').default

export default {
  doSignIn: async function (email, password) {
    return new Promise((resolve, reject) => {
      http.post('user/login', { email: email, password: password }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doGetUsers: async function () {
    return new Promise((resolve, reject) => {
      http.get('user', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doRegisterUser: async function (value) {
    return new Promise((resolve, reject) => {
      http.post('user/create', value).then(_ => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}
