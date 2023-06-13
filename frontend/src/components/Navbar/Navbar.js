import { useContext, useState } from 'react'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded'
import MenuIcon from '@material-ui/icons/Menu'
import { ThemeContext } from '../../contexts/theme'
import './Navbar.css'
import axios from 'axios'
const Navbar = () => {
  const [{ themeName, toggleTheme }] = useContext(ThemeContext)

  const logout = async () => {
    const url = 'http://127.0.0.1:8000/api/logout/'; // Replace with your API endpoint


    const token = localStorage.getItem("token")

    try {
      const response = await axios.post(url, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      location.reload()
      localStorage.removeItem('token')

    } catch (error) {
      console.log('Error:', error.response.data);
    }
  }

  return (
    <nav className='center nav'>
      {localStorage.getItem("token") ? <ul

        className='nav__list'
      >

        <li className='nav__list-item'>
          <a
            href='#projects'
            onClick={logout}
            className='link link--nav'
          >
            Logout
          </a>
        </li>

      </ul> : ""}

      <button
        type='button'
        onClick={toggleTheme}
        className='btn btn--icon nav__theme'
        aria-label='toggle theme'
      >
        {themeName === 'dark' ? <WbSunnyRoundedIcon /> : <Brightness2Icon />}
      </button>


    </nav>
  )
}

export default Navbar
