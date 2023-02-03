import { combineReducers } from 'redux';
import { isModalOpen, getCurrentItem } from './reducers';

const rootReducer = combineReducers({
	isModalOpen,
    getCurrentItem,
});

export default rootReducer;