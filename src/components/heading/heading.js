import React from 'react';
import AppActions from '../../actions/actions';
import NoticeStore from '../../stores/store';
import AppConstants from '../../constants/constants';

export default class Heading extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      shouldBeViewed: false,
      name: this.props.params.name ? this.props.params.name : this.props.params.title
    };

    this.toggle = this.toggle.bind(this);
    this.generateData = this.generateData.bind(this);
    this.fireAction = this.fireAction.bind(this);
    this.toggleOnEvent = this.toggleOnEvent.bind(this);
  }

  toggleOnEvent(event){
    if(this.state.id !== event.item.id)
      this.setState({shouldBeViewed: false});
  }

  generateData(val){
    return Object.assign({}, this.props.params, { name: val, title: val });
  }

  fireAction(state, action, data, isDirHeading){
    this.setState(state);
    AppActions.fireAction.bind(null, action, data)();
    if(this.props.params.children && isDirHeading)
      AppActions.fireAction.bind(null, 'DIRECTORY_HEADING_WAS_CHANGED', data)();
  }

  toggle(e){
    if(parseInt(e.keyCode) === 13)
      return this.fireAction({
        shouldBeViewed: !this.state.shouldBeViewed,
        name:e.target.value
      }, this.props.action, this.generateData(e.target.value), this.props.params.children ? true : false);
    else if (e.type === 'click')
      return this.fireAction({
        shouldBeViewed: !this.state.shouldBeViewed,
        name:this.state.name
      }, 'HEADING_WILL_CHANGE', {id: this.state.id}, false);
  }

  componentWillMount(){
    NoticeStore.addChangeListener(AppConstants.HEADING_WILL_CHANGE, this.toggleOnEvent);
  }

  componentWillUnmount(){
    NoticeStore.removeChangeListener(AppConstants.HEADING_WILL_CHANGE, this.toggleOnEvent);
  }

  render() {
    return (
      <span style={{paddingLeft: 10}}>
        <span onClick={this.toggle} style={{display:!this.state.shouldBeViewed ? 'inline-block' : 'none'}} >
          <strong>{this.state.name}</strong>
        </span>
        <input style={{display:this.state.shouldBeViewed ? 'inline-block' : 'none'}} defaultValue={this.state.name} onKeyUp={this.toggle} type="text"/>
      </span>
    );
  }
}

Heading.propTypes = {
  action: React.PropTypes.string,
  params: React.PropTypes.shape({
    "id": React.PropTypes.number,
    "name": React.PropTypes.string,
    "isSub": React.PropTypes.bool,
    "parent": React.PropTypes.bool,
    "children": React.PropTypes.array,
    "directoryId": React.PropTypes.string,
    "title": React.PropTypes.string,
    "description": React.PropTypes.string,
    "tags": React.PropTypes.array,
    "position": React.PropTypes.number
  })
};
