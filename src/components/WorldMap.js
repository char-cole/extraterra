import React, { Component } from 'react'
import { connect } from 'react-redux'
import { geoPath } from 'd3-geo'

import StationPositionMarker from './StationPositionMarker'
import { renderProjection } from '../helpers'

import { getMap, loadCurrent } from '../redux/actions'

class WorldMap extends Component {
  componentDidMount() {
    this.props.getMap()
    this.props.loadCurrent()
  }

  render() {
    const { current, selectedProjection, worldData, loadCurrent } = this.props
    const currentProjection = renderProjection(
      selectedProjection.geo,
      current.longLat
    )
    return (
      <div onClick={() => loadCurrent()}>
        <svg width={800} height={450} viewBox='0 0 800 450'>
          <g className='countries'>
            {worldData.map((d, i) => (
              <path
                key={`path-${i}`}
                d={geoPath().projection(currentProjection)(d)}
                className='country'
                fill={`rgba(38,250,56,${(1 / worldData.length) * i + 0.1})`}
                stroke='#FFFFFF'
                strokeWidth={0.5}
              />
            ))}
          </g>
          <g className='markers'>
            <StationPositionMarker />
          </g>
        </svg>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { current, selectedProjection, worldData } = state
  return {
    current,
    selectedProjection,
    worldData
  }
}

const mapDispatchToProps = {
  getMap,
  loadCurrent
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorldMap)
