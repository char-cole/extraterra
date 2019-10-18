import React from 'react'
import WorldMap from './components/WorldMap'
import ChangeProjectionButtons from './components/ChangeProjectionButtons'

function App() {
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <WorldMap />
      <div style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
        <p>just a little lorem ipsum for you</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ChangeProjectionButtons />
        </div>
      </div>
    </main>
  )
}

export default App
