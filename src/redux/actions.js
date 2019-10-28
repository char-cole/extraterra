import { feature } from 'topojson-client'
import fetchJsonp from 'fetch-jsonp'
// import timeZoneConverter from 'time-zone-converter'
// import timeZone from "time-zone"

export function getMap() {
  return function(dispatch) {
    fetch('https://unpkg.com/world-atlas@1/world/110m.json')
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worldData => {
          dispatch(
            mapLoaded(feature(worldData, worldData.objects.countries).features)
          )
        })
      })
      .catch(err => console.error('Caught error: ', err))
  }
}

function mapLoaded(data) {
  return {
    type: 'MAP_LOADED',
    value: data
  }
}

export function loadCurrent() {
  return function(dispatch) {
    fetchJsonp('http://api.open-notify.org/iss-now.json')
      .then(response => {
        if (!response.ok) {
          console.log('Response not OK.', response)
          return
        }
        response.json().then(res => {
          const current = {
            loaded: true,
            longLat: [
              parseFloat(res.iss_position.longitude),
              parseFloat(res.iss_position.latitude)
            ]
          }
          dispatch(currentLoaded(current))
        })
      })
      .catch(err => console.error('Caught error: ', err))
  }
}

function currentLoaded(coords) {
  return {
    type: 'CURRENT_LOADED',
    value: coords
  }
}

export function changeProjection(projection) {
  return {
    type: 'PROJECTION_CHANGED',
    value: projection
  }
}

export function setSize(size) {
  return {
    type: 'SIZE_LOADED',
    value: size
  }
}
