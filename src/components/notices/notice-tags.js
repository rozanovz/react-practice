import React from 'react';
import AppActions from '../../actions/actions';

export default (props)=>{
  return (
    <span>
      <span key={props.id} className="label label-primary">{props.tag}</span>
      <button onClick={AppActions.fireAction.bind(null, 'REMOVE_TAG', {tagName:props.tag})} className="btn btn-xs btn-danger">X</button>
      {" "}
    </span>
  )
}
