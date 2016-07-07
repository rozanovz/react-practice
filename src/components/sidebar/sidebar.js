import React from 'react';
import { Link } from 'react-router'
import SidebarButton from './sidebar-button';
import AppConstants from '../../constants/constants';

export default (props) => {
  return (
  	<div className="col-xs-2 text-center">
      <div className="btn-group-vertical " role="group" style={{width: '100%'}}>
        <a className="btn btn-primary text-center" type="button">
          <SidebarButton
            glyphiconClass="glyphicon glyphicon-plus"
            txt="Add Directory"
            id={props.params}
            action='ADD_DIRECTORY'>
          </SidebarButton>
        </a>

        <Link to={{ pathname:'/notice/new', state: { prevPath: props.params } }} className="btn btn-primary text-center" type="button">
          <SidebarButton
            glyphiconClass="glyphicon glyphicon-pencil"
            txt="Add Notice"
            id={props.params}>
          </SidebarButton>
        </Link>

        <a className="btn btn-primary text-center" type="button">
          <SidebarButton
            glyphiconClass="glyphicon glyphicon-remove"
            txt="Remove"
            action='DELETE_DIRECTORY'
            id={props.params}>
          </SidebarButton>
        </a>
      </div>
    </div>
  );
};
