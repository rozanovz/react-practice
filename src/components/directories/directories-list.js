import React from 'react';
import Directory from './directory-single';
import NoticeStore from '../../stores/store';

export default (props) => {

  let CreateList = () => {
    return NoticeStore.getDirs().map((key)=>{
      return <Directory
        key={key.id}
        id={key.id}
        name={key.name}
        isSub={false}
        parent={true}
        subDirectories={key.subDirectories}/>
    });
  }

	return (
    <div className="col-xs-3" style={{border:'1px solid'}}>
      <div className="col-xs-12">
        <ul className="list-unstyled">
          { CreateList() }
        </ul>
      </div>
    </div>
	);
}
