import { RefreshToken } from "@/lib/interface/RefreshToken";

export const getAuthorizeGuest = (): RefreshToken => {
    const Auth = window.sessionStorage.getItem("refresh-token");
    const parseJSON = JSON.parse(Auth ? atob(Auth) : "");
    return parseJSON;
};