import { useContext} from 'react';
import { NavLink } from "react-router-dom"
import { AuthContext } from './contexts/AuthContext';
// import '../nav.css';


export default function Nav() {
    let {user, logoutUser} = useContext(AuthContext)
    return (

       <nav  id="navigation">
            <ul id="navList">
                <li className="navli"><NavLink  exact activeClassName="currentLink" className="nl" to="/"> Home </NavLink></li>
                <li className="navli"><NavLink  exact activeClassName="currentLink" className="nl" to="/About"> About </NavLink></li>
                
                {user ?
                        <>
                        
                        <li className="navli authLink">
                            <NavLink  exact activeClassName="currentLink" id='userHomeNavLink' className="nl"  to="/UserHome"> {user.name} </NavLink>

                            <NavLink className='nl' onClick={logoutUser} to="/Home">Logout</NavLink>
                        </li>
                        </>
                      :  
                        <li className="navli authLink">
                            <NavLink  exact activeClassName="currentLink" className="nl" to="/Auth"> Sign In </NavLink>
                        </li>
                }
                
                
            </ul>
            
       </nav>
    )
}