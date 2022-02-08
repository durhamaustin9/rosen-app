const axios = require('axios').default

const http = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`

export default http
