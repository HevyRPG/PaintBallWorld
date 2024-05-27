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
import axios from "axios";
import Cookies from "js-cookie";
import APIKEYS from "../APIKEYS";
import UnregisterAlertDialog from "../CallendarContent/modals/UnregisterAlertDialog";
import { toast } from "sonner";

const PaginationIncoming = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);
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
        const response = await axios.get(`${apiUrl}/api/User/Incoming`, config);
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

  const handleUnregister = async (eventId, isPublic) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      let endpoint = isPublic
        ? "/api/Event/PublicEvent"
        : "/api/Event/Reservation";
      let method = isPublic ? "PATCH" : "DELETE";
      await axios({
        method: method,
        url: `${apiUrl}${endpoint}`,
        data: { eventId: eventId },
        headers: config.headers,
      });
      toast.success("Wypisano z wydarzenia!");
    } catch (error) {
      console.error("Błąd podczas wypisywania z wydarzenia:", error);
      toast.error("Nie można się wypisać z wydarzenia.");
    }
  };

  return (
    <>
      <div className="flex flex-col rounded-xl items-center bg-secondary justify-between px-6 py-5 font-semibold border">
        <Table className="table-auto w-full text-white">
          <TableCaption className="sticky  bottom-0 bg-secondary">
            Nadchodzące wydarzenia
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nazwa pola</TableHead>
              <TableHead>Miasto</TableHead>
              <TableHead>Data</TableHead>

              <TableHead>Cena</TableHead>
              <TableHead>Wydarzenie </TableHead>
              <TableHead>Anuluj wydarzenie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((game, index) => (
              <TableRow key={index}>
                <TableCell>{game.field.fieldName}</TableCell>
                <TableCell>{game.field.city}</TableCell>
                <TableCell>
                  {new Date(game.event.date).toLocaleDateString()}
                </TableCell>

                <TableCell>{game.event.price}</TableCell>
                <TableCell>
                  {game.isPublic ? "Otwarte" : "Rezerwacja"}
                </TableCell>
                <TableCell>
                  {!game.isPublic ? (
                    <UnregisterAlertDialog
                      onConfirm={() =>
                        handleUnregister(
                          game.event.eventId,
                          game.isPublic
                        )
                      }
                    />
                  ) : (
                    <Button
                      onClick={() =>
                        handleUnregister(
                          game.event.eventId,
                          game.isPublic
                        )
                      }
                      variant="destructive"
                      size="lg"
                      className="ml-4"
                    >
                      Odwołaj rezerwację
                    </Button>
                  )}
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
    </>
  );
};

export default PaginationIncoming;
