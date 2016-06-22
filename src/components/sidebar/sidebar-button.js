import React from 'react';
import AppActions from '../../actions/actions';
import {withRouter} from 'react-router';

export default (props) => {
  let style = {
    marginTop: 15,
    marginBottom: 7.5,
    width: '50%'
  }
  return (
    <div className="col-xs-12">
			<button
        onClick={AppActions.fireAction.bind(null, props.action, {id: props.directoryId, txt:props.txt} )}
        className="btn btn-primary text-center"
        style={style}
      >
				<i className={props.glyphiconClass}></i>
        <br />
				<span>{props.txt}</span>
			</button>
		</div>
  );
};
