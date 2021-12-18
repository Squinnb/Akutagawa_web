import React from 'react';
import BookItem from "./BookItem"
import {Book} from './interfaces/baseInterface'

interface BookListProps {
    winners: Book[]
}

const BookList: React.FC<BookListProps> = (winprops: BookListProps) => {

    return (
        <div data-testid="WinnerList" className="winnersDisp">
            <table>
            <tbody>
                <tr>  
                    <th>受賞年</th>
                    <th>受賞者</th>
                    <th>受賞作</th>
                    {/* <th>掲載誌</th> */}
                </tr>
                
                {
                 winprops.winners.map( (win, i) => (
                    <BookItem key={i}
                        {...win}
                    />  )
                 )
                }
                </tbody>

            </table>
        
        </div>
      
    )
}

export default BookList;