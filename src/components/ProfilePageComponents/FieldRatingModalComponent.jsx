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
import APIKEYS from "../APIKEYS";
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
      zIndex: 9999,
    },
}

const FieldRatingModalComponent = ({isOpen, closeModal}) => {

    const handleModalClose = () => {

        closeModal();
      };
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
        contentLabel="Oceń pole"
      > 
      <h1>HELLO</h1>
      <Button variant="ghost" className="border-2" onClick={handleModalClose}>
          Cofnij
        </Button>
      </Modal>
    )
}

export default  FieldRatingModalComponent