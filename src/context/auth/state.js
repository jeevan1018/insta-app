import { useReducer } from "react";
import Reducer from "./reducer";
import { Actions } from "./actions";
import service from "../../services/";
import Cookies from "js-cookie";
import { fetchDomainName } from "../../helpers";
import { NEWSLETTER_SUBSCRIPTION_URL } from "../../helpers/ConstantUrls";
import getBaseUrl from "../../services/baseUrls";
import logout from "../../helpers/logout";
import { WORKSPACE_MODE } from "../../hooks/useWorkspaceMode";

export const initialState = {
  userInfo: null,
};

export const AuthState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

 



 

  // ✅ UPDATE USER
  const updateUserDetails = async (username = "", phoneNumber = "") => {
    const [firstName = "", lastName = ""] = username.split(" ");

    const body = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(phoneNumber && { phoneNumber }),
    };

    try {
      const response = await service?.fetchPut(
        "/tenant-user",
        body,
        Cookies.get("usertoken"),
        "auth"
      );

      return response?.[0]
        ? [true]
        : [false, { message: "Update failed" }];
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  // ✅ GOOGLE LOGIN (FIXED TEMPLATE STRING)
  const continueWithGoogle = (referralCode = false, companion = "") => {
    const encodedReferral = referralCode
      ? encodeURIComponent(referralCode)
      : "";

    const redirectUri = `${window.location.origin}/user/verify-oauth-user`;

    const params = new URLSearchParams({
      redirectUri,
      ...(encodedReferral && { referralCode: encodedReferral }),
    });

    const authBaseUrl = getBaseUrl({ type: "auth" });

    window.location.href = `${authBaseUrl}/google/url?${params}`;
  };

  // ✅ REFRESH TOKEN
  const getNewAccessToken = async () => {
    try {
      const response = await service.fetchPost(
        "/refresh-token",
        null,
        Cookies.get("usertoken"),
        "auth"
      );

      if (response?.[2] === 401) logout();

      return response?.[0]
        ? [true, response[1]]
        : [false];
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  };

  return {
    ...state,

    updateUserDetails,
    continueWithGoogle,
    getNewAccessToken,
  };
};