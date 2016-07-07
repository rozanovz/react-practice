import axios from 'axios';

const directoriesStore = {
  collect(arrToChange, originalArr) {
    arrToChange.forEach((key) => {
      key.children = [];
      originalArr.forEach((ckey) => {
        if (key.id == ckey.parentId) {
          key.children = [...key.children, ckey];
          this.collect(key.children, originalArr);
        }
      });
    });
    return [arrToChange[0]];
  },

  getDirs(action) {
    return axios.get('/directories')
    .then(response => {
      action.item.data = this.collect(response.data, response.data);
      return action;
    });
  },

  createDir(id) {
    return axios({
      method: 'post',
      url: '/directories',
      data: {
        parentId: id,
        name: `New Folder`
      }
    }).then(()=>{
      let dirs;
      return directoriesStore.getDirs({item:{}}).then(res => res);
    });
  },

  deleteDirectory(action) {
    if(action.item.id == 1) return `root direcory can't be deleted`;
    return axios({
      method: 'delete',
      url: `/directories/${action.item.id}`
    })
  },

  updateDirectory(action) {
    return axios({
      method: 'put',
      url: `/directories/${action.item.data.id}`,
      data: {
        'name': action.item.txt ? action.item.txt : action.item.data.name,
        'id': action.item.data.id,
        'parentId': action.item.parentId
      }
    })
  }
};

export default directoriesStore;
