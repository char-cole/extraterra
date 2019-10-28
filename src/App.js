import React from 'react'
import WorldMap from './components/WorldMap'
import ProjectionSelector from './components/ProjectionSelector'

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
          Things above the Earth: International&nbsp;Space&nbsp;Station
        </h1>
        <div style={{ maxWidth: '15rem' }}>
          {/* <p
            style={{
              fontSize: '.8rem',
              borderRadius: '.25rem',
              border: '1px solid #f7322e',
              backgroundColor: 'rgba(247, 50, 46, .25',
              padding: '.25rem',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <span role='img' aria-label='construction sign'>
              🚧
            </span>
            <code>&nbsp;app under construction!&nbsp;</code>
            <span role='img' aria-label='construction sign'>
              🚧
            </span>
          </p> */}
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
            The location is updated every 5 seconds. Watch long enough and
            you'll see the orbital path of the ISS drawn across the map! Try
            viewing different projections to see how the path appears to change.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <ProjectionSelector />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
