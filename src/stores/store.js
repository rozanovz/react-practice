import { EventEmitter } from 'events';
import AppConstants from '../constants/constants';
import dummyNotices from '../dymmyData/dummyNotices';
import { dispatch, register } from '../dispatchers/dispatcher';
import dymmyDirs from '../dymmyData/dymmyDirs'

let notices = dummyNotices();
let directories = dymmyDirs();

const NoticeStore = Object.assign(EventEmitter.prototype, {
	directories: directories,
	notices: notices,
	_maxListeners: Infinity,



	emitChange (CHANGE_EVENT, params) {
		this.emit(CHANGE_EVENT, params);
	},
	addChangeListener (CHANGE_EVENT, callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener (CHANGE_EVENT ,callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},



	getDirs(){
		return NoticeStore.directories;
	},

	geDirectoryNotices(id) {
		return {
			noticesItems: id ? NoticeStore.getNoticesByDirId(id) : [],
			activeFolder: id ? NoticeStore.getDirNameById(id): ""
		};
	},

	getDirNameById(id){
		let dirName;
		let filterDirs = (dirslist = []) => {
			return dirslist.forEach(item => (item.id == id) ? (dirName = item.name) : filterDirs(item.subDirectories));
		};
		filterDirs(NoticeStore.directories);
		return dirName;
	},

	getNoticesByDirId (params) {
		return NoticeStore.notices.filter(notice => notice.directoryId === Number(params));
	},

	getNoticesById (params) {
		return NoticeStore.notices.filter(notice => notice.id === Number(params));
	},

	updateNotice(notice){
		return NoticeStore.notices = NoticeStore.notices.filter(item => item.id !== notice.id);
	},

  dispatcherIndex: register(function(action){
		switch (action.actionType) {
			case AppConstants.LOAD_NOTICES:
				action.data = NoticeStore.getNoticesByDirId(action.item.id);
				break;

			case AppConstants.UPDATE_NOTICE:
				NoticeStore.updateNotice(action.item);
				break;
		}

    NoticeStore.emitChange(action.actionType, action);
  })
});

export default NoticeStore;
