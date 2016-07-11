import React from 'react';
import AppActions from '../../actions/actions';
import {withRouter} from 'react-router';

const SidebarButton = (props) => {

  let fireAction = () => {

    if(props.action == 'DELETE_DIRECTORY'){
      if (window.confirm("Do you really want to delete this directory? this will delete all notices and directories in it too."))
        return AppActions.fireAction.bind(null, props.action, {id: props.id, txt:props.txt} )();
    } else
      return AppActions.fireAction.bind(null, props.action, {id: props.id, txt:props.txt} )();
  }

  return (
		<div onClick={fireAction}>
			<i className={props.glyphiconClass}></i>{" "}<span>{props.txt}</span>
		</div>
  );
};

export default SidebarButton;
SidebarButton.propTypes = {
  "glyphiconClass": React.PropTypes.string,
  "txt": React.PropTypes.string,
  "id": React.PropTypes.string,
  "action": React.PropTypes.string,
}
