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
      return directoriesStore.getDirs({item:{}}).then(res => res);
    });
  },

  updateDirectory(action) {
    console.log(action.item);
    return axios({
      method: 'put',
      url: `/directories/${action.item.id}`,
      data: {
        'name': action.item.name,
        'id': action.item.id,
        'parentId': action.item.parentId
      }
    })
  },

  deleteDirectory(action) {
    if(action.item.id == 1) return `root direcory can not be deleted`;
    return axios({
      method: 'delete',
      url: `/directories/${action.item.id}`
    })
  },
};

export default directoriesStore;
