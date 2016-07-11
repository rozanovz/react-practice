import React from 'react';
import { Link } from 'react-router';
import Heading from '../heading/heading'
import RemoveIcon from './notice-icon-remove';
import NoticeStore from '../../stores/store';

const NoticeIcon = (props) => {
  return (
    <li className="text-center">
      <sup style={{ top: '-2.5em', cursor: 'pointer' }}>
        <RemoveIcon id={props.item.id}></RemoveIcon>
      </sup>

      <Link to={{pathname:`/notice/${props.item.id}`, state:{directoryId:props.directoryId}}}>
        <h1 className="glyphicon glyphicon-file"></h1>
      </Link>

      <p>
        <Heading params={props.item} action="UPDATE_NOTICE"/>
      </p>
    </li>
  );
}

export default NoticeIcon;

NoticeIcon.propTypes = {
  item: React.PropTypes.shape({
    description: React.PropTypes.string,
    directoryId: React.PropTypes.string,
    id: React.PropTypes.number,
    position: React.PropTypes.number,
    tags: React.PropTypes.array,
    title: React.PropTypes.string,
  })
};
