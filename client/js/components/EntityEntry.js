import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class EntityEntry extends React.Component {

  componentDidMount () {
  }

  render () {
    const { entity } = this.props
    return (
      <div className="row">
        <div className="col-12">
          <NavLink to={`/entities/${entity.id}`}>{entity.id} - {entity.name}</NavLink>
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  entities: state.entities
})

const mapDispatch = dispatch => ({
  fetchEntities: () => dispatch(fetchEntities())
})

export default connect(mapState, mapDispatch)(EntityEntry)
