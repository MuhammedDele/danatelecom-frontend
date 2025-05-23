import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // Correct import from react-router-hash-link
import { FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NavLinks = ({ onNavItemClick }) => {
    const [productsOpen, setProductsOpen] = useState(false);
    const [internetServicesOpen, setInternetServicesOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProductsOpen(false);
                setInternetServicesOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle link click - close dropdowns and notify parent if needed
    const handleLinkClick = () => {
        setProductsOpen(false);
        setInternetServicesOpen(false);
        if (onNavItemClick) onNavItemClick();
    };

    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:space-x-8 rtl:lg:space-x-reverse" ref={dropdownRef}>
            <HashLink
                className="w-full lg:w-auto py-2 lg:py-0 px-4 text-sm md:text-base font-extrabold text-gray-300 hover:text-blue-400 transition-colors border-b lg:border-b-0 border-gray-700"
                smooth to="/about"
                onClick={handleLinkClick}
            >
                الرئيسية
            </HashLink>

            <HashLink
                className="w-full lg:w-auto py-2 lg:py-0 px-4 text-sm md:text-base font-extrabold text-gray-300 hover:text-blue-400 transition-colors border-b lg:border-b-0 border-gray-700"
                smooth to="/#services"
                onClick={handleLinkClick}
            >
                خدماتنا
            </HashLink>

            {/* Products Dropdown */}
            <div className="relative w-full lg:w-auto">
                <button
                    className="flex items-center justify-between w-full lg:w-auto py-2 lg:py-0 px-4 text-sm md:text-base font-extrabold text-gray-300 hover:text-blue-400 transition-colors border-b lg:border-b-0 border-gray-700"
                    onClick={() => setProductsOpen(!productsOpen)}
                >
                    منتجاتنا
                    {productsOpen ? <FaChevronUp className="mr-1 ml-1" /> : <FaChevronDown className="mr-1 ml-1" />}
                </button>

                {productsOpen && (
                    <div className="lg:absolute right-0 mt-2 w-full lg:w-64 bg-gray-800 rounded-md shadow-lg z-50">
                        {/* First Section: Internet Services */}
                        <div className="py-2 px-4 border-b border-gray-700 relative">
                            <button
                                className="flex items-center justify-between w-full text-right text-blue-400 hover:text-blue-300"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setInternetServicesOpen(!internetServicesOpen);
                                }}
                            >
                                خدمات الإنترنت
                                {internetServicesOpen ? <FaChevronLeft className="mr-1 ml-1" /> : <FaChevronRight className="mr-1 ml-1" />}
                            </button>

                            {internetServicesOpen && (
                                <div
                                    className="
                absolute 
                top-full left-0 mt-2 
                md:top-0 md:left-full md:mt-0
                pl-4 md:pl-0 md:border-l
                border-t md:border-t-0
                border-gray-600 bg-gray-900 
                z-10 min-w-[180px]
            "
                                >
                                    <Link
                                        to="/internet"
                                        className="block py-1 text-gray-300 text-right hover:text-blue-400 text-sm"
                                        onClick={handleLinkClick}
                                    >
                                        خدمات الانترنت اللاسلكي (wifi)
                                    </Link>
                                    <Link
                                        to="/internet"
                                        className="block py-1 text-gray-300 text-right hover:text-blue-400 text-sm"
                                        onClick={handleLinkClick}
                                    >
                                        خدمات الانترنت (ADSL , VDSL)
                                    </Link>
                                    <Link
                                        to="/internet"
                                        className="block py-1 text-gray-300 text-right hover:text-blue-400 text-sm"
                                        onClick={handleLinkClick}
                                    >
                                        خدمات الانترنت بنظام (B2B)
                                    </Link>
                                </div>
                            )}
                        </div>




                        {/* Second Section */}
                        <div className="py-2 px-4">
                            <Link
                                to="/cctv"
                                className="flex items-center justify-between w-full text-right text-blue-400 hover:text-blue-300"
                                onClick={handleLinkClick}
                            >
                                كاميرات المراقبة
                            </Link>
                        </div>

                        <div className="py-2 px-4">
                            <Link
                                to="/nanobeam"
                                className="flex items-center justify-between w-full text-right text-blue-400 hover:text-blue-300"
                                onClick={handleLinkClick}
                            >
                                 تقنيات النانوبيم
                            </Link>
                        </div>
                    </div>
                    
                )}
                
            </div>
            

            <Link
                className="w-full lg:w-auto py-2 lg:py-0 px-4 text-sm md:text-base font-extrabold text-gray-300 hover:text-blue-400 transition-colors border-b lg:border-b-0 border-gray-700"
                to="/news"
                onClick={handleLinkClick}
            >
                آخر الأخبار
            </Link>

            <HashLink
                className="w-full lg:w-auto py-2 lg:py-0 px-4 text-sm md:text-base font-extrabold text-gray-300 hover:text-blue-400 transition-colors border-b lg:border-b-0 border-gray-700"
                to="/about"
                onClick={handleLinkClick}
            >
                من نحن
            </HashLink>
        </div>
    );
};

export default NavLinks;