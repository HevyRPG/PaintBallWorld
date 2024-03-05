import * as React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="container bg-background m-8 rounded-xl mx-auto max-w-screen-2xl">
      <div className="flex-grow text-gray-200">
        <main className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold text-primary mb-2">
                Dashboard
              </h1>
              <h2 className="text-secondary-foreground ml-0.5">
                Zarządzaj swoim profilem
              </h2>
            </div>
            <div className="flex flex-wrap items-start justify-end -mb-3">
              <Button
                variant="outline"
                className="inline-flex px-3 py-6  border-primary rounded-md mb-3"
              >
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
              </Button>
              <Link to="/edit-profile">
                <Button
                  variant="default"
                  className="inline-flex px-3 py-6 rounded-md mt-0.5 ml-6 mb-3 hover:text-secondary-foreground hover:bg-secondary"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="flex-shrink-0 h-6 w-6 text-primary-foreground -ml-1 mr-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Edytuj profil
                </Button>
              </Link>
            </div>
          </div>
          <section className="flex gap-6">
            <div className="flex items-center text-center justify-center py-4 border bg-secondary text-secondary-foreground shadow rounded-xl md:w-1/4">
              <div>
                <img
                  src="https://avatar.iran.liara.run/public/36"
                  className="max-h-24 max-w-24 mx-auto"
                />
                <span className="block text-primary">@username</span>
                <span className="block ">Imie i nazwisko</span>
                <span className="block ">email</span>
                <span className="block ">socialki</span>
              </div>
            </div>
            <div className="flex flex-col items-center text-center font-semibold pt-8 border  bg-secondary shadow rounded-xl md:w-3/4  text-card-foreground">
              <span class="block text-accent-foreground  text-2xl font-bold mb-12  ">
                Statystyki
              </span>
              <div class="grid grid-cols-4  gap-4">
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

            <div className="w-full flex flex-col  text-secondary-foreground ">
              <div className="shadow rounded-xl">
                <div className="flex flex-col rounded-xl items-center bg-secondary justify-between px-6 py-5 font-semibold border">
                  <span className="text-secondary-foreground pb-8">
                    Najblizsze rozgrywki
                  </span>
                  <span>Poznań 06.05.2024</span>
                  <span>Warszawa 04.06.2024</span>
                </div>
              </div>

              <div className=" shadow rounded-xl bg-secondary  mt-6">
                <div className="flex flex-col rounded-xl  items-center justify-between px-6 py-5 font-semibold border">
                  <span className="text-secondary-foreground pb-8">
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
