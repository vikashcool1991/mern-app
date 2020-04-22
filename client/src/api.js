
const AUTH = '/api/v1/auth';
const API = '/api/v1';

const api = {
    login: AUTH + '/login',
    logout: AUTH + '/logout',  
    verify_token: AUTH + '/token-verify',
    sign_up: `${AUTH}/signup`,
    users: API + '/users',
    user: API + '/use',
    current_user: API + '/current_user',
    todos: API + '/todos',
    todo: API + '/todo',
    search: API + '/search',
}

export default api;
