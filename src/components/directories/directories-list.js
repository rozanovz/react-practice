import React from 'react';
import NoticeStore from '../../stores/store';
import Directory from './directory-single';
import AppConstants from '../../constants/constants';


export default class DirectoriesList extends React.Component{
  constructor(props){
    super(props)
    this.state = {dirsList:[]};
    this.created = this.created.bind(this);
  }

  CreateList (){
    return NoticeStore.getDirs()
    .then(list => {
      this.setState({
        dirsList: list
            .map( key => <Directory 
              key={key.id} 
              id={key.id} 
              name={key.name} 
              isSub={false} 
              parent={true} 
              subDirectories={key.children} 
            /> )
      });
    });
  }

  created(event){
    console.log(event);
  }

  componentWillMount(){
    NoticeStore.addChangeListener(AppConstants.DIRECTORY_ADDED, this.created);
    this.CreateList();
  }

  componentWillUnmount(){
    NoticeStore.removeChangeListener(AppConstants.DIRECTORY_ADDED, this.created);
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
