import {
  GET_USERS_FETCH,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,

} from './actions';

export function results(state = {
    isFetching: false,
    result: null
}, action) {
    switch (action.type) {
        case GET_USERS_FETCH:
            return Object.assign({}, state, {
            isFetching: true,
            result: null
        })
        case GET_USERS_SUCCESS:
            return Object.assign({}, state, {
            isFetching: false,
            result: action.result
        })
        case GET_USERS_FAILURE:
            return Object.assign({}, state, {
            isFetching: false,
            result: null
        })
        default:
            return state
    }
}
