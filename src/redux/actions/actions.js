import { OPEN_MODAL, CLOSE_MODAL, CURRENT_ITEM, FETCH_ALL_DATA, DATA_UPDATE } from "./types";

export const openModalAction = () => (dispatch) => {
	return dispatch({
		type: OPEN_MODAL,
	});
};

export const closeModalAction = () => (dispatch) => {
    return dispatch({
        type: CLOSE_MODAL,
    })
}

// storing a current item when you open Modal
export const currentItemAction = (objItem) => (dispatch) => {
    return dispatch({
        type: CURRENT_ITEM,
        payload: objItem
    })
}

// storing all data in a store on page load
export const fetchAllDataAction = (data) => (dispatch) => {
    return dispatch({
        type: FETCH_ALL_DATA,
        payload: data
    })
}

//when you edit the current item and click save, this action changes this item in a table
export const dataUpdateAction = (objItem) => (dispatch) => {
    return dispatch({
        type: DATA_UPDATE,
        payload: objItem
    })
}
