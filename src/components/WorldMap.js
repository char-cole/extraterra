import React, { Component } from 'react'
import { connect } from 'react-redux'
import { geoPath } from 'd3-geo'

import StationPositionMarker from './StationPositionMarker'
import { renderProjection } from '../helpers'

import { getMap, loadCurrent, setSize } from '../redux/actions'

class WorldMap extends Component {
  height = window.innerHeight * 0.8
  width = this.height * 1.78

  componentDidMount() {
    this.props.setSize([this.width, this.height])
    this.props.getMap()
    this.props.loadCurrent()
  }

  render() {
    const {
      current,
      selectedProjection,
      worldData,
      loadCurrent,
      svgSize
    } = this.props

    const currentProjection = () =>
      renderProjection(
        selectedProjection.geo,
        current.longLat,
        svgSize[0],
        svgSize[1]
      )
    return (
      <div
        onClick={() => loadCurrent()}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <svg
          width={svgSize[0]}
          height={svgSize[1]}
          viewBox={`0 0 ${svgSize[0]} ${svgSize[1]}`}
        >
          <g className='countries'>
            {worldData.map((d, i) => {
              const remainder = x => {
                return i % x === 0
              }
              const red = 250
              const green = () => {
                if (remainder(7)) {
                  return 150
                }
                if (remainder(5)) {
                  return 220
                }
                if (remainder(3)) {
                  return 100 + i
                }
                return 180 - i / 2
              }
              const blue = () => {
                if (remainder(8)) {
                  return 150
                }
                if (remainder(6)) {
                  return 200
                }
                if (remainder(4)) {
                  return i + i / 2
                }
                if (remainder(2)) {
                  return 180 - i / 2
                }
                return 100 + i / 2
              }

              return (
                <path
                  key={`path_${i}`}
                  d={geoPath().projection(currentProjection())(d)}
                  className='country'
                  fill={`rgb(${red}, ${green()}, ${blue()})`}
                  stroke='#212121'
                  strokeWidth={0.5}
                />
              )
            })}
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
  const { current, selectedProjection, svgSize, worldData } = state
  return {
    current,
    selectedProjection,
    svgSize,
    worldData
  }
}

const mapDispatchToProps = {
  getMap,
  setSize,
  loadCurrent
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorldMap)
