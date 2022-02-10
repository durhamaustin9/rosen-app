<template>
  <section class="ml-auto mr-auto mb-auto mt-5 map-container">
    <b-loading :is-full-page="false" v-model="loading" :can-cancel="false"></b-loading>
    <div id="map"></div>
  </section>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
import * as L1 from 'leaflet.markercluster'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  data: () => ({
    loading: false,
    map: null,
    center: [37.7749, -122.4194],
    lat: 0,
    lng: 0,
    markers: null
  }),
  methods: {
    setupLeafletMap: function () {
      this.map = L.map('map').setView(this.center, 13)
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          accessToken: 'pk.eyJ1IjoiZHVyaGFtYXVzdGluOSIsImEiOiJja3phbG5xMWUyMjY5MnJwNG5heGp5NTdxIn0.bnTUD4Q2MPXfA7auNANjWw'
        }).addTo(this.map)

      this.markers = new L1.MarkerClusterGroup()
      this.map.addLayer(this.markers)
    },
    flyToAddress: function (address) {
      this.loading = true
      this.$libraries.map.doGetLatLong(address).then(success => {
        this.markers.clearLayers()

        this.lat = success.lat
        this.lng = success.lng

        const marker = L.marker([this.lat, this.lng])

        this.markers.addLayer(marker)

        marker.on('add', function () {
          marker.bindPopup(address).openPopup()
        })

        this.map.flyTo([this.lat, this.lng], 15)
      }).catch(_ => {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Failed to load map',
          duration: 5000
        })
      }).finally(_ => {
        this.loading = false
      })
    }
  },
  mounted () {
    this.setupLeafletMap()
  }
}
</script>
