import axios from 'axios'

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: 'pk.eyJ1IjoibHVjYW5lIiwiYSI6ImNsMHZnOHFnMTBnNzgzY256cXU4aDQ4ZzQifQ.LwTCSjhjQ-lx8q5b3yTxYg',
  }
})

export default directionsApi