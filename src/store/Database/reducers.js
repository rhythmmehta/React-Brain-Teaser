import {
IS_WRITING,
WRITE_FAILURE
} from './actions';


export function writeData( state= {
    isWrting: false,
    error: null
},action){
    switch (action.item) {
        case IS_WRITING:
            return Object.assign({}, state,{
                isWriting: true
            })
        case WRITE_FAILURE:
            return Object.assign({}, state,{
                isWriting: false,
                error: 'Failed'
            })
        default:
            return state;
    }
};
