import React from 'react'
import MapMarker from './MapMarker'

const PastLocationMarker = props => {
  const { connectedSettings, i, longLat } = props
  const opacity = () => {
    const fraction = i / 10
    const final = fraction > 1 ? fraction : 1
    console.log('opacity', i, 1 / final)
    return 1 / final
  }
  const circle = {
    radius: 1,
    fill: `rgba(200, 250, 250, ${opacity()})`
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
