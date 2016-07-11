import React from 'react';
import Sidebar from './sidebar/sidebar';
import DirectoriesList from './directories/directories-list';
import NoticesList from './notices/notices-list';
import NavBar from './navBar/navBar'

const Home = (props) => {
	return (
		<div>
			<div>
				<NavBar></NavBar>
			</div>
			<div className="container">
				<div className="row">
					<Sidebar params={props.location.query.directoryId}/>
					<DirectoriesList />
					<NoticesList folderId={props.location.query.directoryId}/>
				</div>
			</div>
		</div>
	);
}
export default Home;

Home.propTypes = { params: React.PropTypes.object };
