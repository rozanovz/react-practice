import React from 'react';
import AppActions from '../../actions/actions';

const RemoveIcon = (props) => {
  return (
    <a>
      <i className="glyphicon glyphicon-remove-circle" onClick={AppActions.fireAction.bind(null, 'DELETE_NOTICE', {id:props.id})}></i>
    </a>
  );
}
export default RemoveIcon;

RemoveIcon.propTypes = {
  id: React.PropTypes.number,
};
