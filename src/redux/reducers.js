import { combineReducers } from 'redux'

function svgSize(state = [800, 450], action) {
  if (action.type === 'SIZE_LOADED') {
    return action.value
  }
  return state
}

function flyover(state = {}, action) {
  if (action.type === 'FLYOVER_LOADED') {
    return action.value
  }
  return state
}

function inputLat(state = '', action) {
  if (action.type === 'LAT_UPDATED') {
    return action.value
  }
  return state
}

function inputLong(state = '', action) {
  if (action.type === 'LONG_UPDATED') {
    return action.value
  }
  return state
}

function buttons(state = [], action) {
  if (action.type === 'BUTTONS_LOADED') {
    return action.value
  }
  return state
}

function worldData(state = [], action) {
  if (action.type === 'MAP_LOADED') {
    return action.value
  }
  return state
}

function current(state = {}, action) {
  if (action.type === 'CURRENT_LOADED') {
    return action.value
  }
  return state
}

function selectedProjection(state = {}, action) {
  if (action.type === 'PROJECTION_CHANGED') {
    return action.value
  }
  return state
}

function allProjections(state = []) {
  return state
}

function cities(state = []) {
  return state
}

function pastLocations(state = [], action) {
  if (action.type === 'CURRENT_LOADED') {
    state.unshift(action.value)
  }
  return state
}

const rootReducer = combineReducers({
  allProjections,
  buttons,
  cities,
  current,
  flyover,
  inputLat,
  inputLong,
  pastLocations,
  selectedProjection,
  svgSize,
  worldData
})

export default rootReducer
