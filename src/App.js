import React from 'react'
import WorldMap from './components/WorldMap'
import ChangeProjectionButtons from './components/ChangeProjectionButtons'

function App() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <p>just a little lorem ipsum for you</p>
      <div style={{ display: 'flex' }}>
        <ChangeProjectionButtons />
        <WorldMap />
      </div>
    </main>
  )
}

export default App
