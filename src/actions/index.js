import axios from 'axios';
import config from '../config';

export function changePageAction (page) {
  return {
    type: "CHANGE_PAGE",
    payload: page
  }
}

export function filterAction (text) {
  return {
    type: "LIST_FILTER_START",
    payload: text
  }
}

export function sorterAction (columnId, direction) {
  fetchThingsAction();
  return {
    type: "LIST_SORTER_START",
    payload: {
      columnId,
      direction
    }
  }
}

export function fetchThingsAction () {
  return function (dispatch) {
    axios.get(config.apiFetchList)
      .then((response) => dispatch({
        type: "FETCH_DATA_FROM_SERVER",
        payload: response.data
      }))
      .catch(function (error) {
        //console.log(error);
        alert("Server not available")
      });
  }
}

export function sendThingToServerAction (data) {
  return function (dispatch) {
    axios.post(config.apiAddThing, data)
      .then((response) => dispatch({
        type: "SEND_FORM_TO_SERVER",
        payload: response.data
      }))
      .catch(function (error) {
        //console.log(error);
        alert("Server not available")
      });
  }
}

export function removeThingAction (thingId) {
  return function (dispatch) {
    axios.get(config.apiRemoveThing + thingId)
      .then((response) => dispatch({
        type: "REMOVE_THING",
        payload: response.data
      }))
      .then(() => dispatch({
        type: "REMOVE_THING_END",
        payload: {status: false}
      }))
      .catch(function (error) {
        //console.log(error);
        alert("Server not available")
      });
  }
}
