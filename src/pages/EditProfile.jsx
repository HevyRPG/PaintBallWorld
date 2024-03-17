import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@radix-ui/themes";
import { AuthContext } from '../context/AuthContext' 
import ProfileSettings from "../components/UserSettings/ProfileSettings";
import AccountSettings from "../components/UserSettings/AccountSettings";


const EditProfile = () => {
  const { isLoggedIn, logout } = useContext(AuthContext); // Use context to check if user is logged in
  const handleLogout = () => {
    logout(); // Use logout function from context
    navigate("/"); // Redirect to home page after logout
  };
  const navigate = useNavigate();

  const [currentSection, setCurrentSection] = useState("profile");

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  return (
    <>
      <div className="container mx-auto max-w-screen-2xl bg-background w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row ">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12 p-8 space-y-6">
            <button
              className="flex hover:text-indigo-600"
              onClick={() => navigate(-1)}
            >
              &larr; Powrót
            </button>

            <h1 className="text-4xl font-semibold text-primary mb-8">
              Edytuj profil
            </h1>

            <Button
              onClick={() => handleSectionChange("profile")}
              className={`flex items-center px-3 py-2.5 font-bold    hover:border hover:bg-secondary  rounded-full ${
                currentSection === "profile" ? "active" : ""
              }`}
            >
              Profil
            </Button>
            <Button
              onClick={() => handleSectionChange("accountSettings")}
              className={`flex items-center px-3 py-2.5 font-bold   hover:border hover:bg-secondary rounded-full ${
                currentSection === "accountSettings" ? "active" : ""
              }`}
            >
              Ustawienia Konta
            </Button>
            <Button className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  ">
              Zostań właścicelem
            </Button>
            <Button
              className="flex items-center text-red-foreground px-3 py-2.5 font-semibold  hover:border hover:rounded-full  "
              onClick={handleLogout}
            >
              Wyloguj się
            </Button>
          </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4 ">
          {currentSection === "profile" && <ProfileSettings />}

          {currentSection === "accountSettings" && <AccountSettings />}
        </main>
      </div>
    </>
  );
};

export default EditProfile;
