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
    const response = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await response.json();
  } catch (error) {
    console.error("Błąd podczas zmiany hasła:", error);
  }
};

// export const deleteAccount = async () => {
//   try {
//     const response = await fetch("/api/delete-account", {
//       method: "DELETE",
//       headers: {
//         // Dodaj tutaj nagłówki autoryzacyjne, jeśli są wymagane
//       },
//     });
//     const data = await response.json();
//   } catch (error) {
//     console.error("Błąd podczas usuwania konta:", error);
//   }
// };

export const deleteAccount = async (password) => {
  try {
    // Sprawdź hasło
    const passwordValid = await checkPassword(password);
    if (passwordValid) {
      // Usunięcie konta
      const response = await fetch("/api/delete-account", {
        method: "DELETE",
        headers: {
          // Dodaj tutaj nagłówki autoryzacyjne, jeśli są wymagane
        },
      });
      const data = await response.json();
      console.log(data); // Przetwarzanie odpowiedzi serwera
    } else {
      console.error("Niepoprawne hasło");
    }
  } catch (error) {
    console.error("Błąd podczas usuwania konta:", error);
  }
};

const checkPassword = async (password) => {
  try {
    const response = await fetch("/api/check-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error("Błąd podczas sprawdzania hasła:", error);
    return false;
  }
};
