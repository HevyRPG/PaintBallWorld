import { Button } from "@radix-ui/themes";
import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";
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
                    placeholder="Nowak"
                  />
                </div>
              </div>

              <div className="mb-2 sm:mb-6">
                <FormInput
                  label="Telefon"
                  type="tel"
                  name="Telefon"
                  placeholder="435-654-669"
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <FormInput
                  label="Socialki"
                  type="text"
                  name="Socialki"
                  placeholder="insta: super-gracz-16"
                />
              </div>

              <div className="mb-6 sm:mb-6 text-secondary">
                <FormTextarea
                  label="Opis"
                  placeholder="Lorem Ipsum"
                  name="Opis"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="default"
                  className="p-2 rounded bg-primary text-white"
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
