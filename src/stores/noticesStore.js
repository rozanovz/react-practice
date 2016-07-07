import axios from 'axios';

const noticesStore = {
  getNoticeById(action){
    return axios.get('/notices').then(response => {
      action.item.data = response.data.filter((key)=>key.id == action.item.id);
      return action;
    });
  },

  getNotices(action){
    return axios.get('/notices').then(response => {
      action.item.data = response.data;
      return action
    });
  },

  createNotice(action) {
    return axios({
      method: 'post',
      url: '/notices',
      data: {
        directoryId: action.item.directoryId,
        title: action.item.title,
        description: action.item.description,
        tags: action.item.tags
      }
    })
  },

  updateNotice(action) {
    if(action.item.txt) action.item.data.item.title = action.item.txt;
    return axios({
      method: 'put',
      url: `/notices/${action.item.id ? action.item.id : action.item.data.item.id}`,
      data: {
        position:    action.item.position    ? action.item.position    : action.item.data.item.position   ,
        directoryId: action.item.directoryId ? action.item.directoryId : action.item.data.item.directoryId,
        title:       action.item.title       ? action.item.title       : action.item.data.item.title      ,
        description: action.item.description ? action.item.description : action.item.data.item.description,
        tags:        action.item.tags        ? action.item.tags        : action.item.data.item.tags       ,
        id:          action.item.id          ? action.item.id          : action.item.data.item.id
      }
    })
  },

  deleteNotice(action) {
    return axios({
      method: 'delete',
      url: `/notices/${action.item.id}`,
    })
  }
};

export default noticesStore;
