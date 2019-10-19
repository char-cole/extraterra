import React, { Component } from 'react'
import { renderProjection } from '../helpers'

class Marker extends Component {
  render() {
    const { svgSize, circleProps } = this.props
    const { longLat, loaded } = this.props.current
    const { geo } = this.props.selectedProjection
    if (loaded) {
      const coords = renderProjection(geo, longLat, svgSize[0], svgSize[1])
      return (
        <circle
          cx={coords(longLat)[0]}
          cy={coords(longLat)[1]}
          r={circleProps.radius}
          fill={circleProps.fill}
          stroke={circleProps.stroke}
          className='marker'
        />
      )
    } else return null
  }
}

export default Marker
