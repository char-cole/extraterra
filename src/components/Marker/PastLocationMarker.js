import React from 'react'
import MapMarker from './MapMarker'

const PastLocationMarker = props => {
  const { connectedSettings, i, longLat } = props
  const opacity = () => {
    if (i > 300) return 0.4
    const calc = 1 - i / 500
    return calc
  }
  const circle = {
    radius: 1,
    fill: `rgba(255, 255, 255, ${opacity()})`
  }
  return (
    <MapMarker
      circleProps={circle}
      position={{ loaded: true, longLat }}
      selectedProjection={connectedSettings.selectedProjection}
      svgSize={connectedSettings.svgSize}
      currentLocation={connectedSettings.current}
    />
  )
}

export default PastLocationMarker
