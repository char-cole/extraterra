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

    const sorted = worldData.sort((a, b) => Number(a.id) - Number(b.id))

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
            {sorted.map((d, i) => {
              const divisibleBy = x => {
                return i % x === 0
              }
              const findFillColor = () => {
                if (i === 5) return '200, 200, 200' // antarctica
                if (divisibleBy(3)) return `250, ${120 + i / 3}, ${100 + i / 4}` // red
                if (divisibleBy(2)) return `250, ${175 + i / 4}, ${100 + i / 2}` // orange
                return `250, 225, ${100 + i / 3}` // yella
              }

              return (
                <path
                  key={`path_${i}`}
                  d={geoPath().projection(currentProjection())(d)}
                  className='country'
                  id={`id_${d.id}_${i}`}
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
