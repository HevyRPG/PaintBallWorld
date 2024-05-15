import React, { useState } from "react";
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
import FormTextarea from "../FormTextarea";
import Cookies from "js-cookie";
import APIKEYS from "../APIKEYS";
import { toast } from "sonner";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "48vw",
    height: "48vh",
    backgroundColor: "hsl(var(--primary-foreground))",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
    position: "fixed",
    overflow: "auto",
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
  },
  contentSpacing: {
    marginTop: "20px",
  },
};

const FieldRatingModalComponent = ({ isOpen, closeModal, fieldId }) => {
  const [rating, setRating] = useState(null);
  const [description, setDescription] = useState("");

  const token = Cookies.get("authToken");
  const config = {
    headers: {
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const handleFieldRating = async () => {
    if (rating === null) {
      toast.error("Wybierz ocenę!");
      return;
    }

    const data = {
      fieldId,
      rating,
      content: description,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/api/Rating/FieldRating`, data, config);
      toast.success("Pole zostało ocenione!");
      closeModal();
    } catch (error) {
      console.error("Błąd podczas oceny pola:", error);
      toast.error("Wystąpił problem podczas oceniania pola.");
    }
  };

  const handleModalClose = () => {
    setRating(null);
    setDescription("");
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      style={customStyles}
      contentLabel="Oceń pole"
    >
      <div style={customStyles.header}>
        <div style={customStyles.title}>Oceń Pole</div>

        <Button variant="ghost" className="border-2" onClick={handleModalClose}>
          Cofnij
        </Button>
      </div>

      <div style={customStyles.contentSpacing}>
        <Select onValueChange={(value) => setRating(Number(value))}>
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Wybierz ocenę" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4">
          <FormTextarea
            label="Opis pola"
            placeholder="Podziel się swoimi uwagami"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="default" onClick={handleFieldRating}>
          Oceń pole
        </Button>
      </div>
    </Modal>
  );
};

export default FieldRatingModalComponent;
