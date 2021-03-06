import * as types from './actionTypes';
// import {SERVER_ADDR, ENDPOINT_IMAGE, HTTP,
//   queryBuilder, createQueryObject} from '../utils'; We will use later
import {queryBuilder, createQueryObject} from '../utils';
import ItemRESTManager from '../services/itemService';
import { getAccessToken } from './authActions';
import { HTTPS, SERVER_ADDR, ENDPOINT_IMAGE, getAuthHeaders} from '../utils';


export function TBD() {
  return {
    type: types.TBD
  };
}

export const receiveItems = (json) => {
  return {
    type: types.getAllItems,
    items: json.items
  };
};

// todo: refactor getting item function in mapActions
// TODO: remove console statement
export const getAllItems = (zoomLevel, lat, long) => {
  return (dispatch) => {
    return ItemRESTManager.getByArea(zoomLevel, lat, long)
      .then(json => dispatch(receiveItems(json)))
      .catch(console.log); // eslint-disable-line no-console
  };
};

export const receiveImages = (json) => {
  return {
    type: types.getDetailImage,
    items: json.values
  };
};

export const receiveUpdate = (json) => {
  return {
    type: types.needUpdate,
    items: json.items
  };
};


export const needUpdate = (zoomLevel, lat, long) => {
  return (dispatch) => {
    ItemRESTManager.getByArea(zoomLevel, lat, long)
      .then(json => dispatch(receiveUpdate(json)))
      .catch(console.log); // eslint-disable-line no-console
  };
};

export const setPostedKey = (itemKey) => {
  return {
    type: types.setPostedKey,
    itemKey
  };
};

export const setPostedUri = (uri) => {
  return {
    type: types.setPostedUri,
    uri
  };
};

export const getDetailImage = (key) => {
  return (dispatch) => {
    const queries = [];
    queries.push(createQueryObject('item', key));
    // const address = `${HTTP}${'SERVER_ADDR'}${ENDPOINT_IMAGE}${queryBuilder(queries)}`;
    // const address = `https://goober.herokuapp.com/api/images/${queryBuilder(queries)}`;
    return getAccessToken().then((accessToken) => {
      const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_IMAGE}/${queryBuilder(queries)}`;
      return getAuthHeaders(accessToken)
      .then(headers => {
        return fetch(address, {
          method: 'GET',
          headers
        });
      })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveImages(json));
        return json.values;
      })
      .catch(console.log); // eslint-disable-line no-console
    });
  };
};
