import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import heroImg from '../images/hero1.svg';

const Hero = () => {
    return (
        <>
            <div className="hero bg-gray-900" id='hero'>
                <div>
                    <NavBar />
                </div>

                <div className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-5/6" data-aos="zoom-in">
                    <div id='hero' className="flex flex-col lg:flex-row py-8 justify-between text-center lg:text-left">
                        <div className="lg:w-1/2 flex flex-col justify-center" data-aos="zoom-in" data-aos-delay="200">
                            <h1 className="mb-5 md:text-3xl text-3xl font-bold text-blue-400 text-right" dir="rtl">
                                حلول إنترنت موثوقة مصممة لتلبية احتياجاتك في الاتصال
                            </h1>
                            <div className="text-xl font-semibold tracking-tight mb-5 text-gray-300 text-right" dir="rtl">في داناتليكوم، نحن فريق ملتزم بتقديم خدمات إنترنت سريعة، مستقرة وآمنة عبر تقنيات
                            </div>
                            <div className="text-xl font-semibold tracking-tight mb-5 text-gray-300 text-right" dir="rtl">ADSL، VDSL، WIFI — لنضمن لك اتصالًا دائمًا بلا انقطاع.
                            </div>

                        </div>
                        <div className="flex lg:justify-end w-full lg:w-1/2" data-aos="fade-up" data-aos-delay="700">
                            <img alt="card img" className="rounded-t float-right duration-1000 w-5/6 md:w-3/4 lg:w-2/3 max-w-lg mx-auto opacity-90" src={heroImg} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;