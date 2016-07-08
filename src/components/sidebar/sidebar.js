import React from 'react';
import { Link } from 'react-router'
import SidebarButton from './sidebar-button';
import AppConstants from '../../constants/constants';

const Sidebar = (props) => {
  let id = props.params ? props.params : '1';
  return (
  	<div className="col-xs-2 text-center">
      <div className="btn-group-vertical " role="group" style={{width: '100%'}}>
        <a className="btn btn-primary text-center" type="button">
          <SidebarButton
            glyphiconClass="glyphicon glyphicon-plus"
            txt="Add Directory"
            id={id}
            action='ADD_DIRECTORY'>
          </SidebarButton>
        </a>

        <Link to={{ pathname:'/notice/new', state: { prevPath: id } }} className="btn btn-primary text-center" type="button">
          <SidebarButton
            glyphiconClass="glyphicon glyphicon-pencil"
            txt="Add Notice"
            id={id}>
          </SidebarButton>
        </Link>

        <a className="btn btn-primary text-center" type="button">
          <SidebarButton
            glyphiconClass="glyphicon glyphicon-remove"
            txt="Remove"
            action='DELETE_DIRECTORY'
            id={id}>
          </SidebarButton>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
Sidebar.propTypes = { params: React.PropTypes.string };
