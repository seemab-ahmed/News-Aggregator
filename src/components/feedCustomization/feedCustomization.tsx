// FeedCustomization.tsx
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS
import { useRecoilState } from 'recoil';
import { searchNewsAtom } from '../../atoms/searchNewsAtom';

const FeedCustomization = () => {
  const [searchNews, setSearchNews] = useRecoilState(searchNewsAtom);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedDate, setSelectedDate] = useState<any>(new Date);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSource(event.target.value);
  };

  const handleDateChange = (date:any) => {
    console.log(date)
    setSelectedDate(date)
  };

  const applyFilters = () => {
  };

  return (
    <div>
      {/* <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
      </select>
      <select value={selectedSource} onChange={handleSourceChange}>
        <option value="">Select Source</option>
      </select> */}
      <DatePicker selected={selectedDate} onChange={handleDateChange} wrapperClassName="datePicker" dateFormat="dd/MM/yyyy"
      className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
      />
    </div>
  );
};

export default FeedCustomization;
