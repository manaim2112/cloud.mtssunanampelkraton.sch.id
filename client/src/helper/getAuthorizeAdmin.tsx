import { RefreshAdmin } from "@/lib/interface/RefreshAdmin";

export const getAuthorizeAdmin = () : RefreshAdmin | null => {
    try {
      const Auth = window.sessionStorage.getItem("refresh-admin");
      const parseJSON = JSON.parse(Auth ? atob(Auth) : "");
      return parseJSON;
    } catch (error) {
      return null;
    }
  };