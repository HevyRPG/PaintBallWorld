import * as React from "react";
import { useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
// Mock:
const userData = {
  firstName: "Jan",
  lastName: "Nowak",
  username: "SuperNowak79",
  phoneNumber: "669-696-353",
  email: "Jannowak@example.com",
  profilePicture: "https://avatar.iran.liara.run/public/24", // Placeholder image URL
  info: "Janek to mistrz taktyki i strategii. Zdobył reputację jako doskonały strzelec z niezwykłą precyzją. Jego szybkość, zwinność i skuteczność w poruszaniu się po polu czynią go nie doścignionym w starciach jeden na jeden. Jest także znakomitym liderem, potrafiącym zjednoczyć zespół wokół wspólnego celu i wydobyć z każdego gracza jego najlepsze umiejętności.",
};

const DashboardPage = () => {
  const {
    firstName,
    lastName,
    username,
    phoneNumber,
    email,
    profilePicture,
    info,
  } = userData;

  const [selectedField, setSelectedField] = useState(null);

  const modal = useRef();
  const handleOpenContactClick = (field) => {
    setSelectedField(field);
    modal.current.open(); // Otwiera modal -> do przerobienia
  };

  return (
    <div className="container bg-slate-900 m-8 rounded-xl max-w-screen-2xl">
      <div className="flex-grow text-gray-200">
        <main className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
              <h2 className="text-gray-600 ml-0.5">Zarządzaj swoim profilem</h2>
            </div>
            <div className="flex flex-wrap items-start justify-end -mb-3">
              <button className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Zostań właścicielem
              </button>
              <button className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Edytuj profil
              </button>
            </div>
          </div>
          <section className="flex gap-6">
            <div className="flex items-center text-center justify-center py-4 bg-white shadow rounded-xl md:w-1/4">
              <div>
                <img
                  src="https://avatar.iran.liara.run/public/36"
                  className="max-h-24 max-w-24 mx-auto"
                />
                <span className="block text-blue-500">@username</span>
                <span className="block text-gray-500">Imie i nazwisko</span>
                <span className="block text-gray-500">email</span>
                <span className="block text-gray-500">socialki</span>
              </div>
            </div>
            <div className="flex flex-col items-center text-center font-semibold pt-8 bg-white shadow rounded-xl md:w-3/4  text-gray-500">
              <span class="block text-primary-foreground  text-2xl font-bold mb-12  ">
                Statystyki
              </span>
              <div class="grid grid-cols-4 gap-4">
                <div>
                  <span class="block ">Ukończone rozgrywki</span>
                  <span class="block ">100</span>
                </div>
                <div>
                  <span class="block ">Odwiedzone pola</span>
                  <span class="  ">50</span>
                </div>
                <div>
                  <span class="block ">Łączny czas gry</span>
                  <span class="  ">10 godzin</span>
                </div>
                <div>
                  <span class="block ">Wystawione opinie</span>
                  <span class="block  ">5</span>
                </div>
              </div>
            </div>
          </section>

          <section className="flex gap-6">
            <div className="flex flex-col">
              <Calendar mode="single" className="rounded-md border shadow" />
            </div>

            <div className="w-full flex flex-col text-gray-400 ">
              <div className="bg-white shadow rounded-xl">
                <div className="flex flex-col rounded-xl items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                  <span className="text-primary-foreground pb-8">
                    Najblizsze rozgrywki
                  </span>
                  <span>Poznań 06.05.2024</span>
                  <span>Warszawa 04.06.2024</span>
                </div>
              </div>

              <div className="bg-white shadow rounded-xl  mt-6">
                <div className="flex flex-col rounded-xl items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                  <span className="text-primary-foreground pb-8">
                    Historia rozgrywek
                  </span>
                  <span>Poznań 06.05.2024</span>
                  <span>Warszawa 04.06.2024</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
