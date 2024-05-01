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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "48vw",
    height: "48vh",
    backgroundColor: "hsl(var(--primary-foreground))",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
    position: "fixed",
    overflow: "visible",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "26px",
    color: "#fff",
    marginBottom: "20px",
  },
  button: {
    fontSize: "16px",
    backgroundColor: "#ccc",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: "20px",
  },
  descriptionWrapper: {
    width: "50%",
    marginRight: "20px",
  },
  description: {
    fontSize: "16px",
    color: "#fff",
  },
  selectWrapper: {
    width: "50%",
  },
  price: {
    fontSize: "22px",
    marginTop: "12px",
    marginBottom: "20px",
  },
  checkbox: {
    marginTop: "30px",
    color: "#007bff",
  },
  link: {
    fontSize: "16px",
    color: "#007bff",
    textDecoration: "none",
    cursor: "pointer",
  },
  colors: {
    color: "#007bff",
  },
};

const OpenModalComponent = ({ isOpen, closeModal, fieldID, eventId }) => {
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

  const handleSignUp = async () => {
    if (!isCheckboxChecked || !selectedPackage) return;

    const data = {
      eventId: eventId,
      setId: selectedPackage.id,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/api/Event/PublicEvent`, data, config);
      toast.success("Zapisano na wydarzenie!");
      handleModalClose();
    } catch (error) {
      console.error("Błąd podczas zapisywania na wydarzenie:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      style={customStyles}
      contentLabel="Zapisywanie na rozgrywkę"
    >
      <div style={customStyles.header}>
        <div style={customStyles.title}>Paintball Warszawa</div>

        <Button variant="ghost" className="border-2" onClick={handleModalClose}>
          Cofnij
        </Button>
      </div>
      <div style={customStyles.footer}>
        <div style={customStyles.selectWrapper}>
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

          <div style={customStyles.checkbox}>
            <Checkbox
              checked={isCheckboxChecked}
              onCheckedChange={handleCheckboxChange}
            />
            <span className="ml-2">Regulamin</span>
          </div>

          <Button
            variant="default"
            size="lg"
            className="mt-2"
            disabled={!isCheckboxChecked}
            onClick={handleSignUp}
          >
            Zapisz się
          </Button>
        </div>
        <div style={customStyles.descriptionWrapper}>
          {selectedPackage && (
            <div style={customStyles.description}>
              {selectedPackage.description}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OpenModalComponent;
