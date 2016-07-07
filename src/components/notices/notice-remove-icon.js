import React from 'react';
import AppActions from '../../actions/actions';

export default (props) => {
  return (
    <a>
      <i className="glyphicon glyphicon-remove-circle" onClick={AppActions.fireAction.bind(null, 'DELETE_NOTICE', {id:props.id})}></i>
    </a>
  );
}
