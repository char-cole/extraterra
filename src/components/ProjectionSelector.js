import React from 'react'
import { connect } from 'react-redux'
import { changeProjection } from '../redux/actions'

const ProjectionSelector = props => {
  const buttonDivs = props.allProjections.map((x, i) => {
    return (
      <option key={i} value={x.geo + ',' + x.name}>
        {x.name} Projection
      </option>
    )
  })
  return (
    <select
      onChange={event => {
        const valueArray = event.target.value.split(',')
        return props.changeProjection({
          geo: valueArray[0],
          name: valueArray[1]
        })
      }}
    >
      {buttonDivs}
    </select>
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
)(ProjectionSelector)
