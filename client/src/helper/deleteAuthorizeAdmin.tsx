export const deleteAuthorizeAdmin = () : void => {
    return window.sessionStorage.removeItem("refresh-admin");
};