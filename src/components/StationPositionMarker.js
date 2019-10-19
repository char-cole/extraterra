import { connect } from 'react-redux'
import React from 'react'
import MapMarker from './MapMarker'

const StationMarker = props => {
  const circle = {
    radius: 5,
    fill: 'rgba(50, 250, 250, .3)',
    stroke: '#212121'
  }
  return (
    <MapMarker
      svgSize={props.svgSize}
      current={props.current}
      selectedProjection={props.selectedProjection}
      circleProps={circle}
    />
  )
}

const mapStateToProps = state => ({
  current: state.current,
  selectedProjection: state.selectedProjection,
  svgSize: state.svgSize
})

export default connect(mapStateToProps)(StationMarker)
