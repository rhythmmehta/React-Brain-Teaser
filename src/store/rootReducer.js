import { combineReducers } from 'redux'
import { submit } from './Submit/reducer';
import { results } from './Results/reducer';
import { toaster } from './Toaster/reducer';

const rootReducer = combineReducers({
    search,
    toaster,
    results
})



export default rootReducer
