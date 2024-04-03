import React, { useState } from "react";
import { Button } from "@/components/ui/button";
const PaginationComponent = () => {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const data = [
    "Poznań 06.05.2024",
    "Warszawa 04.06.2024",
    "Kraków 12.07.2024",
    "Gdańsk 18.08.2024",
    "Wrocław 25.09.2024",
    "Katowice 03.10.2024",
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className="flex flex-col rounded-xl items-center bg-secondary justify-between px-6 py-5 font-semibold border">
        <span className="text-secondary-foreground pb-8">
          Historia rozgrywek
        </span>
        {currentItems.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
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

export default PaginationComponent;
