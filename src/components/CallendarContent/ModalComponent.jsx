import React, { useState } from "react";
import Modal from "react-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button'

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "55vw",
    height: "55vh",
    backgroundColor: "hsl(var(--secondary-foreground))",
    color: "hsl(var(--primary-foreground))",
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
  title: {
    fontSize: "24px",
    color: "#333",
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
    color: "#333",
  },
  selectWrapper: {
    width: "50%",
  },
  price: {
    fontSize: "22px",
    color: "#007bff",
    marginTop: "10px",
    marginBottom: "40px",
  },
  checkbox: {
    marginBottom: "20px",
    color: "#007bff",
  },
  link: {
    fontSize: "16px",
    color: "#007bff",
    textDecoration: "none",
    cursor: "pointer",

  },
};

const ModalComponent = ({ isOpen, closeModal }) => {
  const [isChecked, setIsChecked] = useState(false);

 

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div style={customStyles.header}>
        <div style={customStyles.title}>Paintball Warszawa</div>
        <button style={customStyles.button} onClick={closeModal}>
          Close
        </button>
      </div>
      <div style={customStyles.footer}>
        <div style={customStyles.selectWrapper}>
          <Select >
            <SelectTrigger className="w-3/4">
              <SelectValue placeholder="Wybierz pakiet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Podstawowy</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="vip">Vip</SelectItem>
            </SelectContent>
          </Select>

          <div style={customStyles.price}>
            100 zł
          </div>
          <Button variant="default" size="lg">
                  Zapisz się
            </Button>
        </div>
        <div style={customStyles.descriptionWrapper}>
          <div style={customStyles.description}>
            Pod Warszawą mamy dwa zewnętrzne uzbrojone w liczne przeszkody pola.
            Teren do gry sprawdza się dobrze zarówno przy małych, jak i
            większych grupach. Nasze pola staraliśmy się uzbroić w przeszkody z
            największą starannością, tak aby każda z nich była solidna i
            bezpieczna dla uczestników.
          </div>
          <div style={customStyles.checkbox}>
            <p className="pt-6">Regulamin</p>
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
