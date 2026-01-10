import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AllNovels from "../Layout/AllNovels";
import OvrLayForm from "../template/OvrLayForm";
const Navbar = () => {

    const [activeLink, setActiveLink] = useState('');
    const handleClick = (Class) => {
        setActiveLink(prevLink => prevLink === Class ? '' : Class);
    };

    useEffect(() => {
        if (activeLink === 'advancedFilter') {
            document.body.classList.add('lock-scroll');
        } else {
            document.body.classList.remove('lock-scroll');
        }
    }, [activeLink]);

    return (
        <div>
            <nav className="navbar"> 
                <ul>
                    <li><Link to="/AllNovels">Novel List</Link></li>
                    <li>
                        
                        <a
                            onClick={() => handleClick('advancedFilter')}
                            className={activeLink === 'advancedFilter' ? 'active' : ''}
                        >
                            Advanced Filter
                            <img className="dropdown" src="./Assets/arrow-drop-down-svgrepo-com.png" alt="arrow-down" />
                        </a>
                    </li>
                </ul>
            </nav>
            <div className={`overlay ${activeLink === 'advancedFilter' ? 'active' : ''}`}>
                <OvrLayForm/>
            </div>
        </div>
    );
}

export default Navbar;
