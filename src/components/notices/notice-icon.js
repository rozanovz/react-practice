import React from 'react';
import { Link } from 'react-router';
import Heading from '../heading/heading'

export default (props) => {
  return (
    <li className="text-center">
      <Link to={{pathname:`/notice/${props.item.id}`, query:{directoryId:props.directoryId}}}><h1 className="glyphicon glyphicon-file"></h1></Link>
      <p>
        <Heading txt={props.item.title}/>
      </p>
    </li>
  );
}
