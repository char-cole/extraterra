import React, { Component } from 'react'
import { connect } from 'react-redux'
import { geoPath } from 'd3-geo'

import LocationMarker from './Marker/LocationMarker'
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
              const isPrime = () => {
                for (var it = 2; it < i; it++) {
                  if (i % it === 0) {
                    return false
                  }
                }
                return i > 1
              }
              const ii = num => i === num
              const findFillColor = () => {
                if (ii(151)) return '250, 100, 25'
                if (ii(149)) return '250, 50, 150'
                if (ii(131)) return '250, 150, 75'
                if (ii(114)) return '250, 200, 100'
                if (ii(90)) return '250, 75, 25'
                if (ii(83)) return '250, 250, 25'
                if (ii(73)) return '250, 200, 250'
                if (ii(59)) return '250, 50, 75'
                if (ii(41)) return '250, 75, 100'
                if (ii(8)) return '250, 100, 250'
                if (ii(6)) return '225, 225, 225'
                if (ii(0)) return '250, 25, 75'
                if (isPrime()) return `250, ${250 - i / 3}, ${150 + i / 3}`
                if (divisibleBy(25)) return `250, ${100 + i / 2}, ${i}`
                if (divisibleBy(13)) return `250, 225, ${200 + i / 4}`
                if (divisibleBy(11)) return `200, ${100 + i / 2}, 250`
                if (divisibleBy(10)) return `250, 250, ${200 - i / 3}`
                if (divisibleBy(5)) return `250, ${i}, ${100 + i / 2}`
                if (divisibleBy(4)) return `250, ${220 - i / 3}, 75`
                if (divisibleBy(9)) return `250, ${25 + i}, ${175 - i / 4}`
                if (divisibleBy(3)) return `250, 150, ${250 - i / 3}`
                return `250, ${100 + i}, 150`
              }

              return (
                <path
                  key={`path_${i}`}
                  d={geoPath().projection(currentProjection())(d)}
                  className='country'
                  fill={`rgb(${findFillColor()})`}
                  stroke='#212121'
                  strokeWidth={0.5}
                />
              )
            })}
          </g>
          <g className='markers'>
            {pastLocations.map((location, i) => {
              return (
                <LocationMarker
                  key={i}
                  index={i}
                  location={location}
                  connectedSettings={{ current, selectedProjection, svgSize }}
                />
              )
            })}
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
