import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {Book} from './interfaces/baseInterface'


const BookItem: React.FC<Book> = (win) => {
    const { year, author, title} = win

    return (

        <tr className="">
            <td>{year} </td>
            <td> {author} </td>
            <td> <Link to={`/akutagawashou/${title}`}> <button className="titleBtn">{title} </button> </Link> </td>
        </tr>
    )
}

export default BookItem