import React, { useState } from "react";
import axios from "axios";
import { Button } from "@radix-ui/themes";
import APIHeaders from "../components/APIHeaders";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPasswordRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/Auth/Login/ResetPasswordRequest",
        { email: email },
        APIHeaders
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex items-center border justify-center min-h-screen ">
        <div className="w-full bg-background border-primary border p-6 bg-bgs rounded-xl shadow md:mt-0 sm:max-w-md sm:p-8">
          <h1 className="mb-4 text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl ">
            Nie pamiętasz hasła?
          </h1>
          <p className="font-light text-secondary-foreground">
            Wpisz e-mail odpowiedni dla Twojego konta. Na adres e-mail wyślemy
            Ci link do strony, na której będzie można łatwo utworzyć nowe hasło.{" "}
          </p>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleResetPasswordRequest}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-secondary-foreground"
              >
                Twoja Nazwa
              </label>
              <input
                type="email"
                value={email}
                placeholder="Janek123"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-secondary-foreground "
                >
                  Akceptuje{" "}
                  <a
                    className="font-medium text-primary hover:underline "
                    href="#"
                  >
                    Regulamin
                  </a>
                </label>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full p-2 rounded bg-primary text-primary-foreground"
            >
              Resetuj hasło
            </Button>
          </form>
          Dupa {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
