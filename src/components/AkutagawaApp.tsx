import React, { useState, useEffect, useContext } from 'react';
import {Route, Switch} from "react-router-dom"
import '../App.css';
import '../nav.css';
import BookIndex from "./BookIndex"  
import BookDetails from "./BookDetails"
import { AuthContext } from './contexts/AuthContext';
import About from "./About"  
import Auth from "./AuthPage"  
import Nav from "./Nav" 
import UserHome from './UserHome';
import {Book} from './interfaces/baseInterface'


const AkutagawaApp: React.FC = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [books, setData] = useState<Book[] | null>(null)
  let {user, logoutUser} = useContext(AuthContext)
  const fetchData = () => {
    fetch(`${baseUrl}book`)
    .then((res) => {
      if(res.status === 200) { res.json().then((dataRes) => {
        console.log(dataRes)
        setData(dataRes)
      })}})
    .catch((e) => {console.log("Error fectching BookIndex data: ", e)})
  };

  useEffect( () => {
    fetchData()
  },
  [])
  

  return (
      <div className="AkutagawaApp">
          <Nav />  
          <main> 
                  { books ? 
                        <Switch>
                          <Route exact path="/" render={() => { return <BookIndex data={books} /> }}  />
                          <Route exact path="/About" component={About}  />
                          <Route exact path="/Akutagawashou/:title" render={ (routeProps) => { return <BookDetails {...routeProps} winner={books.find(w => w.title === routeProps.match.params.title)! }/> } } />
                          <Route exact path="/Auth" render={() => { return <Auth  /> }}  />
                          <Route exact path="/UserHome" render={() => { return <UserHome  /> }}  />
                        </Switch>
                        :
                        <div>hmm...</div>
                  }    
        </main>
      </div>
    
  );
}

export default AkutagawaApp;
