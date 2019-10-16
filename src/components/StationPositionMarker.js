import { connect } from 'react-redux'
import React, { Component } from 'react'
import { renderProjection } from '../helpers'

class Marker extends Component {
  render() {
    const { current, selectedProjection } = this.props
    if (current.loaded) {
      return (
        <circle
          cx={renderProjection(selectedProjection.geo)(current.longLat)[0]}
          cy={renderProjection(selectedProjection.geo)(current.longLat)[1]}
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
