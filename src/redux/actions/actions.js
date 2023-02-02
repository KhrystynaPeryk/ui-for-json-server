import { OPEN_MODAL, CLOSE_MODAL, CURRENT_ITEM } from "./types";

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