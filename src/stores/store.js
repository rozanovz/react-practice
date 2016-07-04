import { EventEmitter } from 'events';
import AppConstants from '../constants/constants';
import { dispatch, register } from '../dispatchers/dispatcher';
import axios from 'axios';

const NoticeStore = Object.assign(EventEmitter.prototype, {
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
		return axios.get('/directories').then(response => NoticeStore.collect(response.data, response.data));
	},

	collect(arrToChange, originalArr) {
	    arrToChange.forEach((key)=>{
	    	key.children = [];
	    	originalArr.forEach((ckey)=>{
		        if(key.id == ckey.parentId){
		          key.children = [...key.children, ckey];
		        }
	    	});
	    	this.collect(key.children, originalArr);
	    });
	    return [arrToChange[0]];
  	},

	createDir(id){
		return axios({
		  method: 'post',
		  url: '/directories',
		  data: {
		    parentId: id,
		    name: `${id} Flin`
		  }
		}).then((res)=>{
			console.log(res)
			NoticeStore.emitChange('DIRECTORY_ADDED', res.data);
		});
	},



	getNoticesById (params) {
		return NoticeStore.notices.filter(notice => notice.id === Number(params));
	},

	updateNotice(notice){
		return NoticeStore.notices = NoticeStore.notices.filter(item => item.id !== notice.id);
	},

	createNotice(action){
		return axios({
		  method: 'post',
		  url: '/notices',
		  data: {
				directoryId: 2, 
				title: action.item.title, 
				description: action.description, 
				tags: action.item.tags
			}
		}).then((res)=>{console.log(res)});
	},

	dispatcherIndex: register(function(action){
		switch (action.actionType) {
			case AppConstants.LOAD_NOTICES:
				return axios.get('/notices').then(response => {
					action.item.data = response.data;
					return NoticeStore.emitChange(action.actionType, action);
				});
				break;

			case AppConstants.ADD_NOTICE:
				NoticeStore.createNotice(action);
				break;

			case AppConstants.UPDATE_NOTICE:
				NoticeStore.updateNotice(action.item);
				break;

			case AppConstants.ADD_DIRECTORY:
				NoticeStore.createDir(action.item.id);
				break;
		}

	NoticeStore.emitChange(action.actionType, action);
	})
});

export default NoticeStore;
