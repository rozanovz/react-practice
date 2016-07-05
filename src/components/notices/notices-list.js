import React from 'react';
import NoticeIcon from './notice-icon';
import NoticeStore from '../../stores/store';
import AppActions from '../../actions/actions';
import AppConstants from '../../constants/constants';

export default class NoticesList extends React.Component {
	constructor(props){
		super(props);
		console.log(props);
		this.state = {
			noticesItems: [],
			activeFolder: ''
		}
		this.loadNotices = this.loadNotices.bind(this);
		this.dirNameChanged = this.dirNameChanged.bind(this);
	}

	componentWillMount(){
		NoticeStore.addChangeListener(AppConstants.LOAD_NOTICES, this.loadNotices);
		NoticeStore.addChangeListener(AppConstants.DIRECTORY_HEADING_WAS_CHANGED, this.dirNameChanged);
	}

	componentWillUnmount(){
		NoticeStore.removeChangeListener(AppConstants.LOAD_NOTICES, this.loadNotices);
		NoticeStore.addChangeListener(AppConstants.DIRECTORY_HEADING_WAS_CHANGED, this.dirNameChanged);
	}

	dirNameChanged(event) {
		if(this.props.folderId.directoryId == event.item.id)
			this.setState({activeFolder: event.item.name});
	}

	loadNotices(event){
		this.setState({
			noticesItems: event.item.data,
			activeFolder: event.item.name
		});
	}

	render () {
		return (
			<div className="col-xs-3">
				<h1>{this.state.activeFolder}</h1>
				<ul className="list-inline">
					{this.state.noticesItems.map(notice => notice.directoryId == this.props.folderId.directoryId ? <NoticeIcon key={notice.id} item={notice} /> : null)}
				</ul>
			</div>
		);
	}
};
