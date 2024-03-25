import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import OpenEventsTable from "@/components/CallendarContent/OpenEventsTable.jsx";
import PrivateEventsTable from "@/components/CallendarContent/PrivateEventsTable.jsx";
import PhotoGallery from "@/components/ui/PhotoGallery.jsx";
import OwnerDialog from "@/components/OwnerDashboard/OwnerDialog.jsx";
import AddFieldDialog from "@/components/ui/AddFieldDialog";
import { pl } from "date-fns/locale";

const fieldsDictionary = [
  { id: 1, name: "Wielkoposla Pole 1" },
  { id: 2, name: "Warszawa Pole 2" },
  { id: 3, name: "Ciechocinek Pole 3" },
];

const OwnerDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");

  // useEffect hook to log the date whenever it changes
  useEffect(() => {
    if (date) {
      // Format the date to a string in YYYY-MM-DD format
      const newFormattedDate =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") + // Month is 0-based
        "-" +
        String(date.getDate()).padStart(2, "0");

      // Update the formattedDate state with the new value
      setFormattedDate(newFormattedDate);
    }
  }, [date]);

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
                Zarządzaj polem
              </h2>
            </div>
          </div>
          <section className="flex gap-6">
            <div className="relative py-4 border border-secondary text-secondary-foreground shadow rounded-xl w-2/3 flex items-center justify-center">
              <AddFieldDialog />
            </div>

            <div className="flex flex-col items-center text-center font-semibold pt- pb-3 pr-3 border border-secondary shadow rounded-xl md:w-1/3 text-card-foreground overflow-y-auto max-h-32">
              <span className="block text-accent-foreground text-xl pt-3 font-bold mb-3 bg-background w-full sticky top-0">
                Twoje pola:
              </span>
              <div className="grid grid-cols-1 gap-2 pr-3 pl-3 w-full">
                {fieldsDictionary.map((field, index) => (
                  <OwnerDialog
                    key={index}
                    fieldName={field.name}
                    fieldId={field.id}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="flex gap-5">
            <div className="mx-auto flex flex-wrap items-center justify-center bg-background rounded w-1/3">
              <h1 className="font-semibold text-xl mb-2">
                Wybierz <span className="text-primary italic">datę</span> aby
                wyświetlić rozgrywki w wybranym terminie
              </h1>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                fixedWeeks
                locale={pl}
                className="border rounded-xl"
              />
            </div>
            <div className="w-auto">
              <PhotoGallery fieldID="TESTGAL" width={500} height={300} />
            </div>
          </section>
          <section className="flex gap-5">
            <div className="mx-auto flex flex-wrap items-center justify-center border border-secondary  rounded-xl w-1/2">
              <h1 className="text-white text-xl font-bold italic mb-4 mt-4">
                Rozgyrwki otwarte w dniu{" "}
                <span className="text-primary">{formattedDate}</span>
              </h1>
              <Button variant="default" size="lg" className="rounded ml-5">
                Dodaj
              </Button>

              <OpenEventsTable fieldID="123" />
            </div>
            <div className=" mx-auto flex flex-wrap items-center justify-center border border-secondary  rounded-xl w-1/2">
              <h1 className="text-white text-xl font-bold italic mb-4 mt-4">
                Rezerwacje pola w dniu{" "}
                <span className="text-primary">{formattedDate}</span>
              </h1>
              <Button variant="default" size="lg" className="rounded ml-5">
                Dodaj
              </Button>
              <PrivateEventsTable fieldID="123" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;
