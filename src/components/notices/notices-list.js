import React from 'react';
import NoticeIcon from './notice-icon';
import NoticeStore from '../../stores/store';
import AppActions from '../../actions/actions';
import AppConstants from '../../constants/constants';

export default class NoticesList extends React.Component {
	constructor(props){
		super(props);
		this.state = NoticeStore.geDirectoryNotices(this.props.folderId.directoryId);
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
			noticesItems: event.data,
			activeFolder: event.item.name
		})
	}

	render () {
		return (
			<div className="col-xs-3">
				<h1>{this.state.activeFolder}</h1>
				<ul className="list-inline">
					{this.state.noticesItems.map(notice => <NoticeIcon key={notice.id} item={notice} />)}
				</ul>
			</div>
		);
	}
};
