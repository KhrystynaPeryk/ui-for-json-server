import { OPEN_MODAL, CLOSE_MODAL, CURRENT_ITEM, FETCH_ALL_DATA } from '../actions/types';

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
            return payload;
        default:
            return state;
  }
}

export function getAllData(state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_ALL_DATA:
            return {
                ...state,
                data: payload
            }
        default:
            return state;
    }
}


// export function fetchProducts(state = {
//   products: [],
//   category: '',
//   }, action) {
//     switch (action.type) {
//       case FETCH_PRODUCTS_ALL:
//         return {
//           ...state,
//           products: action.payload,
//           category: 'all',
//         }
//       case FETCH_PRODUCTS_TECH:
//         return {
//           ...state,
//           products: action.payload,
//           category: 'tech'
//         }
//       case FETCH_PRODUCTS_CLOTHES:
//         return {
//           ...state,
//           products: action.payload,
//           category: 'clothes'
//         }
//         default:
//           return state;
//     }
// }