import React from 'react'
import { connect } from 'react-redux'
import { changeProjection } from '../redux/actions'

const ChangeProjectionButtons = props => {
  const buttonDivs = props.allProjections.map((x, i) => {
    if (x.geo !== props.selectedProjection.geo) {
      return (
        <button
          key={i}
          onClick={() => {
            return props.changeProjection(x)
          }}
        >
          {x.name} Projection
        </button>
      )
    } else return null
  })
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>{buttonDivs}</div>
  )
}

const mapStateToProps = state => ({
  selectedProjection: state.selectedProjection,
  allProjections: state.allProjections
})

const mapDispatchToProps = dispatch => ({
  changeProjection: projection => {
    dispatch(changeProjection(projection))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeProjectionButtons)
