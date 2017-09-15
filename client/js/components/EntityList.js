import React from 'react';
import { connect } from 'react-redux';
import { fetchEntities } from '../reducers/entities';
import EntityEntry from './EntityEntry';

class EntityList extends React.Component {

  componentDidMount () {
    const { fetchEntities } = this.props;
    fetchEntities();
  }

  render () {
    const { entities } = this.props
    return (
      <div className="container">
        {
          entities.map(entity => <EntityEntry key={entity.id} entity={entity} />)
        }
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

export default connect(mapState, mapDispatch)(EntityList)
