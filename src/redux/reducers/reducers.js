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
        // case DELETE_EMAIL:
        //     const emailIdToDelete = payload;
        //     const emailArray = state.info.team_email
        //     emailArray.splice(emailIdToDelete, 1)
        //     console.log(emailIdToDelete)
        //     console.log(state)
		// 	return {
		// 		...state,
		// 		info: emailArray,
		// 	};
        default:
            return state;
  }
}

// export function getAllData(state = [], action) {
//     const { type, payload } = action;
//     switch (type) {
//         case FETCH_ALL_DATA:
//             return {
//                 ...state,
//                 data: payload
//             }
//         default:
//             return state;
//     }
// }
