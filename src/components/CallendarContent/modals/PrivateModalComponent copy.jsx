import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import APIKEYS from "../../APIKEYS";
import FormInput from "@/components/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  price: {
    fontSize: "22px",
    marginTop: "12px",
    marginBottom: "20px",
  },
  colors: {
    color: "#007bff",
  },
  title: {
    fontSize: "26px",
    color: "#fff",
  },
};

const PrivateModalComponent = ({ isOpen, closeModal, fieldID, eventId }) => {
  const [numPeople, setNumPeople] = useState(1);
  const [packageType, setPackageType] = useState("basic");

  const [packageOptions, setPackageOptions] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const token = Cookies.get("authToken");
  const config = {
    headers: {
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchPackageOptions = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(
        `${apiUrl}/api/Field/Sets/${fieldID}`,
        config
      );

      setPackageOptions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fieldID) {
      fetchPackageOptions();
    }
  }, [fieldID]);

  const handleSelectChange = (value) => {
    const selectedPackage = packageOptions.find((pkg) => pkg.id === value);
    setSelectedPackage(selectedPackage);
  };

  const handleCheckboxChange = (checked) => {
    setIsCheckboxChecked(checked); // Zaktualizuj stan checkboxa
  };

  const handleModalClose = () => {
    setSelectedPackage(null);
    setIsCheckboxChecked(false);
    setLoading(true);
    closeModal();
  };

  const handlePeopleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setNumPeople(value);
    }
  };

  const handleSignUp = async () => {
    if (!isCheckboxChecked || !selectedPackage) return;

    const data = {
      scheduleId: eventId,
      setId: selectedPackage.id,
      isPrivate: true,
      playersCount: numPeople,
      description: "łydka grubasa",
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/api/Event/Reservation`, data, config);
      toast.success("Umówiono na wydarzenie!");
      handleModalClose();
    } catch (error) {
      console.error("Błąd podczas zapisywania na wydarzenie:", error);
    }
  };

  const totalCost = selectedPackage?.price * numPeople;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      style={customStyles}
      contentLabel="Rezerwacja pola paintballowego"
    >
      <div style={customStyles.header}>
        <div style={customStyles.title}>Umów się na wydarzenie</div>
        <Button variant="ghost" onClick={handleModalClose} className="border-2">
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

          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-3/4">
              <SelectValue placeholder="Wybierz pakiet" />
            </SelectTrigger>
            <SelectContent>
              {packageOptions.map((pkg, index) => (
                <SelectItem key={pkg.id} value={pkg.id}>
                  Pakiet: {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedPackage && (
            <div style={customStyles.price}>
              <p>
                Ilość amunicji:
                <span style={customStyles.colors}> {selectedPackage.ammo}</span>
              </p>
              <p>
                Cena:
                <span style={customStyles.colors}>
                  {" "}
                  {selectedPackage.price}zł
                </span>
              </p>
            </div>
          )}
          <hr />
          <div style={customStyles.price} className="mt-6">
            Całkowity koszt:
            {totalCost ? (
              <span className="text-primary"> {totalCost} zł</span>
            ) : (
              <span className="text-primary">Wybierz pakiet</span>
            )}
          </div>
          <div className="mt-4">
            <Checkbox
              checked={isCheckboxChecked}
              onCheckedChange={handleCheckboxChange}
            />
            <span className="ml-2">Akceptuję Regulamin</span>
          </div>
          <div className="mt-2">
            <Button
              variant="default"
              size="lg"
              className="mt-2"
              disabled={!isCheckboxChecked}
              onClick={handleSignUp}
            >
              Umów
            </Button>
          </div>
        </div>

        <div className="w-1/2">
          {selectedPackage && (
            <div style={customStyles.description}>
              <p>Opis:</p>
              {selectedPackage.description}
            </div>
          )}
          <p className="mt-4">Uwagi dla wynajmującego:</p>
          <textarea
            className="border p-2 mt-2 rounded w-full text-black"
            placeholder="Podaj wszelkie dodatkowe informacje lub pytania..."
          />
        </div>
      </div>
    </Modal>
  );
};

export default PrivateModalComponent;
