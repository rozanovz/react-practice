import axios from 'axios';

const noticesStore = {
  createNotice(action) {
    return axios({
      method: 'post',
      url: '/notices',
      data: {
        directoryId: 2,
        title: action.item.title,
        description: action.description,
        tags: action.item.tags
      }
    })
  },

  updateNotice(action) {
    return axios({
      method: 'put',
      url: `/notices/${action.item.id}`,
      data: {
        // directoryId: 2,
        // title: action.item.title,
        // description: action.description,
        // tags: action.item.tags
      }
    })
  },

  updateNoticePosition(action) {
    return axios({
      method: 'put',
      url: `/notices/${action.item.id}`,
      data: {
        // directoryId: 2,
        // title: action.item.title,
        // description: action.description,
        // tags: action.item.tags
      }
    })
  },

  deleteNotice(action) {
    return axios({
      method: 'put',
      url: `/notices/${action.item.id}`,
      data: {
        // directoryId: 2,
        // title: action.item.title,
        // description: action.description,
        // tags: action.item.tags
      }
    })
  },

  getNotices(action){
    return axios.get('/notices').then(response => {
      action.item.data = response.data;
      return action
    });
  },
};

export default noticesStore;
