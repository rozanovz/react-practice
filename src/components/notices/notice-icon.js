import React from 'react';
import { Link } from 'react-router';
import Heading from '../heading/heading'
import RemoveIcon from './notice-remove-icon';
import AppConstants from '../../constants/constants';
import NoticeStore from '../../stores/store';

/* const NoticeIcon = (props) => */  class NoticeIcon extends React.Component {

  constructor(props){
    super(props)
    this.state = {show: true};
    this.removeNotice = this.removeNotice.bind(this);
  }

  removeNotice(event){
    if(event.id == this.props.item.id) this.setState({show: false});
  }

  componentWillMount(){
    NoticeStore.addChangeListener(AppConstants.DELETE_NOTICE, this.removeNotice);
  }

  componentWillUnmount(){
    NoticeStore.removeChangeListener(AppConstants.DELETE_NOTICE, this.removeNotice);
  }

  render(){
    return this.state.show ? (
      <li className="text-center">
        <sup style={{ top: '-2.5em', cursor: 'pointer' }}><RemoveIcon id={this.props.item.id}></RemoveIcon></sup>
        <Link to={{pathname:`/notice/${this.props.item.id}`, state:{directoryId:this.props.directoryId}}}><h1 className="glyphicon glyphicon-file"></h1></Link>
        <p>
          <Heading params={this.props.item} action="UPDATE_NOTICE"/>
        </p>
      </li>
    ) : null;
  }
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
