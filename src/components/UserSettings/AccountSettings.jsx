import { Button } from '@/components/ui/button'
import FormInput from '../FormInput'

const AccountSettings = () => {
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
                  />
                  <Button
                    variant="default"
                    className="p-2 rounded bg-primary text-white  self-end"
                    // Dodaję klasę self-end, która wyrównuje przycisk do prawej strony
                  >
                    Zapisz email
                  </Button>
                </div>
              </div>

              <div className="bg-secondary border border-secondary  rounded-xl w-full p-6 flex flex-col mb-12">
                <FormInput
                  label="Zmień Hasło"
                  type="password"
                  name="password"
                  placeholder="stare haslo"
                  className="mb-4"
                />
                <FormInput
                  label="Zmień Hasło"
                  type="password"
                  name="password"
                  placeholder="nowe hasło"
                  className="mb-4"
                />
                <FormInput
                  label="Zmień Hasło"
                  type="password"
                  name="password"
                  placeholder="potwierdź nowe hasło"
                  className="mb-4"
                />
                <Button
                  variant="default"
                  className="p-2 rounded bg-primary text-white  self-end"
                  // Dodaję klasę self-end, która wyrównuje przycisk do prawej strony
                >
                  Zmień hasło
                </Button>
              </div>

              <div className="bg-red border border-secondary text-center rounded-xl w-full p-6 flex flex-col mb-4">
                <p>Chce usunac konto i wszystko co z nim związane.</p>
                <p> ⚠️ TEGO NIE COFNIESZ!</p>
                <Button
                  variant="default"
                  className="p-2 rounded bg-secondary text-white mt-4 self-end"
                >
                  Usuń konto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountSettings
