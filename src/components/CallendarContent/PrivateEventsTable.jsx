import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PrivateModalComponent from "./modals/PrivateModalComponent copy";
import APIKEYS from "../APIKEYS";
import Cookies from "js-cookie";
import axios from "axios";

const PrivateEventsTable = ({ fieldID }) => {
  const [events, setEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [sortDirection, setSortDirection] = useState("desc"); // Initialize to 'desc'
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const token = Cookies.get("authToken");
  const config = {
    headers: {
      ...APIKEYS.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const openModal = (eventId) => {
    setSelectedEventId(eventId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedEventId(null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!fieldID) {
      setEvents([]);
      setSortedEvents([]);
      return; // Exit early if no fieldID
    }

    setIsLoading(true); // Set loading state to true before fetching data
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(`${apiUrl}/api/Schedule/PrivateEvent/open/${fieldID}`, config) // Use Axios to make GET request
      .then((response) => {
        setEvents(response.data);
        setSortedEvents(response.data);
        setIsLoading(false); // Set loading state to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading state to false on error
      });
  }, [fieldID]);

  const handleSort = () => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    const sorted = [...sortedEvents].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return direction === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortedEvents(sorted);
    setSortDirection(direction);
  };

  if (!fieldID) {
    return (
      <div className="text-primary">Wybierz pole aby wyświetlić rozgrywki</div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3 ">
        <table className="space-x-3">
          <thead>
            <tr>
              <th>
                <Skeleton className="h-8 w-[250px]" />
              </th>
              <th>
                <Skeleton className="h-8 w-[250px]" />
              </th>
              <th>
                <Skeleton className="h-8 w-[250px]" />
              </th>
              <th>
                <Skeleton className="h-8 w-[250px]" />
              </th>
              <th>
                <Skeleton className="h-8 w-[250px]" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Skeleton className="h-4 w-[250px]" />
              </td>
              <td>
                <Skeleton className="h-4 w-[250px]" />
              </td>
              <td>
                <Skeleton className="h-4 w-[250px]" />
              </td>
              <td>
                <Skeleton className="h-4 w-[250px]" />
              </td>
              <td>
                <Skeleton className="h-4 w-[250px]" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  console.log(sortedEvents)

  return (
    <div className="max-h-60 min-h-60 overflow-y-auto">
      <Table className="table-auto w-full text-white">
        <TableCaption>Lista wydarzeń</TableCaption>
        <TableHeader className="sticky top-0 bg-background">
          <TableRow>
            <TableHead
              className="cursor-pointer text-center"
              onClick={handleSort}
            >
              Data{" "}
              {sortDirection === "asc" ? (
                <span className="ml-1 text-lg">&uarr;</span>
              ) : (
                <span className="ml-1 text-lg">&darr;</span>
              )}
            </TableHead>
            <TableHead className="text-center">Godzina</TableHead>
            <TableHead className="text-center">
              Maksymalny czas w godz.
            </TableHead>
            <TableHead className="text-center">
              Maksymalna liczba uczestników
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEvents.map((event) => (
            <TableRow key={event.id} className="hover:bg-secondary">
              <TableCell className="text-center">
                {event.date.split("T")[0]}
              </TableCell>
              <TableCell className="text-center">
                {event.date.split("T")[1]}
              </TableCell>
              <TableCell className="text-center">{event.maxPlaytime}</TableCell>
              <TableCell className="text-center">{event.maxPlayers}</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => openModal(event.fieldScheduleId)}
                >
                  Umów
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PrivateModalComponent
        isOpen={modalIsOpen}
        closeModal={closeModal}
        fieldID={fieldID}
        eventId={selectedEventId}
      />
    </div>
  );
};

export default PrivateEventsTable;
