import React from 'react'
import './header.css'
import Logo from './logo/Logo'
import Search from '../UI/inputs/search/SearchInput'

const Header = props => {
    return(
        <header className='header'>
<Logo />
<Search/>
        </header>
    )
}
export default Header