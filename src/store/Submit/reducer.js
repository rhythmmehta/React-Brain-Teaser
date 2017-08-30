import {
  SUBMIT_RESULTS_FETCH,
  SUBMIT_RESULTS_SUCCESS,
  SUBMIT_RESULTS_FAILURE,

} from './actions';

export function submit(state = {
    isFetching: false,
    result: null,
    message: null
}, action) {
    switch (action.type) {
        case SUBMIT_RESULTS_FETCH:
            return Object.assign({}, state, {
            isFetching: true,
            message: null,
            result: null
        })
        case SUBMIT_RESULTS_SUCCESS:
            return Object.assign({}, state, {
            isFetching: false,
            result: action.results
        })
        case SUBMIT_RESULTS_FAILURE:
            return Object.assign({}, state, {
            isFetching: false,
            result: null,
            message: action.message
        })
        default:
            return state
    }
}
