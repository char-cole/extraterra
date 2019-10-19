import { connect } from 'react-redux'
import React from 'react'
import MapMarker from './MapMarker'

const PastLocationMarker = props => {
  const { longLat, selectedProjection, stroke, svgSize } = props
  const circle = {
    radius: 1,
    fill: 'rgba(100, 250, 250, .85)',
    stroke: stroke || 'none'
  }
  return (
    <MapMarker
      svgSize={svgSize}
      current={{ loaded: true, longLat }}
      selectedProjection={selectedProjection}
      circleProps={circle}
    />
  )
}

const mapStateToProps = state => ({
  selectedProjection: state.selectedProjection,
  svgSize: state.svgSize
})

export default connect(mapStateToProps)(PastLocationMarker)
