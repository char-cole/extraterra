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
          Res Superterram - Things above the Earth
        </h1>
        <div style={{ maxWidth: '15rem' }}>
          <p>
            <span role='img' aria-label='construction sign'>
              🚧
            </span>
            <code>this app is being rebuilt!</code>
          </p>
          <p>
            Use this map to track the International Space Station in real time!
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
