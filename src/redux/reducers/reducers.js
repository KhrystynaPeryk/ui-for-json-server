import { OPEN_MODAL, CLOSE_MODAL, CURRENT_ITEM } from '../actions/types';

export function isModalOpen( state = false, action) {
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

export function getCurrentItem( state = {}, action) {
    const { type, payload } = action;
    switch (type) {
        case CURRENT_ITEM:
            return payload;
        default:
            return state;
  }
}