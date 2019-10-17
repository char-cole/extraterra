import { connect } from 'react-redux'
import React, { Component } from 'react'
import { renderProjection } from '../helpers'

class Marker extends Component {
  render() {
    const { longLat, loaded } = this.props.current
    const { geo } = this.props.selectedProjection
    if (loaded) {
      const coords = renderProjection(geo, longLat)
      return (
        <circle
          cx={coords(longLat)[0]}
          cy={coords(longLat)[1]}
          r={5}
          fill='#E91E63'
          className='marker'
        />
      )
    } else return null
  }
}

const mapStateToProps = state => ({
  current: state.current,
  selectedProjection: state.selectedProjection
})

export default connect(mapStateToProps)(Marker)
