import React from 'react';
import AppActions from '../../actions/actions';

let tagStyle = {
  padding: '.4em .8em .5em'
}

const Tag = (props)=>{
  return (
    <span>
      <span key={props.id} className="label label-info" onClick={AppActions.fireAction.bind(null, 'REMOVE_TAG', {tagName:props.tag})} style={tagStyle}>{`#${props.tag}`}</span> {" "}
    </span>
  )
}
export default Tag;
Tag.propTypes = {
  id: React.PropTypes.number,
  tag: React.PropTypes.string
};
