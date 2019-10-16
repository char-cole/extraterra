export default {
  current: {},
  worldData: [],
  selectedProjection: {
    geo: 'geoMercator',
    name: 'Mercator',
    desc: ''
  },
  allProjections: [
    {
      geo: 'geoMercator',
      name: 'Mercator',
      desc: ''
    },
    {
      geo: 'geoNaturalEarth1',
      name: 'Natural Earth',
      desc: ''
    },
    {
      geo: 'geoHill',
      name: 'Hill Eucyclic',
      desc: ''
    },
    {
      geo: 'geoAzimuthalEqualArea',
      name: 'Azimuthal',
      desc: ''
    },
    {
      geo: 'geoOrthographic',
      name: 'Orthographic',
      desc: ''
    },
    {
      geo: 'geoConicEqualArea',
      name: 'Conic',
      desc: ''
    }
  ],
  flyover: {},
  inputLat: '',
  inputLong: '',
  buttons: [
    {
      name: 'São Paulo',
      timezone: -2,
      lat: -23.55,
      long: -46.633333,
      country: 'Brazil'
    },
    {
      name: 'Lagos',
      timezone: 1,
      lat: 6.455027,
      long: 3.384082,
      country: 'Nigeria'
    },
    {
      name: 'Dhaka',
      timezone: 6,
      lat: 23.7,
      long: 90.366667,
      country: 'Bangladesh'
    },
    {
      name: 'Beijing',
      timezone: 8,
      lat: 39.916667,
      long: 116.383333,
      country: 'China'
    },
    {
      name: 'New York',
      timezone: -5,
      lat: 40.7127,
      long: -74.0059,
      country: 'USA'
    },
    {
      name: 'Moscow',
      timezone: 3,
      lat: 55.75,
      long: 37.616667,
      country: 'Russia'
    }
  ]
}
