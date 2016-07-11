import React from 'react';
import NoticeIcon from './notice-icon';
import AppConstants from '../../constants/constants';
import NoticeStore from '../../stores/store';

class NoticeIconContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {show: true};
    this.removeNotice = this.removeNotice.bind(this);
  }

  removeNotice(event){
    if(event.id == this.props.item.id) this.setState({show: false});
    console.log(this.state);
  }

  componentWillMount(){
    NoticeStore.addChangeListener(AppConstants.DELETE_NOTICE, this.removeNotice);
  }

  componentWillUnmount(){
    NoticeStore.removeChangeListener(AppConstants.DELETE_NOTICE, this.removeNotice);
  }

  render(){
    return this.state.show ? <NoticeIcon item={item} /> : null;
  }
}

export default NoticeIcon;

NoticeIconContainer.propTypes = {
  item: React.PropTypes.shape({
    description: React.PropTypes.string,
    directoryId: React.PropTypes.string,
    id: React.PropTypes.number,
    position: React.PropTypes.number,
    tags: React.PropTypes.array,
    title: React.PropTypes.string,
  })
};
