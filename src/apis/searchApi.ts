import axios from 'axios'

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'pt',
    access_token: 'pk.eyJ1IjoibHVjYW5lIiwiYSI6ImNsMHZnOHFnMTBnNzgzY256cXU4aDQ4ZzQifQ.LwTCSjhjQ-lx8q5b3yTxYg',
  }
})

export default searchApi