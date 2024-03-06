import * as React from 'react'
import { Button } from '@/components/ui/button'

const ForgotPassword = () => {
  return (
    <>
      <div className="flex items-center border justify-center min-h-screen ">
        <div className="w-full bg-background border-primary border p-6 bg-bgs rounded-xl shadow md:mt-0 sm:max-w-md sm:p-8">
          <h1 className="mb-4 text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl ">
            Nie pamiętasz hasła?
          </h1>
          <p className="font-light text-secondary-foreground">
            Wpisz e-mail odpowiedni dla Twojego konta. Na adres e-mail wyślemy
            Ci link do strony, na której będzie można łatwo utworzyć nowe hasło.{' '}
          </p>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-secondary-foreground"
              >
                Twój email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@email.com"
                required=""
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
                  Akceptuje{' '}
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
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
