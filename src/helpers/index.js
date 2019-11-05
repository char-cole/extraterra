import {
  geoConicEqualArea,
  geoMercator,
  geoNaturalEarth1,
  geoAzimuthalEqualArea,
  geoOrthographic
} from 'd3-geo'
import { geoHill } from 'd3-geo-projection'

export const renderProjection = (
  projection,
  longLat,
  { width, height },
  currentLocationCoords
) => {
  const ratio = width > height ? height / 450 : width / 800

  switch (projection) {
    case 'geoOrthographic': {
      const findRotationCoords = x => {
        return [x * -1 || 0]
      }
      const long = currentLocationCoords
        ? currentLocationCoords[0]
        : longLat
        ? longLat[0]
        : 0
      return geoOrthographic()
        .scale(200 * ratio)
        .translate([width / 2, height / 2])
        .rotate(findRotationCoords(long))
    }
    case 'geoNaturalEarth1': {
      return geoNaturalEarth1()
        .scale(150 * ratio)
        .translate([width / 2, height / 2])
    }
    case 'geoAzimuthalEqualArea': {
      return geoAzimuthalEqualArea()
        .scale(110 * ratio)
        .translate([width / 2, height / 2])
        .rotate([0, -90])
    }
    case 'geoHill': {
      return geoHill()
        .scale(150 * ratio)
        .translate([width / 2, height / 2])
    }
    case 'geoMercator': {
      return geoMercator()
        .scale(75 * ratio)
        .translate([width / 2, height / 2])
    }
    case 'geoConicEqualArea': {
      return geoConicEqualArea()
        .scale(125 * ratio)
        .translate([width / 2, height / 2])
    }
    default: {
      return null
    }
  }
}

export const parseDate = timestamp => {
  const dateRaw = new Date(timestamp * 1000)
  return {
    hours: dateRaw.getHours().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }),
    minutes: dateRaw.getMinutes().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }),
    seconds: dateRaw.getSeconds().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }
}
