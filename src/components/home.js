import React from 'react';
import Sidebar from './sidebar/sidebar';
import DirectoriesList from './directories/directories-list';
import NoticesList from './notices/notices-list';

export default (props) => {
	return (
		<div className="row">
			<Sidebar params={props.location.query.directoryId}/>
			<DirectoriesList />
			<NoticesList folderId={props.location.query}/>
		</div>
	);
}
