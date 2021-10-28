export const isAuthenticated = () => {
    let token = localStorage.getItem('token');

    if(token !== "" && token !== null && token !== undefined) {
        return true;
    }

    return false;
};
