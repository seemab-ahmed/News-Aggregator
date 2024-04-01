import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS
import { useRecoilState } from "recoil";
import { searchNewsAtom } from "../../atoms/searchNewsAtom";
import { format } from "date-fns";
 export const NewsDatePicker = () => {
  const [, setSearchNews] = useRecoilState(searchNewsAtom);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const handleDateChange = (date: any) => {
    console.log(format(date, "yyyy-MM-dd"));
    setSelectedDate(date);
    setSearchNews((prevNewsSearch) => ({
      ...prevNewsSearch,
      fromDate: selectedDate,
    }));
  };

  return (
    <div className="text-sm leading-6 font-medium text-gray-500">
      Date :{" "}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        wrapperClassName="datePicker"
        dateFormat="dd/MM/yyyy"
        className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
      />
    </div>
  );
};

