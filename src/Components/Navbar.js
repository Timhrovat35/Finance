import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import MenuItems  from './MenuItems'
import "./Navbar.css"

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    };  
  return (
    <>
        <nav className='sidebar'>
            <h1 className='navbar-logo'>FINANCE</h1>
            <ul className='nav-menu'>
                {MenuItems.map((item,index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <a href = {item.url}>
                                <i className={item.icon}></i>{item.title}
                            </a>
                        </li>
                    )
                }
                )}
            </ul>
            <div className="login-logout"  url ="/login">
                {isLoggedIn ? (
                    <>
                    <button onClick={handleLoginLogout}>Logout</button>
                    </>
                    ) : (
                    <>
                    <a href='/login'>
                        <button onClick={handleLoginLogout}>Login</button>
                    </a>
                    </>
                    )}
            </div>    
        </nav>
    </>
  )
}

export default Navbar