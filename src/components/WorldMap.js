import React, { Component } from 'react'
import { connect } from 'react-redux'
import { geoPath } from 'd3-geo'

import StationPositionMarker from './Marker/StationPositionMarker'
import PastLocationMarker from './Marker/PastLocationMarker'
import { renderProjection } from '../helpers'

import { getMap, loadCurrent, setSize } from '../redux/actions'

class WorldMap extends Component {
  state = {
    height: 800,
    width: 450
  }

  getMapDimensions = () => {
    const { innerWidth, innerHeight } = window
    let height, width
    if (innerWidth > innerHeight) {
      height = innerHeight * 0.9
      width = height * 1.78
    } else {
      width = innerWidth * 0.9
      height = width / 1.78
    }

    this.setState(
      {
        height,
        width
      },
      () => this.props.setSize([width, height])
    )
  }

  componentDidMount() {
    this.getMapDimensions()
    window.addEventListener('resize', this.getMapDimensions)

    this.props.getMap()
    this.props.loadCurrent()
    setInterval(this.props.loadCurrent, 5000)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getMapDimensions)
  }

  render() {
    const {
      current,
      pastLocations,
      selectedProjection,
      svgSize,
      worldData
    } = this.props

    const currentProjection = () => {
      return renderProjection(selectedProjection.geo, current.longLat, {
        width: svgSize[0],
        height: svgSize[1]
      })
    }

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
                if (divisibleBy(2)) {
                  if (divisibleBy(12)) {
                    if (divisibleBy(9)) {
                      if (divisibleBy(5)) {
                        return 200
                      }
                      return 250
                    }
                    return 100
                  }
                  if (divisibleBy(10)) {
                    return 255
                  }
                  if (divisibleBy(4)) {
                    return 150 + i / 2
                  }
                  return 225 - i * 0.75
                }
                if (divisibleBy(5)) {
                  return 170 + i / 3
                }
                if (divisibleBy(3)) {
                  return i * 5
                }
                if (divisibleBy(7)) {
                  return 70
                }
                return 150
              }
              const blue = () => {
                if (divisibleBy(2)) {
                  if (divisibleBy(3)) {
                    return 200 - i / 2
                  }
                  if (divisibleBy(12)) {
                    if (divisibleBy(9)) {
                      return 100
                    }
                    return 50
                  }
                  if (divisibleBy(10)) {
                    return 100
                  }
                  if (divisibleBy(4)) {
                    return i + i / 2
                  }
                  return 30 + i
                }
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
            {pastLocations.map((longLat, i) => {
              return (
                <PastLocationMarker
                  key={i}
                  i={i}
                  longLat={longLat}
                  connectedSettings={{ current, selectedProjection, svgSize }}
                />
              )
            })}
            <StationPositionMarker
              connectedSettings={{ current, selectedProjection, svgSize }}
            />
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
