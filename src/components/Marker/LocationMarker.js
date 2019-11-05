import React, { Component } from 'react'
import Popover from 'react-tiny-popover'

import MapMarker from './MapMarker'
import { parseDate } from '../../helpers'

class LocationMarker extends Component {
  state = {
    popoverOpen: false
  }

  setPopover = () => this.setState({ popoverOpen: !this.state.popoverOpen })

  render() {
    const { connectedSettings, index, location } = this.props

    const isCurrent = index === 0

    const opacity = () => {
      if (index > 300) return 0.4
      const calc = 1 - index / 500
      return calc
    }
    const circle = !isCurrent
      ? {
          radius: 1,
          fill: `rgba(255, 255, 255, ${opacity()})`
        }
      : {
          radius: 5,
          fill: 'rgba(50, 250, 250, .3)',
          stroke: '#212121'
        }
    const date = parseDate(location.timestamp)

    return (
      <Popover
        isOpen={this.state.popoverOpen}
        content={
          <div
            style={{
              borderRadius: '.5rem',
              backgroundColor: 'rgba(250, 250, 250, .75)',
              padding: '.25rem',
              fontSize: '.75rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <p style={{ margin: '0' }}>
              {`${location.longLat[0]} E, ${location.longLat[1]} N`}
            </p>
            <p style={{ margin: '0' }}>
              {`${date.hours}:${date.minutes}:${date.seconds}`}
            </p>
          </div>
        }
      >
        <MapMarker
          circleProps={circle}
          position={{ loaded: true, longLat: location.longLat }}
          selectedProjection={connectedSettings.selectedProjection}
          svgSize={connectedSettings.svgSize}
          currentLocation={connectedSettings.current}
          onMouseOver={this.setPopover}
        />
      </Popover>
    )
  }
}

export default LocationMarker
