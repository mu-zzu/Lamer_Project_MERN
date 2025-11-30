import React from 'react'
import './Navbar.css'
import LM2_logo from '../Assets/LM2.png' // Import the logo

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <img src={LM2_logo} alt="Logo" /> {/* Add the logo */}
        <div className='nav-logo-container'>
          <span className='nav-logo stylish-black-text'>Lamer</span>
          <span className='nav-logo-detail stylish-black-text'>.ind</span>
        </div>
      </div>
      {/* Remove the profile image */}
    </div>
  )
}

export default Navbar
