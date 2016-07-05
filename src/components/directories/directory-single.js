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
    this.state = { subDirsView: false , shouldIExist: true};
    this.isActive = this.isActive.bind(this);
    this.makeAction = this.makeAction.bind(this);
    this.createSubDirectoriesList = this.createSubDirectoriesList.bind(this);
    this.removeComp = this.removeComp.bind(this);
	}

  createSubDirectoriesList(){
    let list = this.props.subDirectories.map((sub)=>{
      return <Directory
        key={sub.id}
        id={sub.id}
        name={sub.name}
        isSub={true}
        parent={true}
        parentId={ sub.parentId }
        subDirectories={sub.children.length > 0 ? sub.children : null}/>
    })
    return <ul style={ulStyles}>{list}</ul>;
  }

  makeAction(){
    AppActions.fireAction.bind(null, 'TOGGLE_DIR', {state:this.state.subDirsView, id: this.props.id})();
    AppActions.fireAction.bind(null, 'LOAD_NOTICES', {id: this.props.id, name: this.props.name})();
  }

  isActive(event){
    if(parseInt(event.item.id) == parseInt(this.props.id)) {
       this.setState({subDirsView: !event.item.state});
    }
  }

  removeComp (event) {
    if(event.item.id == this.props.id) this.setState({shouldIExist:false});
  }

  componentWillMount(){
    NoticeStore.addChangeListener(AppConstants.REMOVE_DIRECTORY, this.removeComp);
    NoticeStore.addChangeListener(AppConstants.TOGGLE_DIR, this.isActive);
  }

  componentWillUnmount(){
    NoticeStore.addChangeListener(AppConstants.REMOVE_DIRECTORY, this.removeComp);
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
          <span><Heading txt={` ${this.props.name}`} id={ this.props.id } parentId={ this.props.parentId }/></span>
        </h4>
        {
          this.props.subDirectories
            ? (<span style={{'display':this.state.subDirsView ? 'inherit' : 'none'}}>{this.createSubDirectoriesList()}</span>)
              : null
        }
      </li>
    ) : null;
  }
}
