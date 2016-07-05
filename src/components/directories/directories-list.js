import React from 'react';
import NoticeStore from '../../stores/store';
import Directory from './directory-single';
import AppConstants from '../../constants/constants';
import AppActions from '../../actions/actions';

export default class DirectoriesList extends React.Component{
  constructor(props){
    super(props)
    this.state = {dirsList:[]};
    this.createList = this.createList.bind(this);
    this.created = this.created.bind(this);
  }

  createList (event){
    console.log(event);
    this.setState({
      dirsList: event.item.data
          .map( key => <Directory
            key={key.id}
            id={key.id}
            name={key.name}
            isSub={false}
            parent={true}
            parentId={ key.parentId }
            subDirectories={key.children}
          /> )
    });
  }

  created(event){
    console.log(event);
  }

  componentWillMount(){
    NoticeStore.addChangeListener(AppConstants.DIRECTORY_ADDED, this.created);
    NoticeStore.addChangeListener(AppConstants.LOAD_DIRECTORIES, this.createList);
  }

  componentDidMount(){
    AppActions.fireAction.bind(null, 'LOAD_DIRECTORIES', {data: []})();
  }

  componentWillUnmount(){
    NoticeStore.removeChangeListener(AppConstants.DIRECTORY_ADDED, this.created);
    NoticeStore.removeChangeListener(AppConstants.LOAD_DIRECTORIES, this.createList);
  }

	render(){
    return (
      <div className="col-xs-3" style={{border:'1px solid'}}>
        <div className="col-xs-12">
          <ul className="list-unstyled">
            { this.state.dirsList }
          </ul>
        </div>
      </div>
    );
  }
}
