import { OPEN_MODAL, CLOSE_MODAL, CURRENT_ITEM, FETCH_ALL_DATA } from "./types";
// import axios from 'axios';

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

// export const fetchAllDataAction = (data) => (dispatch) => {
//     return dispatch({
//         type: FETCH_ALL_DATA,
//         payload: data
//     })
// }

// export const fetchAllData = () => (dispatch) => {
//     return axios.get(`http://localhost:3001/dashboard`).then((res) => {
//         dispatch(fetchAllDataAction(Object.entries((res.data))));
//     })
// }