import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  createdPosts: [],
  savedPosts: [],
  loadingLoginAnimating: false
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.setCreatedPosts:
    return update(state, {
      createdPosts: { $set: action.createdPosts }
    });
  case types.setLoadingLoginAnimating:
    return update(state, {
      loadingLoginAnimating: { $set: action.loadingLoginAnimating }
    });
  default:
    return state;
  }
};

export default user;
