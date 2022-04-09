const login = async (username, password) => {
    let response
    let options = {
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password

        }),
        headers: {
            'Content-Type': 'application/json',
            device_token: localStorage.getItem('deviceToken') ? localStorage.getItem('deviceToken') : '',
        },
    };
    let url = 'api/auth/signin';
    try {
        response = await fetch(url, options);
        let body = await response.json();
        return [body.errorCode === 0, body];
    }
    catch (error) {
        console.log(error);
        return [false, null];
    }
};
const getProvider = async () => {
    let response;
    let options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    options = createTokenHeader(options);
    let url = '/api/test/admin';
    try {
        response = await fetch(url, options);
        let body = await response.json();
        return [body.errorCode === 0, body]
    }
    catch (error) {
        if (response && response.statusText) {
            console.log(response.statusText)
        } else {
            console.log(error.message)
        }
        return [false, null];
    }
};
const createTokenHeader = (header) => {
    let token = getToken();
    console.log(token);
    // token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTcyNDkyNzcxLCJqdGkiOiJmNTE0MTQzYTIwNTU0ODkwOTNkNWEyZDQ2YTMxMjU2OCIsInVzZXJfaWQiOjh9.X1VfjHNv450z4uyQ2-YSuPB2p5ma5G0_OPdpcSFQ8yA';
    if (token) {
        header.headers.Authorization = `Bearer ${token}`;
    }
    return header;
}
const getToken = () => {
    return localStorage['/api/auth/signin'];
}
export const LoginService = {
    login,
    getProvider,
    createTokenHeader,
    getToken,

}; 