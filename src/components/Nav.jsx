// Navbar.js
import React, { useEffect, useState } from 'react';
import { Button, Image, Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react'
import { motion } from "framer-motion";
import Hamburger from 'hamburger-react'
import { Link, useLocation } from 'react-router-dom';
import {
    EmailShareButton,
    FacebookShareButton,
    WhatsappShareButton,
    InstapaperShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon,
    LinkedinIcon,
} from "react-share";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation();

    const shareUrl = "https://tech-stuffs.netlify.app/"

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const variants = {
        open: {
            clipPath: 'circle(1200px at 50px 50px)',
            transition: {
                type: 'spring',
                stiffness: 20
            }
        },
        close: {
            clipPath: 'circle(30px at 50px 50px)',
            transition: {
                delay: 0.5,
                type: 'spring',
                stiffness: 400,
                damping: 40
            }
        }
    }


    return (
        <nav className='navbar'>
            <div className="upper-nav">
                <span className='text-sm hidden xs:inline'>contact: jasvindersingh3593@gmail.com</span>
                <div className='text-sm flex absolute right-3 xs:static'>
                    <LinkedinShareButton
                        className="mx-1"
                        url={shareUrl}
                        title={"Experience the best of online coding with our efficient web-based compiler and editor!"}
                    >
                        <LinkedinIcon size={35} round={true} />
                    </LinkedinShareButton>
                    <WhatsappShareButton
                        className="mx-1"
                        url={shareUrl}
                        title="Experience the best of online coding with our efficient web-based compiler and editor!"
                    >
                        <WhatsappIcon size={35} round={true} />
                    </WhatsappShareButton>
                    <TwitterShareButton
                        className="mx-1"
                        url={shareUrl}
                        title="Experience the best of online coding with our efficient web-based compiler and editor!"
                    >
                        <TwitterIcon size={35} round={true} />
                    </TwitterShareButton>
                </div>
            </div>
            <div className="lower-nav">
                <div className='hamburger'>
                    <Hamburger toggled={isOpen} toggle={handleToggle} />
                </div>
                <div className="logo">
                    Code Blaze
                </div>
                <div
                    className="lower-nav-links"
                >
                    <Link className={`nav-links ${location.pathname === '/' ? 'blue' : ''}`} to='/'>Home</Link>
                    {/* <Menu>
                        <MenuButton className='nav-links'>File</MenuButton>
                        <Portal>
                            <MenuList>
                                <MenuItem>Menu 1</MenuItem>
                                <MenuItem>New Window</MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu> */}
                    <Link className={`nav-links`} to='/'>Input</Link>
                    <Link className={`nav-links ${location.pathname === '/web-editor' ? 'blue' : ''}`} to='/web-editor'>Web Editor</Link>
                    <Link className={`nav-links ${location.pathname === '/compiler' ? 'blue' : ''}`} to='/'>Compiler</Link>
                </div>
                {isOpen && (<motion.div
                    className="lower-nav-links flex"
                    animate={isOpen ? "open" : "closed"}
                    variants={variants}
                    style={{ display: isOpen && 'flex' }}
                >
                    <Link className='nav-links' href='/'>Home</Link>
                    <Menu>
                        <MenuButton className='nav-links'>File</MenuButton>
                        <Portal>
                            <MenuList>
                                <MenuItem>Menu 1</MenuItem>
                                <MenuItem>New Window</MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                    <Link className='nav-links' to='/'>Input</Link>
                    <Link className='nav-links' to='/web-editor'>Web Editor</Link>
                    <Link className='nav-links' to='/'>Compiler</Link>
                    <Link className='nav-links' to='/'>Settings</Link>
                </motion.div>)}
                <div className="login-signup">
                    <Button colorScheme='blue' className='bg-[#272727]' borderRadius="20px" variant='outline'>
                        Signup
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
