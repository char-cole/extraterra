import React, { Component } from 'react'
import MapMarker from './MapMarker'
import Popover from 'react-tiny-popover'

class StationMarker extends Component {
  state = {
    popoverOpen: false
  }

  setPopover = () => this.setState({ popoverOpen: !this.state.popoverOpen })

  render() {
    const {
      current,
      selectedProjection,
      svgSize
    } = this.props.connectedSettings
    const circle = {
      radius: 5,
      fill: 'rgba(50, 250, 250, .3)',
      stroke: '#212121'
    }
    const dateRaw = new Date(current.timestamp * 1000)
    const date = {
      hours: dateRaw.getHours().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }),
      minutes: dateRaw.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }),
      seconds: dateRaw.getSeconds().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    }
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
              {current.loaded && current.longLat[0] + ', ' + current.longLat[1]}
            </p>
            <p
              style={{ margin: '0' }}
            >{`${date.hours}:${date.minutes}:${date.seconds}`}</p>
          </div>
        }
      >
        <MapMarker
          circleProps={circle}
          position={current}
          selectedProjection={selectedProjection}
          svgSize={svgSize}
          onMouseOver={this.setPopover}
        />
      </Popover>
    )
  }
}

export default StationMarker
