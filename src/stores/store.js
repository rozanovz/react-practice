import {EventEmitter} from 'events';
import AppConstants from '../constants/constants';
import {dispatch, register} from '../dispatchers/dispatcher';
import noticesStore from './noticesStore';
import directoriesStore from './directoriesStore';

const NoticeStore = Object.assign(EventEmitter.prototype, {
  _maxListeners: Infinity,

  emitChange(CHANGE_EVENT, params) { this.emit(CHANGE_EVENT, params); },
  addChangeListener(CHANGE_EVENT, callback) { this.on(CHANGE_EVENT, callback); },
  removeChangeListener(CHANGE_EVENT, callback) { this.removeListener(CHANGE_EVENT, callback); },

  dispatcherIndex: register(function(action) {
    switch (action.actionType) {
      case AppConstants.LOAD_NOTICES:
        noticesStore.getNotices(action).then(res => NoticeStore.emitChange(action.actionType, res));
        break;
      case AppConstants.LOAD_NOTICE_BY_ID:
        noticesStore.getNoticeById(action).then(res => NoticeStore.emitChange(action.actionType, res));
        break;
      case AppConstants.ADD_NOTICE:
        noticesStore.createNotice(action).then(res => console.log(res));
        break;
      case AppConstants.UPDATE_NOTICE:
        noticesStore.updateNotice(action).then(res => console.log(res));
        break;
      case AppConstants.DELETE_NOTICE:
        noticesStore.deleteNotice(action).then(res => console.log(res));
        break;

      case AppConstants.LOAD_DIRECTORIES:
        directoriesStore.getDirs(action).then(res => NoticeStore.emitChange(action.actionType, res));
        break;
      case AppConstants.ADD_DIRECTORY:
        directoriesStore.createDir(action.item.id).then(res => NoticeStore.emitChange(action.actionType, res));
        break;
      case AppConstants.UPDATE_DIRECTORY:
        directoriesStore.updateDirectory(action).then(res => console.log(res));
        break;
      case AppConstants.DELETE_DIRECTORY:
        directoriesStore.deleteDirectory(action).then(res => NoticeStore.emitChange(action.actionType, res.data));
        break;

      default:
        NoticeStore.emitChange(action.actionType, action);
        break;
    };
  })
});

export default NoticeStore;
