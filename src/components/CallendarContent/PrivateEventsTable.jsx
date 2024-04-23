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

const PrivateEventsTable = ({ fieldID }) => {
  const [events, setEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [sortDirection, setSortDirection] = useState("desc"); // Initialize to 'desc'
  const [isLoading, setIsLoading] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!fieldID) {
      setEvents([]);
      setSortedEvents([]);
      return; // Exit early if no fieldID
    }

    setIsLoading(true); // Set loading state to true before fetching data

    // Mock data specific to private events, showing up when fieldID is '123'
    const mockApiResponse =
      fieldID === "123"
        ? [
            {
              id: "1",
              date: "2024-03-01",
              hour: "14:00",
              uptime: "2 hours",
              attendees: 10,
            },
            {
              id: "2",
              date: "2024-03-02",
              hour: "16:00",
              uptime: "3 hours",
              attendees: 12,
            },
            {
              id: "3",
              date: "2024-03-05",
              hour: "11:00",
              uptime: "1.5 hours",
              attendees: 8,
            },
            {
              id: "4",
              date: "2024-03-05",
              hour: "11:00",
              uptime: "1.5 hours",
              attendees: 8,
            },
            {
              id: "5",
              date: "2024-03-05",
              hour: "11:00",
              uptime: "1.5 hours",
              attendees: 8,
            },
            {
              id: "6",
              date: "2024-03-05",
              hour: "11:00",
              uptime: "1.5 hours",
              attendees: 8,
            },
          ]
        : [];

    setTimeout(() => {
      // Simulate fetching delay
      setEvents(mockApiResponse);
      setSortedEvents(mockApiResponse);
      setIsLoading(false); // Set loading state to false after fetching data
    }, 1000);
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
              <TableCell className="text-center">{event.date}</TableCell>
              <TableCell className="text-center">{event.hour}</TableCell>
              <TableCell className="text-center">{event.uptime}</TableCell>
              <TableCell className="text-center">{event.attendees}</TableCell>
              <TableCell className="text-center">
                <Button variant="default" onClick={openModal} size="lg">
                  Umów
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PrivateModalComponent isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default PrivateEventsTable;
