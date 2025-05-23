import React, { useState, useEffect } from 'react';
import { getCCTVProducts } from '../services/api';

const CCTVProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getCCTVProducts();
            // Ensure image URLs are properly formatted
            const formattedData = data.map(product => ({
                ...product,
                image: product.image ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${product.image}` : null
            }));
            setProducts(formattedData);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = selectedType === 'all'
        ? products
        : products.filter(product => product.type_detail === selectedType);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-lg text-gray-300">Loading products...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <p className="text-red-400">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen py-12 pt-24" dir="rtl">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl text-blue-400 font-bold text-center mb-8">أنظمة المراقبة</h1>
                {/* <p className="text-gray-300 text-center mb-12 text-lg">
                    حلول اتصال لاسلكي عالية الأداء للمسافات الطويلة
                </p> */}

                {/* Type Selection */}

                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setSelectedType('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedType === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        جميع المنتجات
                    </button>
                    <button
                        onClick={() => setSelectedType('camera')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedType === 'camera'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        كاميرات
                    </button>
                    <button
                        onClick={() => setSelectedType('dvr')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedType === 'dvr'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        أنظمة التسجيل
                    </button>
                    <button
                        onClick={() => setSelectedType('nvr')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedType === 'nvr'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        أنظمة التحكم
                    </button>
                    <button
                        onClick={() => setSelectedType('accessories')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedType === 'accessories'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        الملحقات
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="bg-gray-800 rounded-lg overflow-hidden p-8 shadow-md">
                        <div className="aspect-w-4 aspect-h-3 bg-gray-700 mb-4 rounded-md overflow-hidden">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-opacity duration-300 transform hover:scale-105"
                                    onClick={() => setSelectedImage(product.image)}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                    }}
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-gray-500">
                                    No Image Available
                                </div>
                            )}
                        </div>
                        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-center">{product.title}</h2>
                        <p className="text-gray-300 mb-4 text-lg line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">${product.price}</span>
                            {!product.isActive && (
                                <span className="px-2 py-1 text-sm text-red-400 bg-red-900/50 rounded-full">
                                    غير متوفر
                                </span>
                            )}
                        </div>
                        {product.features?.length > 0 && (
                            <div className="mt-2">
                                <h4 className="text-sm font-medium text-gray-300 mb-2">الميزات</h4>
                                <ul className="list-disc list-inside text-sm text-gray-400">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="line-clamp-1">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-300 mb-2">Specifications:</h4>
                                <dl className="text-sm text-gray-400">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-1">
                                            <dt className="font-medium">{key}:</dt>
                                            <dd className="line-clamp-1">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}
                        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors duration-300">
                            طلب المنتج
                        </button>
                        {selectedImage && (
                            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                                <div className="relative">
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        ✕
                                    </button>
                                    <img
                                        src={selectedImage}
                                        alt="Full view"
                                        className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
                                    />
                                </div>
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
                            <h3 className="text-xl font-semibold text-white mb-2">أداء عالي</h3>
                            <p className="text-gray-300">سرعة نقل بيانات تصل إلى 450 ميجابت في الثانية</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="text-blue-400 mr-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">موثوقية عالية</h3>
                            <p className="text-gray-300">تصميم مقاوم للظروف الجوية القاسية</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CCTVProducts; 