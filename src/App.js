import React, { Component } from 'react'
import Popover from 'react-tiny-popover'

import WorldMap from './components/WorldMap'
import ProjectionSelector from './components/ProjectionSelector'

class App extends Component {
  state = {
    popoverOpen: false
  }
  render() {
    return (
      <main style={{ width: '100vw', height: '100vh' }}>
        <WorldMap />
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
          <Popover
            isOpen={this.state.popoverOpen}
            content={
              <div
                style={{
                  maxWidth: '15rem',
                  backgroundColor: 'rgba(250, 250, 250, .75)',
                  borderRadius: '.5rem',
                  padding: '.5rem'
                }}
              >
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
              className='text-icon'
              onClick={() => {
                this.setState({ popoverOpen: !this.state.popoverOpen })
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
            <ProjectionSelector />
          </div>
        </div>
      </main>
    )
  }
}

export default App
