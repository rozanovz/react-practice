import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import Heading from '../heading/heading'
import NoticeStore from '../../stores/store';
import AppActions from '../../actions/actions';
import AppConstants from '../../constants/constants';

let ulStyles = {
  listStyleType: 'none',
  paddingLeft: 25
};

export default class Directory extends React.Component {
  constructor(props){
		super(props);
    this.state = { showChildren: false , shouldIExist: true};
    this.isActive = this.isActive.bind(this);
    this.makeAction = this.makeAction.bind(this);
    this.createchildrenList = this.createchildrenList.bind(this);
    this.removeDirectory = this.removeDirectory.bind(this);
	}

  createchildrenList(){
    let list = this.props.children.map((sub)=>{
      return <Directory
        key={sub.id}
        id={sub.id}
        name={sub.name}
        isSub={true}
        parent={true}
        parentId={ sub.parentId }
        children={sub.children.length > 0 ? sub.children : null}/>
    })
    return <ul style={ulStyles}>{list}</ul>;
  }

  makeAction(){
    AppActions.fireAction.bind(null, 'TOGGLE_DIR', {state:this.state.showChildren, id: this.props.id})();
    AppActions.fireAction.bind(null, 'LOAD_NOTICES', {id: this.props.id, name: this.props.name})();
  }

  isActive(event){
    (parseInt(event.item.id) == parseInt(this.props.id)) ?
       this.setState({showChildren: !event.item.state}) : false
  }

  removeDirectory (event) {
    if(event.id == this.props.id) this.setState({shouldIExist:false});
  }

  componentWillMount(){
    NoticeStore.addChangeListener(AppConstants.DELETE_DIRECTORY, this.removeDirectory);
    NoticeStore.addChangeListener(AppConstants.TOGGLE_DIR, this.isActive);
  }

  componentWillUnmount(){
    NoticeStore.addChangeListener(AppConstants.DELETE_DIRECTORY, this.removeDirectory);
    NoticeStore.removeChangeListener(AppConstants.TOGGLE_DIR, this.isActive);
  }

  render(){
    return this.state.shouldIExist ? (
      <li key={this.props.id} >
        <h4>
          <Link
            to={{pathname:"/", query:{directoryId:this.props.id}}}
            className={'glyphicon glyphicon-folder-close'}
            activeClassName='glyphicon-folder-open'
            onClick={this.makeAction}
          >
          </Link>
          <span>
            <Heading action="UPDATE_DIRECTORY" params={this.props}/>
          </span>
        </h4>
        {
          this.props.children
            ? (<span style={{'display':this.state.showChildren ? 'inherit' : 'none'}}>{this.createchildrenList()}</span>)
              : null
        }
      </li>
    ) : null;
  }
}
