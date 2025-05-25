import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import NavLinks from '../Navbar/NavLinks';
import { HashLink } from 'react-router-hash-link';

const NavBar = () => {
    const [top, setTop] = useState(!window.scrollY);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Listen for token changes (login/logout from other tabs)
        const handleStorage = () => {
            const adminToken = localStorage.getItem('adminToken');
            const userToken = localStorage.getItem('userToken');
            setIsLoggedIn(!!(adminToken || userToken));
            setIsAdmin(!!adminToken);
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    useEffect(() => {
        // Update login state on every render
        const adminToken = localStorage.getItem('adminToken');
        const userToken = localStorage.getItem('userToken');
        setIsLoggedIn(!!(adminToken || userToken));
        setIsAdmin(!!adminToken);
    }, []);

    useEffect(() => {
      const scrollHandler = () => {
        window.pageYOffset > 10 ? setTop(false) : setTop(true)
      };
      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close mobile menu when clicking a link
    const closeMobileMenu = () => {
        if (isOpen) setIsOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-30 transition duration-300 ease-in-out mb-16 ${
            !top && 'bg-gray-800 shadow-lg'
        }`}>
            <div className="container mx-auto px-4">
                {/* Flip the order of items in the flex container */}
                <div className="flex flex-row-reverse justify-between items-center text-center font-semibold">
                    {/* Logo will now appear on the left side because of flex-row-reverse */}
                    <HashLink smooth to="/#hero" onClick={closeMobileMenu}>
                        <h1 className="font-extrabold text-4xl text-blue-400">داناتليكوم</h1>
                    </HashLink>
                    
                    {/* Desktop Menu */}
                    <div className='hidden lg:flex items-center space-x-6 space-x-reverse p-5'>
                        <NavLinks />
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4 space-x-reverse">
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        className="text-blue-400 hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        لوحة التحكم
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    className="text-blue-400 hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    الملف الشخصي
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    تسجيل الخروج
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                تسجيل الدخول
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="p-2 rounded-lg lg:hidden text-blue-400 hover:bg-gray-700 transition-colors" 
                        onClick={toggleMenu}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden bg-gray-800 mt-2 rounded-lg shadow-lg">
                        <div className="flex flex-col space-y-4 p-4">
                            <NavLinks onNavItemClick={closeMobileMenu} />
                            {isLoggedIn ? (
                                <>
                                    {isAdmin && (
                                        <Link
                                            to="/admin"
                                            className="text-blue-400 hover:text-blue-300 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                            onClick={closeMobileMenu}
                                        >
                                            لوحة التحكم
                                        </Link>
                                    )}
                                    <Link
                                        to="/profile"
                                        className="text-blue-400 hover:text-blue-300 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                        onClick={closeMobileMenu}
                                    >
                                        الملف الشخصي
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            closeMobileMenu();
                                        }}
                                        className="w-full text-right bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                    >
                                        تسجيل الخروج
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                    onClick={closeMobileMenu}
                                >
                                    تسجيل الدخول
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;