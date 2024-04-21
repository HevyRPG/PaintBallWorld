import axios from "axios";
import Cookies from "js-cookie";
import APIKEYS from "../APIKEYS";

export const fetchUserProfile = async () => {
  const token = Cookies.get("authToken");
  try {
    const response = await axios.get("/api/User/User/profile", {
      headers: {
        ...APIKEYS.headers,
        Authorization: `Bearer ${token}`, // Append Authorization header
      },
    });

    return response.data; // Zwraca dane z odpowiedzi
  } catch (error) {
    console.error("Błąd podczas pobierania profilu użytkownika:", error);
    throw error; // Rzuć błąd, aby mógł być obsłużony w komponencie wywołującym funkcję
  }
};

export const changeEmail = async (newEmail) => {
  try {
    const response = await fetch("/api/change-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: newEmail }),
    });
    const data = await response.json();
  } catch (error) {
    console.error("Błąd podczas zmiany adresu e-mail:", error);
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const token = Cookies.get("authToken");
    console.log(oldPassword, newPassword);

    const response = await axios.put(
      "/api/auth/ChangePassword",
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

export const deleteAccount = async () => {
  const token = Cookies.get("authToken");
  const username = Cookies.get("username");

  try {
    const response = await axios.delete("/api/auth/Login/DeleteAccount", {
      data: { username },
      headers: {
        ...APIKEYS.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Konto zostało pomyślnie usunięte.");
  } catch (error) {
    console.error("Błąd podczas usuwania konta:", error);
  }
};
