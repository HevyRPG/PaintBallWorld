import { useRef, useState } from "react";
import ContactOwnerModal from "../components/ContactOwnerModal";

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

const paintballFieldsData = [
  {
    id: 1,
    fieldName: "Paintball Arena Xtreme",
    location: "Los Angeles, CA",
    ownerName: "Adam Smith",
  },
  {
    id: 2,
    fieldName: "Urban Paintball Park",
    location: "New York City, NY",
    ownerName: "Emily Johnson",
  },
  {
    id: 3,
    fieldName: "Wilderness Paintball Fields",
    location: "Denver, CO",
    ownerName: "Michael Brown",
  },
];
//

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
    <div class="p-16">
      <div class="p-8 bg-white shadow mt-14 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p class="font-bold text-gray-700 text-xl">3</p>
              <p class="text-gray-400">Rozgrywki</p>
            </div>
            <div>
              <p class="font-bold text-gray-700 text-xl">6</p>
              <p class="text-gray-400">Strzały w głowę</p>
            </div>
            <div>
              <p class="font-bold text-gray-700 text-xl">13</p>
              <p class="text-gray-400">Znajomi</p>
            </div>
          </div>
          <div class="relative">
            <div class="w-48 h-48 bg-indigo-200 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img src={profilePicture} />
            </div>
          </div>
          <div class="space-x-4 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Zostań właścicielem
            </button>
            <button class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Edytuj profil
            </button>
          </div>
        </div>
        <div class="mt-16 text-center border-b pb-12">
          <h1 class="text-4xl font-medium text-gray-700">
            {firstName} {lastName}
          </h1>
          <p class="font-light text-gray-600 mt-3">@{username}</p>

          <p class="my-4 text-gray-900 dark:text-gray-500 first-line:tracking-widest text-left first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-600 first-letter:pr-1 ">
            {info}
          </p>
        </div>
        <h1 class="text-3xl text-center font-medium text-gray-700 mt-4 mb-12">
          Historia rozgrywek
        </h1>
        <div class="m-8 flex flex-col">
          <table class="table-auto">
            <thead>
              <tr>
                <th>Nazwa Pola</th>
                <th>Miejscowość</th>
                <th>Właściciel</th>
                <th>Oceń</th>
                <th>Kontakt</th>
              </tr>
            </thead>
            <tbody>
              {paintballFieldsData.map((field, index) => (
                <tr key={index}>
                  <td>{field.fieldName}</td>
                  <td>{field.location}</td>
                  <td>{field.ownerName}</td>
                  <td>⭐⭐⭐⭐⭐</td>
                  <td>
                    <button
                      onClick={() => handleOpenContactClick(field)}
                      class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                    >
                      Kontakt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ContactOwnerModal
          ref={modal}
          selectedField={selectedField}
          email={email}
        />
        )
      </div>
    </div>
  );
};

export default DashboardPage;
