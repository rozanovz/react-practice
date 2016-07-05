import React from 'react';
import { Link } from 'react-router'
import SidebarButton from './sidebar-button';
import AppConstants from '../../constants/constants';

export default (props) => {
  return (
  	<div className="col-xs-2 text-center">
      <SidebarButton
        glyphiconClass="glyphicon glyphicon-plus"
        txt="Add Directory"
        id={props.params}
        action='ADD_DIRECTORY'>
      </SidebarButton>

      <Link to="/notice/new">
        <SidebarButton
          glyphiconClass="glyphicon glyphicon-pencil"
          txt="Add Notice"
          action='ADD_NOTICE'>
          id={props.params}
        </SidebarButton>
      </Link>

      <SidebarButton
        glyphiconClass="glyphicon glyphicon-remove"
        txt="Remove"
        action='DELETE_DIRECTORY'
        directoryId={props.params}
        id={props.params}
        >
      </SidebarButton>
    </div>
  );
};
