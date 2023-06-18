import React, { useEffect, useState } from "react";
import "../../styles/Navbar/Nav.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useNavigate } from 'react-router-dom'
import SignIn from "./SignIn";

const DELAY = .1 * 1000;

function Nav() {
    const [show, handleShow] = useState(false);
    const [keywords, setKeywords] = useState("")


    const navigate = useNavigate()

    // When scroll is a 100px (down in page) we add the navbar visibilty
    // if not remove visibility on navbar

    const eventListenerFunc = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else handleShow(false);
    }

    useEffect(() => {
        window.addEventListener("scroll", eventListenerFunc);

        return () => {
            window.removeEventListener("scroll", eventListenerFunc);
        };
    }, []);

    

    // handle responsive menu
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        console.log('menu toggled...')
        setMenuOpen(!menuOpen);
    };

    function handleMouseEnter(){
        clearTimeout(timer)
    }

    const [timer, setTimer] = useState()

    function handleMouseLeave(){
        clearTimeout(timer)
        const leave = setTimeout(()=>{
            setMenuOpen(false);
        }, DELAY)
        setTimer(leave)
    }



    function handleInput(event) {
        setKeywords(event.target.value)
    }

    function handleClick() {
        navigate(`/search`, { state: keywords })
    }

    function handleClickHome() {
        console.log('clicked')
        navigate(`/`, { state: keywords })

    }

    function handleClickCollections() {
        console.log('clicked')
        navigate(`/`, { state: keywords })

    }

    const [toggleTimer, setToggleTimer] = useState();

    function handleMouseEnterOnToggle(){
        const toggleTimer = setTimeout(() => {
            setMenuOpen(true)
        }, DELAY)
        setToggleTimer(toggleTimer)
    }

    function handleMouseLeaveOnToggle(){
        clearTimeout(toggleTimer)
    }

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className="nav__logo"
                src="/logo/red-transparent.webp"
                alt=""
            />

            <div id='nav_menu' className={`nav__menu ${menuOpen ? 'open' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="home__button" onClick={handleClickHome}>Home</div>
                <div className="collections__button" onClick={handleClickCollections}>Recommendations</div>
            </div>
            
            <div className={`navbar-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} onMouseEnter={handleMouseEnterOnToggle} onMouseLeave={handleMouseLeaveOnToggle}>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
            </div>




            <div className="search__wrap">
                <div className="search">
                    <input type="text" className="search__term" placeholder="What are you looking for?"
                        onChange={handleInput} onFocus={(e) => {e.target.placeholder=""}}
                        onBlur={(e) => {e.target.placeholder="What are you looking for?"}}
                    />
                    <button type="submit" onClick={handleClick} className="search__button" aria-label="search keywords">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>

            <SignIn />

        </div>
    );

}

export default Nav;
