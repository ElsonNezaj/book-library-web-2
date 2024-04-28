import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./SearchForm.css";

const SearchForm = () => {
  const [isSubmitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value.trim();
    if (!isSubmitted) setSubmitted(true);
    if (search.length > 0) navigate(`/book?search=${search}`)
  };

  return (
    <form noValidate="noValidate" className={`search-form flex flex-sb bg-white ${isSubmitted ? 'submitted' : ''}`} onSubmit={handleSubmit}>
      <input required pattern="\s*(\S\s*){1,}" type="text" className='form-control' placeholder='The Lord Of The Rings ...' name='search' />
      <button type="submit" className='btn-icon text-purple'>
        <FaSearch />
      </button>
    </form>
  )
}

export default SearchForm