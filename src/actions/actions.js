import AppConstants from '../constants/constants';
import {
  dispatch,
  register
} from '../dispatchers/dispatcher';

export default {
  fireAction(action, item) {
    dispatch({
      actionType: AppConstants[action],
      item
    })
  }
}
