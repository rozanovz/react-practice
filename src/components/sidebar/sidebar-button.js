import React from 'react';
import AppActions from '../../actions/actions';
import {withRouter} from 'react-router';

export default (props) => {
  return (
		<div onClick={AppActions.fireAction.bind(null, props.action, {id: props.id, txt:props.txt} )}>
			<i className={props.glyphiconClass}></i>
      <br />
			<span>{props.txt}</span>
		</div>
  );
};
