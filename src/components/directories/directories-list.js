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
  }

  createList (event){
    this.setState({
      dirsList: event.item.data
    });
  }

  componentWillMount(){
    NoticeStore.addChangeListener(AppConstants.ADD_DIRECTORY, this.createList);
    NoticeStore.addChangeListener(AppConstants.LOAD_DIRECTORIES, this.createList);
  }

  componentDidMount(){
    AppActions.fireAction.bind(null, 'LOAD_DIRECTORIES', {data: []})();
  }

  componentWillUnmount(){
    NoticeStore.removeChangeListener(AppConstants.ADD_DIRECTORY, this.createList);
    NoticeStore.removeChangeListener(AppConstants.LOAD_DIRECTORIES, this.createList);
  }

	render(){
    return (
      <div className="col-xs-3">
        <div className="row">
          <ul className="list-unstyled">
            { this.state.dirsList.map( key => <Directory
                key={key.id}
                id={key.id}
                name={key.name}
                isSub={false}
                parent={true}
                parentId={ key.parentId }
                children={key.children} /> ) }
          </ul>
        </div>
      </div>
    );
  }
}
