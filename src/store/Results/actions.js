export const GET_USERS_FETCH='GET_USERS_FETCH';
export const GET_USERS_SUCCESS='GET_USERS_SUCCESS';
export const GET_USERS_FAILURE='GET_USERS_FAILURE';

export function initiateGetUsers() {
    return {
        type: GET_USERS_FETCH
    }
}

export function getUsersSuccess(data) {
    return {
        type: GET_USERS_SUCCESS,
        result: data
    }
}

export function getUsersFailure(message) {
    return {
        type: GET_USERS_FAILURE,
    }
}

export function getUsers(){
    return async (dispatch, getState) => {
        try{
            dispatch(initiateGetUsers());


            let result = await getUsers();

            if(result) {
                dispatch(getUsersSuccess(result))
            }
        }
        catch(e) {
            console.log(e);
            dispatch(getUsersFailure());
        }
    }
}
