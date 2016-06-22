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
        action='ADD_DIRECTORY'>
      </SidebarButton>

      <Link to="/notice/new">
        <SidebarButton
          glyphiconClass="glyphicon glyphicon-pencil"
          txt="Add Notice"
          action='ADD_NOTICE'>
        </SidebarButton>
      </Link>

      <SidebarButton
        glyphiconClass="glyphicon glyphicon-remove"
        txt="Remove"
        action='REMOVE_DIRECTORY'
        directoryId={props.params}
        >
      </SidebarButton>
    </div>
  );
};
