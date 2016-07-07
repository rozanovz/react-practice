import React from 'react';
import AppActions from '../../actions/actions';

export default (props)=>{
  return (
    <span>
      <span key={props.id} className="label label-primary" onClick={AppActions.fireAction.bind(null, 'REMOVE_TAG', {tagName:props.tag})}>{props.tag}</span> {" "}
    </span>
  )
}
