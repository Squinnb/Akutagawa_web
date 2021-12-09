import React, { useState } from 'react';
import '../App.css';
import BookList from "./BookList"
import SearchForm from "./SearchForm";
import {Book} from './interfaces/baseInterface'

interface Props {
  data: Array<Book>;
}

const BookIndex: React.FC<Props> = (props) => {
  const { data } = props
  const l = data.length
  const [winners, setWinners] = useState(data.slice(0, 12))
  // const [filterHidden, setFilter] = useState(false)
  
  const handleClick = (e: any) => {
    let name = e.target.name;
    if(name === "all") {
      setWinners(data.slice(0, l))
    } else {
      let decade = data.filter( (w) => {
        return w.year.slice(0,3) === name
      })
      setWinners(decade)
    }
  }

      
    

  return (
    <div className="winnerIndex">
      
    
      <div className="toggleBtnBox">

        <div className="txtL">
          <button name="all" onClick={handleClick} className="toggleBtn">全年表</button>
        </div> 

        <div className="txtL">
          <button name="193" onClick={handleClick} className="toggleBtn">1930年</button>
          <button name="194" onClick={handleClick} className="toggleBtn">40年</button>
          <button name="195" onClick={handleClick} className="toggleBtn">50年</button>
          <button name="196" onClick={handleClick} className="toggleBtn">60年</button>
          <button name="197" onClick={handleClick} className="toggleBtn">70年</button>
          <button name="198" onClick={handleClick} className="toggleBtn">80年</button>
          <button name="199" onClick={handleClick} className="toggleBtn">90年</button>
        </div> 
        <div className="txtL">
          <button name="200" onClick={handleClick} className="toggleBtn">2000年</button>
          <button name="201" onClick={handleClick} className="toggleBtn">10年</button>
          <button name="202" onClick={handleClick} className="toggleBtn">20年</button>
          
        </div>
        
        <div className="txtL">
          <SearchForm sw={setWinners} data={data} />
        </div>
        
      </div>

      
      <div className="listContainer">
        <BookList winners={winners} />
      </div>
      
    </div>
  );
}

export default BookIndex;
