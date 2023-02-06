import { OPEN_MODAL, CLOSE_MODAL, CURRENT_ITEM, FETCH_ALL_DATA, DATA_UPDATE } from '../actions/types';

export function isModalOpen(state = false, action) {
    const { type } = action;
    switch (type) {
        case OPEN_MODAL:
            return true;
        case CLOSE_MODAL:
            return false
        default:
            return state;
    }
}

export function getCurrentItem(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
        case CURRENT_ITEM:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
  }
}

export function getAllData(state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_ALL_DATA:
            return [
                ...state,
                ...payload
            ];
        case DATA_UPDATE:
            const updatedData = state.map((dataArrItem) => {
                if (dataArrItem[1].workspace_id === payload.info.workspace_id)
                dataArrItem[1] = payload.info;
                return dataArrItem;
            })
            console.log(updatedData)
            return [
                ...updatedData
            ]
        default:
            return state;
    }
}