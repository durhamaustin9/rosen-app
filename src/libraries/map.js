const http = require('@/middleware/axios').default

export default {
  doGetLatLong: async function (location) {
    return new Promise((resolve, reject) => {
      http.post('map', { location: location }).then(response => {
        resolve(response.data.latLng)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
