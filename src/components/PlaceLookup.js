import React from 'react'

const PlaceLookup = props => {
  return (
    <form onSubmit={props.handleSubmitPlaceLookup}>
      <input
        type='text'
        onChange={props.handleUpdatePlace}
        value={props.placeLookupValue}
      />
      <input type='submit' value='search' />
    </form>
  )
}

export default PlaceLookup
