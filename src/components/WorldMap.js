import React, { Component } from 'react'
import { connect } from 'react-redux'
import { geoPath } from 'd3-geo'

import StationPositionMarker from './StationPositionMarker'
import PastLocationMarker from './PastLocationMarker'
import { renderProjection } from '../helpers'

import { getMap, loadCurrent, setSize } from '../redux/actions'

class WorldMap extends Component {
  height = window.innerHeight * 0.8
  width = this.height * 1.78

  componentDidMount() {
    this.props.setSize([this.width, this.height])
    this.props.getMap()
    this.props.loadCurrent()
    setInterval(this.props.loadCurrent, 10000)
  }

  render() {
    const {
      current,
      pastLocations,
      selectedProjection,
      svgSize,
      worldData
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
              const divisibleBy = x => {
                return i % x === 0
              }
              const red = () => 250
              const green = () => {
                if (divisibleBy(7)) return 150
                if (divisibleBy(5)) return 220
                if (divisibleBy(3)) return 100 + i
                return 180 - i / 2
              }
              const blue = () => {
                if (divisibleBy(8)) return 150
                if (divisibleBy(6)) return 200
                if (divisibleBy(4)) return i + i / 2
                if (divisibleBy(2)) return 180 - i / 2
                return 100 + i / 2
              }

              return (
                <path
                  key={`path_${i}`}
                  d={geoPath().projection(currentProjection())(d)}
                  className='country'
                  fill={`rgb(${red()}, ${green()}, ${blue()})`}
                  stroke='#212121'
                  strokeWidth={0.5}
                />
              )
            })}
          </g>
          <g className='markers'>
            {pastLocations.map((coords, i) => {
              const last = i === pastLocations.length - 1
              return (
                <PastLocationMarker
                  longLat={coords}
                  stroke={last && '#212121'}
                />
              )
            })}
            <StationPositionMarker />
          </g>
        </svg>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    current,
    pastLocations,
    selectedProjection,
    svgSize,
    worldData
  } = state
  return {
    current,
    pastLocations,
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
