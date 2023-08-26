import React, { useState,useEffect } from 'react';
import './Navbar.css';
import axios from 'axios';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 7;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async () => {
    alert("Retrieving..Please wait few seconds. average waiting time : 7s")
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      setSearchResults(response.data.docs);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  
  const handleResultClick = (key) => {
    // Open the Open Library page for the selected book
    window.open(`https://openlibrary.org${key}`, '_blank');
  };

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  const renderResults = searchResults.slice(startIndex, endIndex).map(book => (
    <div className='results' onClick={() => handleResultClick(book.key)}>
    <img className="vector" src="https://img.freepik.com/free-vector/stack-colorful-books_74855-314.jpg?size=626&ext=jpg&ga=GA1.2.1239015281.1681034374&semt=ais"/>
    <li key={book.key} >
      
      <h2 className='title'>{book.title}</h2>
      <center><p>Author(s): {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p></center>
      
      {/* Display other relevant data */}
    </li>
    </div>
  ));

  return (
    <main>
    <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
      <div className="logo">
      BOOKVERSE
</div>

      <ul className='menulg'>
        <li><a href = "https://www.openlibrary.org"> Go to OpenLibrary</a></li>
        
        
      </ul>

    </nav>

    
<div className='container'>
<h1>Enter book name</h1>
    <form>
      <input value={query}
      type="text"
      placeholder="Enter and click the button below"
        onChange={(e) => setQuery(e.target.value)}>
      </input>
      <br/>

      <center><div  onClick={handleSearch}  className='search'> Search </div></center>

    </form>


    <ul className='list'>{renderResults}</ul>
      

        <div className='prev' disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          <span>&larr;</span>
        </div>

        <div
        className='next'
          disabled={searchResults.length <= endIndex}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <span>&rarr;</span>
        </div>

      
    </div>
    </main>
  );
};

export default Navbar;
