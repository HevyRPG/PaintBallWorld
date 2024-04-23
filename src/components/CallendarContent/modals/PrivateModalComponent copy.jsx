import React, { useState } from "react";
import Modal from "react-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput"; // Dla pola tekstowego

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    height: "70vh",
    backgroundColor: "hsl(var(--primary-foreground))",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
    overflow: "auto",
  },
};

const PrivateModalComponent = ({ isOpen, closeModal }) => {
  const [numPeople, setNumPeople] = useState(1);
  const [packageType, setPackageType] = useState("basic");
  const packagePrices = {
    basic: 100,
    premium: 150,
    vip: 200,
  };

  // Dodajemy stan opisów pakietów
  const [packageDescriptions, setPackageDescriptions] = useState({
    basic: "czas gry: 1h, kule: 200, max ilosc osob:10 ",
    premium: "czas gry: 1,30h, kule: 350, max ilosc osob:15 ",
    vip: "czas gry: 2h, kule: 450, max ilosc osob:20 ",
  });

  const handlePeopleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setNumPeople(value);
    }
  };

  const handlePackageChange = (value) => {
    setPackageType(value);
  };

  const totalCost = packagePrices[packageType] * numPeople;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Rezerwacja pola paintballowego"
    >
      <div className="flex justify-between items-center mb-6 text-white">
        <div className="text-lg font-bold">Paintball Warszawa</div>
        <Button variant="ghost" onClick={closeModal}  className="border-2">
          Cofnij
        </Button>
      </div>

      <div className="flex justify-between text-white">
        <div className="w-52">
          <FormInput
            label="Liczba osób"
            type="number"
            value={numPeople}
            onChange={handlePeopleChange}
          />

          <Select onValueChange={handlePackageChange}>
            <SelectTrigger className="w-3/4">
              <SelectValue placeholder="Wybierz pakiet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Podstawowy</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="vip">Vip</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-4">
            <p>{packageDescriptions[packageType]}</p>
          </div>
          <div className="text-lg mt-20">
            Całkowity koszt: <span className="text-primary">{totalCost} zł</span>
            
          </div>
        </div>

        <div className="w-1/2">
          <p>Opis pola paintballowego:</p>
          <p>
            Pod Warszawą mamy dwa zewnętrzne uzbrojone w liczne przeszkody pola.
            Teren do gry sprawdza się dobrze zarówno przy małych, jak i osób
            dorosłych
          </p>
          <p className="mt-4">Uwagi dla wynajmującego:</p>
          <textarea
            className="border p-2 mt-2 rounded w-full text-black"
            placeholder="Podaj wszelkie dodatkowe informacje lub pytania..."
          />
          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4" />
              <span>Akceptuję regulamin</span>
            </label>
          </div>
          <div className="mt-6 flex justify-end ">
            <Button variant="default">Rezerwuj</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PrivateModalComponent;
