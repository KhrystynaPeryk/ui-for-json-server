import { combineReducers } from 'redux';
import { isModalOpen, getCurrentItem, getAllData } from './reducers';

const rootReducer = combineReducers({
	isModalOpen,
    getCurrentItem,
    getAllData,
});

export default rootReducer;