import * as React from 'react'
import { Button } from '@/components/ui/button'

const ForgotPassword = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full bg-white p-6 bg-bgs rounded-xl shadow md:mt-0 sm:max-w-md sm:p-8">
          <h1 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Nie pamiętasz hasła?
          </h1>
          <p className="font-light text-gray-500 dark:text-gray-400">
            Wpisz e-mail odpowiedni dla Twojego konta. Na adres e-mail wyślemy
            Ci link do strony, na której będzie można łatwo utworzyć nowe hasło.{' '}
          </p>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Twój email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  Akceptuje{' '}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
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
