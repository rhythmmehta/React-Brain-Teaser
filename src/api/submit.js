import * as api from './api';
import config from '../config.js';

export function postResults(email,apples,oranges,mixed, result) {
    return api.post(`${config.serverUrl}/api/users?email=${email}&apples=${apples}&oranges=${oranges}&mixed=${mixed}&result=${result}`);
}
export function getUsers(){
    return api.get(`${config.serverUrl}/api/users`);
}
