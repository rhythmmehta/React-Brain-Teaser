import { combineReducers } from 'redux'
import { writeData } from './Database/reducers';
import { toaster } from './Toaster/reducer';

const rootReducer = combineReducers({
    writeData,
    toaster
})



export default rootReducer
