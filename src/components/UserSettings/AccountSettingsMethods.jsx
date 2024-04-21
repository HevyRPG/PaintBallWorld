import axios from "axios";
import Cookies from "js-cookie";
import APIKEYS from "../APIKEYS";
import APIHeaders from "../APIHeaders";

export const fetchUserProfile = async () => {
  const token = Cookies.get("authToken");
  try {
    const response = await axios.get(
      "/api/User/User/profile",
       {
      headers: {
        ...APIKEYS.headers,
        Authorization: `Bearer ${token}`, // Append Authorization header
      },
      }
    );
  
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania profilu użytkownika:", error);
    throw error; // Rzuć błąd, aby mógł być obsłużony w komponencie wywołującym funkcję
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const token = Cookies.get("authToken");
    console.log(oldPassword, newPassword);

    const response = await axios.post(
      "/api/Auth/Login/ChangePassword",
      { oldPassword, newPassword },
      {
        headers: {
          ...APIKEYS.headers,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log("Hasło zostało zmienione pomyślnie.");
  } catch (error) {
    //console.error("Błąd podczas zmiany hasła:", error);
  }
};
