import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import Popover from 'react-tiny-popover'

import WorldMap from './components/WorldMap'
import ProjectionSelector from './components/ProjectionSelector'
import PlaceLookup from './components/PlaceLookup'

import { parseTime } from './helpers'

const popoverStyle = {
  maxWidth: '20rem',
  backgroundColor: 'rgba(250, 250, 250, .95)',
  borderRadius: '.5rem',
  padding: '.5rem'
}

class App extends Component {
  state = {
    flyover: {
      searchLocation: '',
      longLat: [],
      quality: ''
    },
    flyoverInfoPopoverOpen: false,
    mapInfoPopoverOpen: false,
    placeLookupValue: '',
    projectionInfoPopoverOpen: false,
    timeTillFlyover: null
  }

  flyoverInterval = null

  handleSubmitPlaceLookup = async e => {
    const value = this.state.placeLookupValue.replace(/\s/g, '')
    clearInterval(this.flyoverInterval)
    e.preventDefault()
    fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=1F9kTAodCTAGnxoK4dmLAwOQ79tcZGe3&location=${value}&thumbMaps=false&maxResults=1`
    ).then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`)
        return
      }
      response.json().then(async jsonRes => {
        const topResult = jsonRes.results[0]
        if (!topResult) throw new Error('Could not find location')
        const latLng = topResult.locations[0].latLng
        this.setState({
          flyover: {
            searchLocation: topResult.providedLocation.location,
            longLat: [latLng.lng, latLng.lat],
            quality: topResult.locations[0].geocodeQuality
          }
        })
        await fetchJsonp(
          `http://api.open-notify.org/iss-pass.json?lat=${latLng.lat}&lon=${latLng.lng}&n=1`
        )
          .then(flyoverRes => {
            if (!flyoverRes.ok) {
              console.log('Response not OK')
              return
            }
            flyoverRes.json().then(flyover => {
              const rise = flyover.response[0].risetime * 1000
              const now = new Date().getTime()
              const diff = (rise - now) / 1000
              this.setState(
                {
                  timeTillFlyover: diff
                },
                () => {
                  if (this.state.timeTillFlyover) {
                    this.flyoverInterval = setInterval(() => {
                      this.setState({
                        timeTillFlyover: this.state.timeTillFlyover - 1
                      })
                    }, 1000)
                  }
                }
              )
            })
          })
          .catch(err => console.error('Caught error: ', err))
      })
    })
  }
  handleUpdatePlace = e => {
    this.setState({ placeLookupValue: e.target.value })
  }
  render() {
    const {
      flyover,
      flyoverInfoPopoverOpen,
      mapInfoPopoverOpen,
      placeLookupValue,
      projectionInfoPopoverOpen,
      timeTillFlyover
    } = this.state
    return (
      <main style={{ width: '100vw', height: '100vh' }}>
        <WorldMap />
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
          <Popover
            isOpen={mapInfoPopoverOpen}
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
                  mapInfoPopoverOpen: !mapInfoPopoverOpen
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
            <h5>View the Earth in different projections:</h5>
            <ProjectionSelector />
            <Popover
              isOpen={projectionInfoPopoverOpen}
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
                    directly over the equator. Notice how each projection
                    distorts distance or direction differently.
                  </p>
                </div>
              }
            >
              <button
                className='help-button'
                onClick={() => {
                  this.setState({
                    projectionInfoPopoverOpen: !projectionInfoPopoverOpen
                  })
                }}
              >
                ?
              </button>
            </Popover>
          </div>
          <div style={{ display: 'block' }}>
            <h5>Find out when the ISS will fly over you:</h5>
            <PlaceLookup
              handleSubmitPlaceLookup={this.handleSubmitPlaceLookup}
              handleUpdatePlace={this.handleUpdatePlace}
              placeLookupValue={placeLookupValue}
            />
            <Popover
              isOpen={flyoverInfoPopoverOpen}
              content={
                <div style={popoverStyle}>
                  <p>
                    Search for any location by name or by street address. This
                    app will use MapQuest's GeoCoding API to look up the
                    latitude and longitude of your location and then use Open
                    Notify to find out when the ISS will be overhead next.
                  </p>
                  <p>
                    If it's a clear night when the ISS is overhead, you may be
                    able to go outside and see it! The ISS will appear as a
                    bright light moving rapidly across the sky.
                  </p>
                </div>
              }
            >
              <button
                className='help-button'
                onClick={() => {
                  this.setState({
                    flyoverInfoPopoverOpen: !flyoverInfoPopoverOpen
                  })
                }}
              >
                ?
              </button>
            </Popover>
            {timeTillFlyover !== null && (
              <p>
                The ISS will be overhead at {flyover.searchLocation} in&nbsp;
                {parseTime(timeTillFlyover)}
              </p>
            )}
          </div>
        </div>
      </main>
    )
  }
}

export default App
