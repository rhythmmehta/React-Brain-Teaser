import {postResults} from '../../api/submit';

export const SUBMIT_RESULTS_FETCH='SUBMIT_RESULTS_FETCH';
export const SUBMIT_RESULTS_SUCCESS='SUBMIT_RESULTS_SUCCESS';
export const SUBMIT_RESULTS_FAILURE='SUBMIT_RESULTS_FAILURE';


export function initiateSubmit() {
    return {
        type: SUBMIT_RESULTS_FETCH
    }
}

export function submitResultsSuccess(data) {
    return {
        type: SUBMIT_RESULTS_SUCCESS,
        result: data
    }
}

export function submitResultsFailure(message) {
    return {
        type: SUBMIT_RESULTS_FAILURE,
    }
}

export function storeResults(useremail,applesans,orangesans,mixedans, results){
    return async (dispatch, getState) => {
        try{
            dispatch(initiateSubmit());


            let result = await postResults(useremail,applesans,orangesans,mixedans, results);

            if(result) {
                dispatch(submitResultsSuccess(result))
            }
        }
        catch(e) {
            console.log(e);
            dispatch(submitResultsFailure());
        }
    }
}
