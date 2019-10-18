import { connect } from 'react-redux'
import React, { Component } from 'react'
import { renderProjection } from '../helpers'

class Marker extends Component {
  render() {
    const { svgSize } = this.props
    const { longLat, loaded } = this.props.current
    const { geo } = this.props.selectedProjection
    if (loaded) {
      const coords = renderProjection(geo, longLat, svgSize[0], svgSize[1])
      return (
        <circle
          cx={coords(longLat)[0]}
          cy={coords(longLat)[1]}
          r={5}
          fill='rgba(50, 250, 250, .5)'
          stroke='#212121'
          className='marker'
        />
      )
    } else return null
  }
}

const mapStateToProps = state => ({
  current: state.current,
  selectedProjection: state.selectedProjection,
  svgSize: state.svgSize
})

export default connect(mapStateToProps)(Marker)
