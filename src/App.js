import React from 'react'
import WorldMap from './components/WorldMap'
import ChangeProjectionButtons from './components/ChangeProjectionButtons'

function App() {
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <WorldMap />
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem'
        }}
      >
        <h1 style={{ fontSize: '1.2rem' }}>
          <i>Res Superterram</i> - Things above the Earth
        </h1>
        <div style={{ maxWidth: '15rem' }}>
          <p style={{ fontSize: '.8rem' }}>
            <span role='img' aria-label='construction sign'>
              🚧
            </span>
            <code>app under construction!</code>
            <span role='img' aria-label='construction sign'>
              🚧
            </span>
          </p>
          <p>
            This map displays the current location of the International Space
            Station in real time, thanks to&nbsp;
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
            The location will update every 10 seconds and will draw a line
            across the map. Try viewing different projections to see how the
            path of the ISS appears to change.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <ChangeProjectionButtons />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
