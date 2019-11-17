import React, { Component } from 'react'
import Popover from 'react-tiny-popover'

import WorldMap from './components/WorldMap'
import ProjectionSelector from './components/ProjectionSelector'

const popoverStyle = {
  maxWidth: '20rem',
  backgroundColor: 'rgba(250, 250, 250, .95)',
  borderRadius: '.5rem',
  padding: '.5rem'
}

class App extends Component {
  state = {
    mapInfoPopoverOpen: false,
    projectionInfoPopoverOpen: false
  }
  render() {
    return (
      <main style={{ width: '100vw', height: '100vh' }}>
        <WorldMap />
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
          <Popover
            isOpen={this.state.mapInfoPopoverOpen}
            content={
              <div style={popoverStyle}>
                <p>
                  This map displays the current location of the International
                  Space Station in real time, thanks to&nbsp;
                  <a
                    href='http://open-notify.org/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Open Notify
                  </a>
                  .
                </p>
                <p>
                  The location is updated every 5 seconds. Watch long enough and
                  you'll see the orbital path of the ISS drawn across the map!
                  Try viewing different projections to see how the path appears
                  to change.
                </p>
              </div>
            }
          >
            <button
              className='help-button'
              onClick={() => {
                this.setState({
                  mapInfoPopoverOpen: !this.state.mapInfoPopoverOpen
                })
              }}
            >
              ?
            </button>
          </Popover>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem'
          }}
        >
          <h1 style={{ fontSize: '1.2rem' }}>
            Things above the Earth: International&nbsp;Space&nbsp;Station
          </h1>
          <div style={{ display: 'block' }}>
            <h5>View the Earth in different projections</h5>
            <ProjectionSelector />
            <Popover
              isOpen={this.state.projectionInfoPopoverOpen}
              content={
                <div style={popoverStyle}>
                  <p>
                    <b>What are projections?</b> Because the Earth is a
                    three-dimensional sphere, we aren't able to view all of it
                    at once. A projection is way of mapping every point on a
                    sphere (like the Earth) onto a point on a two-dimensional
                    plane - in other words, a flat surface such as a screen.
                  </p>
                  <p>
                    Each projection uses a different mathematical formula to
                    determine its shape, and each has different uses. The
                    Orthographic Projection is actually designed to look just
                    like half of a sphere, and looks as Earth would from space,
                    directly over the equator. Notice how other projections
                    distort certain parts of the world.
                  </p>
                </div>
              }
            >
              <button
                className='help-button'
                onClick={() => {
                  this.setState({
                    projectionInfoPopoverOpen: !this.state
                      .projectionInfoPopoverOpen
                  })
                }}
              >
                ?
              </button>
            </Popover>
          </div>
        </div>
      </main>
    )
  }
}

export default App
