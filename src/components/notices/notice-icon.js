import React from 'react';
import { Link } from 'react-router';
import Heading from '../heading/heading'
import RemoveIcon from './notice-remove-icon';

export default (props) => {
  return (
    <li className="text-center">
      <RemoveIcon id={props.item.id}></RemoveIcon>
      <Link to={{pathname:`/notice/${props.item.id}`, state:{directoryId:props.directoryId}}}><h1 className="glyphicon glyphicon-file"></h1></Link>
      <p>
        <Heading params={props} action="UPDATE_NOTICE"/>
      </p>
    </li>
  );
}
