import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import FormInput from "../FormInput";
import {
  changeEmail,
  changePassword,
} from "../UserSettings/AccountSettingsMethods";
import { AuthContext } from "../../context/AuthContext";

const AccountSettings = () => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { deleteAccount  } = useContext(AuthContext)


  const handleDeleteAccount = () => {
    setShowPasswordInput(true);
  };

  const handleConfirmDelete = () => {
    deleteAccount();
  };

  const handleChangePassword = () => {
    if (newPassword === confirmNewPassword) {
      setPasswordsMatch(true);
      changePassword(oldPassword, newPassword);
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg p-12">
          <h2 className="text-3xl ml-2 font-bold sm:text-xl">
            Ustawienia konta
          </h2>

          <div className="grid mx-auto mt-4">
            <div className="items-center mt-8 sm:mt-14 ">
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="bg-secondary border border-secondary  rounded-xl w-full p-6 flex flex-col mb-4">
                  <FormInput
                    label="Zmień adres e-mail"
                    type="email"
                    name="email"
                    placeholder="email@gmail.com"
                    className="mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    variant="default"
                    className="p-2 rounded bg-primary text-white  self-end"
                    onClick={() => changeEmail(email)}
                  >
                    Zapisz email
                  </Button>
                </div>
              </div>

              <div className="bg-secondary border border-secondary  rounded-xl w-full p-6 flex flex-col mb-12">
                <FormInput
                  label="Stare Hasło"
                  type="password"
                  name="oldPassword"
                  placeholder="stare haslo"
                  className="mb-4"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <FormInput
                  label="Nowe Hasło"
                  type="password"
                  name="newPassword"
                  placeholder="nowe hasło"
                  className="mb-4"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <FormInput
                  label="Potwierdź Nowe Hasło"
                  type="password"
                  name="confirmNewPassword"
                  placeholder="potwierdź nowe hasło"
                  className="mb-4"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                {!passwordsMatch && (
                  <p className="text-red-500">Hasła nie są takie same.</p>
                )}
                <Button
                  variant="default"
                  className="p-2 rounded bg-primary text-white  self-end"
                  onClick={handleChangePassword}
                >
                  Zmień hasło
                </Button>
              </div>

              <div className="bg-red border border-secondary text-center rounded-xl w-full p-6 flex flex-col mb-4">
                <p>Chcę usunąć konto i wszystko co z nim związane.</p>
                <p> ⚠️ TEGO NIE COFNIESZ!</p>
                <Button
                  variant="default"
                  className="p-2 rounded bg-secondary text-white mt-4 self-end"
                  onClick={handleDeleteAccount}
                >
                  Usuń konto
                </Button>
                {showPasswordInput && (
                  <>
                    <div className="flex flex-col mt-8">
                      <Button
                        variant="default"
                        className="p-2 rounded bg-primary self-end"
                        onClick={handleConfirmDelete}
                      >
                        Potwierdź usunięcie konta
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
