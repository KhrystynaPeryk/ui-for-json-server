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

export const currentItemAction = (objItem) => (dispatch) => {
    return dispatch({
        type: CURRENT_ITEM,
        payload: objItem
    })
}

export const fetchAllDataAction = (data) => (dispatch) => {
    return dispatch({
        type: FETCH_ALL_DATA,
        payload: data
    })
}

export const dataUpdateAction = (objItem) => (dispatch) => {
    return dispatch({
        type: DATA_UPDATE,
        payload: objItem
    })
}
