import React from 'react'
import { renderProjection } from '../../helpers'

const MapMarker = props => {
  const {
    circleProps,
    currentLocation,
    position,
    selectedProjection,
    svgSize
  } = props
  if (position.loaded) {
    const coords = renderProjection(
      selectedProjection.geo,
      position.longLat,
      {
        width: svgSize[0],
        height: svgSize[1]
      },
      !!currentLocation && currentLocation.longLat
    )
    return (
      <circle
        cx={coords(position.longLat)[0]}
        cy={coords(position.longLat)[1]}
        r={circleProps.radius}
        fill={circleProps.fill}
        stroke={circleProps.stroke}
        className='marker'
      />
    )
  } else return null
}

export default MapMarker
