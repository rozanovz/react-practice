import React from 'react';
import Sidebar from './sidebar/sidebar';
import DirectoriesList from './directories/directories-list';
import NoticesList from './notices/notices-list';

const Home = (props) => {
	return (
		<div>
			<Sidebar params={props.location.query.directoryId}/>
			<DirectoriesList />
			<NoticesList folderId={props.location.query.directoryId}/>
		</div>
	);
}
export default Home;

Home.propTypes = { params: React.PropTypes.object };
