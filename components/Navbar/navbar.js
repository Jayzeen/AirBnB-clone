import React from "react";
import { FcSearch, FcCalendar, FcBusinessman } from "react-icons/fc";
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className="nav">
            <nav>
                
                <div className="row-search">
                    <Link href="/"><div className="logo"></div></Link>
                    <div className="search">
                        <div className="search-nav">
                            <form className="flex">
                                <div className="search-element flex">
                                    <FcSearch />
                                    <input id="city" type="text" name="search" placeholder="Anywhere" />
                                </div>
                                <div className="search-element flex">
                                    <FcCalendar />
                                    <input id="date" type="text" name="search" placeholder="Anytime" />
                                </div>
                                <div className="search-element flex">
                                    <FcBusinessman />
                                    <input id="guest" type="text" name="search" placeholder="Guest" />
                                </div>
                            </form>
                        </div>
                    </div>

                    <ul className='nav-horizontal'>
                        <li><a href="#">Host</a></li>
                        <li><a href="#">Trips</a></li>
                        <li><a href="#">Messages</a></li>
                        <li>
                            <a href="#"><img src='https://kitt.lewagon.com/placeholder/users/lucasraert' className="avatar" /></a>
                        </li>
                    </ul>
                </div>

                <div className="row-menu">
                    <ul>
                        <li><a href="#">FOR YOU</a></li>
                        <li><a href="#">HOMES</a></li>
                        <li><a href="#">EXPERIENCES</a></li>
                        <li><a href="#">RESTAURANTS</a></li>
                        <li><a href="#">PLACES</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar