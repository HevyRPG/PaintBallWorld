import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FieldRatingModalComponent from "./FieldRatingModalComponent";
import axios from "axios";
import Cookies from "js-cookie";
import APIKEYS from "../APIKEYS";

const PaginationHistory = () => {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedEventId, setSelectedFieldId] = useState(null);
  const [error, setError] = useState(null);
  const token = Cookies.get("authToken");

  const config = {
    headers: {
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/User/UserHistory`,
          config
        );
        setHistoryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user history:", error);
        setError("Error fetching user history");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Ładuję dane...</p>;
  if (error) return <p>Error: {error}</p>;

  const { games } = historyData || { games: [] };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = games.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(games.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const openModal = (fieldId) => {
    setSelectedFieldId(fieldId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedFieldId(null);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col rounded-xl items-center bg-secondary justify-between px-6 py-5 mt-6 font-semibold border">
        <Table className="table-auto w-full text-white">
          <TableCaption className="sticky  bottom-0 bg-secondary">
            Historia rozgrywek
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer text-center">
                Nazwa pola
              </TableHead>
              <TableHead className="cursor-pointer text-center">
                Miasto
              </TableHead>
              <TableHead className="cursor-pointer text-center">Data</TableHead>

              <TableHead className="cursor-pointer text-center">Cena</TableHead>
              <TableHead className="cursor-pointer text-center">
                Oceń pole
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((game, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  {game.field.fieldName}
                </TableCell>
                <TableCell className="text-center">{game.field.city}</TableCell>
                <TableCell className="text-center">
                  {new Date(game.event.date).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-center">
                  {game.event.price}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => openModal(game.field.fieldId)}
                  >
                    Oceń pole
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Poprzednia
        </Button>
        <span className="m-2">
          {currentPage}/{totalPages}
        </span>
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
          Następna
        </Button>
      </div>
      <FieldRatingModalComponent
        isOpen={modalIsOpen}
        closeModal={closeModal}
      ></FieldRatingModalComponent>
    </>
  );
};

export default PaginationHistory;
