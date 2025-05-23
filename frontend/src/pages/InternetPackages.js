import React, { useState, useEffect } from 'react';
import { getInternetPackages } from '../services/api';

const InternetPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState('all');

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const data = await getInternetPackages();
            setPackages(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch packages');
            console.error('Error fetching packages:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredPackages = selectedType === 'all'
        ? packages
        : packages.filter(pkg => pkg.type_detail === selectedType);

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen py-12 pt-24" dir="rtl">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-lg text-gray-300">جاري تحميل الباقات...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen py-12 pt-24 bg-gradient-to-br from-gray-800 via-gray-900 to-black" dir="rtl">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-red-400">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 pt-24 bg-gradient-to-br from-gray-800 via-slate-900 to-black" dir="rtl">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl text-blue-400 font-bold text-center mb-8">باقات الإنترنت</h1>
                <p className="text-gray-300 text-center mb-12 text-lg">
                    باقات إنترنت متنوعة تناسب جميع احتياجاتك
                </p>

                {/* Type Selection */}
                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setSelectedType('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedType === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        جميع الباقات
                    </button>
                    <button
                        onClick={() => setSelectedType('wifi')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedType === 'wifi'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        WiFi
                    </button>
                    <button
                        onClick={() => setSelectedType('adsl')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedType === 'adsl'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        ADSL
                    </button>
                    <button
                        onClick={() => setSelectedType('vdsl')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedType === 'vdsl'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        VDSL
                    </button>
                </div>

                {/* Packages Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPackages.map((pkg) => (
                        <div
                            key={pkg._id}
                            className="bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">{pkg.title}</h2>

                            <p className="text-gray-300 mb-4 text-lg line-clamp-2 text-center">{pkg.description}</p>

                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-bold text-blue-400">${pkg.price}</span>
                                {!pkg.isActive && (
                                    <span className="px-2 py-1 text-sm text-red-400 bg-red-900/50 rounded-full">
                                        غير متوفر
                                    </span>
                                )}
                            </div>

                            {pkg.features?.length > 0 && (
                                <div className="mt-2">
                                    <h4 className="text-sm font-medium text-gray-300 mb-2">المميزات:</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                        {pkg.features.map((feature, index) => (
                                            <li key={index} className="line-clamp-1">{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {pkg.specifications && Object.keys(pkg.specifications).length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-300 mb-2">المواصفات:</h4>
                                    <dl className="text-sm text-gray-400 space-y-1">
                                        {Object.entries(pkg.specifications).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-1">
                                                <dt className="font-medium">{key}:</dt>
                                                <dd className="line-clamp-1">{value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            )}
                        </div>
                    ))}
                </div>




                <div className="mt-16 bg-gray-800 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">مميزات إضافية</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                            <div className="text-blue-400 mr-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">سرعة عالية</h3>
                                <p className="text-gray-300">سرعات إنترنت تصل إلى 1 جيجابت في الثانية</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="text-blue-400 mr-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">دعم فني 24/7</h3>
                                <p className="text-gray-300">فريق دعم فني متخصص على مدار الساعة</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternetPackages; 