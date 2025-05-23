import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
    return (
        <>
            <div className="my-4 py-4" id='portfolio'>
                <h2 className="my-2 text-center text-3xl text-blue-400 uppercase font-bold">منتجاتنا</h2>
                <div className='flex justify-center'>
                    <div className='w-24 border-b-4 border-blue-400 mb-8'></div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                    {/* Card 1: Internet Packages */}
                    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
                        <img
                            src="/images/wifiPackages.svg"
                            alt="Internet Packages"
                            className="w-full h-auto mb-4 object-contain"
                        />
                        <h2 className="text-gray-600 text-xl font-bold mb-2">باقات الإنترنت </h2>
                        <p className="text-gray-600 font-bold mb-4">
                        اكتشف باقات الإنترنت المناسبة لك ولأعمالك، إنترنت عالي السرعة وموثوقية ممتازة مع خيارات مرنة وسرعات متعددة تلبي جميع احتياجاتك.
                        </p>
                        <Link
                            to="/internet"
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                        >
                            → مشاهدة الباقات
                        </Link>
                    </div>

                    {/* Card 2: NanoBeam Internet */}
                    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
                        <img
                            src="/images/nanoBeam.svg"
                            alt="NanoBeam Internet"
                            className="w-full h-auto mb-4 object-contain"
                        />
                        <h2 className="text-gray-600 text-xl font-bold mb-2">تقنيات النانوبيم</h2>
                        <p className="text-gray-600 font-bold mb-4">
                            تمتع باتصال طويل المدى عبر تقنيات النانوبيم المتطورة واحصل على انترنت لاسلكي سريع , مثالي للمنازل والمكاتب والمناطق الريفية.
                        </p>
                        <Link
                            to="/nanobeam"
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                        >
                            → مشاهدة الخيارات
                        </Link>
                    </div>

                    {/* Card 3: CCTV Surveillance */}
                    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
                        <img
                            src="/images/cctvSystems.svg"
                            alt="CCTV Surveillance"
                            className="w-full h-auto mb-4 object-contain"
                        />
                        <h2 className="text-gray-600 text-xl font-bold mb-2">أنظمة المراقبة المركزية</h2>
                        <p className="text-gray-600 font-bold mb-4">
                            حماية منزلك أو مكتبك بأنظمة المراقبة المركزية المتطورة والتي تقدم صورة عالية الدقة للداخل والخارج.
                        </p>
                        <Link
                            to="/cctv"
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                        >
                            → مشاهدة الأصناف
                        </Link>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Portfolio;