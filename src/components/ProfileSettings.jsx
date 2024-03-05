import { Button } from "@radix-ui/themes";
import FormInput from "../components/FormInput";
const ProfileSettings = () => {
  return (
    <>
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg p-12">
          <h2 className="text-3xl font-bold sm:text-xl">Profil</h2>

          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <img
                className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                src="https://avatar.iran.liara.run/public/36"
                alt="Bordered avatar"
              />

              <div className="flex flex-col space-y-5 sm:ml-8">
                <Button
                  variant="outline"
                  className="rounded bg-primary text-primary-foreground p-4"
                >
                  Zmień Zdjęcie
                </Button>
                <Button
                  variant="ghost"
                  className="rounded border border-primary p-4 hover:bg-primary"
                >
                  Usuń Zdjęcie
                </Button>
              </div>
            </div>

            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <FormInput
                    label="Imie"
                    type="text"
                    name="imie"
                    placeholder="Jan"
                  />
                </div>

                <div className="w-full">
                <FormInput
                    label="Nazwisko"
                    type="text"
                    name="Nazwisko"
                    placeholder="Jan"
                  />
                </div>
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Numer telefonu
                </label>
                <input
                  type="text"
                  id="phone"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="518-422-874"
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="socialki"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Socialki
                </label>
                <input
                  type="text"
                  id="socialki"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="instagram: super gracz, github: to nie ta profesja 👺"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Bio
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                  placeholder="Write your bio here..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="default"
                  className="p-2 rounded bg-primary text-white hover:bg-white"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
