import React from 'react'
import MapMarker from './MapMarker'

const StationMarker = props => {
  const { current, selectedProjection, svgSize } = props.connectedSettings
  const circle = {
    radius: 5,
    fill: 'rgba(50, 250, 250, .3)',
    stroke: '#212121'
  }
  return (
    <MapMarker
      circleProps={circle}
      position={current}
      selectedProjection={selectedProjection}
      svgSize={svgSize}
    />
  )
}

export default StationMarker
