import React from 'react';
import AppActions from '../../actions/actions';
import NoticeStore from '../../stores/store';
import AppConstants from '../../constants/constants';

export default class Heading extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      shouldBeViewed: false,
      name: this.props.params.name ? this.props.params.name : this.props.params.item.title
    };
    this.toggle = this.toggle.bind(this);
    this.toggleOnEvent = this.toggleOnEvent.bind(this);
    this.headingWillChange = AppActions.fireAction.bind(null, 'HEADING_WILL_CHANGE', {id: this.state.id});
  }

  componentWillMount(){
    NoticeStore.addChangeListener(AppConstants.HEADING_WILL_CHANGE, this.toggleOnEvent);
  }

  componentWillUnmount(){
    NoticeStore.removeChangeListener(AppConstants.HEADING_WILL_CHANGE, this.toggleOnEvent);
  }

  toggleOnEvent(event){
    if(this.state.id !== event.item.id) this.setState({shouldBeViewed: false});
  }

  toggle(e) {
    if(parseInt(e.keyCode) === 13){
      this.setState({shouldBeViewed: !this.state.shouldBeViewed, name:e.target.value});
      AppActions.fireAction.bind(null, this.props.action, {txt: e.target.value, data: this.props.params})();
    }
    else if (e.type === 'click') {
      this.setState({shouldBeViewed: !this.state.shouldBeViewed});
      this.headingWillChange();
    }
  }

  render() {
    return (
      <span style={{paddingLeft: 10}}>
        <span onClick={this.toggle} style={{display:!this.state.shouldBeViewed ? 'inline-block' : 'none'}} >{this.state.name}</span>
        <input style={{display:this.state.shouldBeViewed ? 'inline-block' : 'none'}} defaultValue={this.state.name} onKeyUp={this.toggle} type="text"/>
      </span>
    );
  }
}
