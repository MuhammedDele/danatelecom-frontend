import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getCCTVProducts,
    getNanoBeamProducts,
    getInternetPackages,
    getNews,
    deleteCCTVProduct,
    deleteNanoBeamProduct,
    deleteInternetPackage,
    deleteNews,
    createCCTVProduct,
    createNanoBeamProduct,
    createInternetPackage,
    createNews,
    updateCCTVProduct,
    updateNanoBeamProduct,
    updateInternetPackage,
    updateNews,
    getCurrentUser
} from '../services/api';
import CCTVForm from './CCTVForm';
import NanoBeamForm from './NanoBeamForm';
import InternetPackageForm from './InternetPackageForm';
import NewsForm from './NewsForm';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({
        cctv: [],
        nanobeam: [],
        internet: []
    });
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('cctv');
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [news, setNews] = useState([]);
    const [editingNews, setEditingNews] = useState(null);

    useEffect(() => {
        checkAdminStatus();
        fetchNews();
    });

    const checkAdminStatus = async () => {
        try {
            const user = await getCurrentUser();
            if (user.role !== 'admin') {
                navigate('/'); // Redirect non-admin users to home
                return;
            }
            setIsAdmin(true);
            await fetchAllProducts();
        } catch (error) {
            console.error('Error checking admin status:', error);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            const [cctvData, nanobeamData, internetData] = await Promise.all([
                getCCTVProducts(),
                getNanoBeamProducts(),
                getInternetPackages()
            ]);

            // Format image URLs for all products
            const formatImageUrls = (products) => {
                return products.map(product => ({
                    ...product,
                    image: product.image ? `${process.env.REACT_APP_API_URL}${product.image}` : null
                }));
            };

            setProducts({
                cctv: formatImageUrls(cctvData),
                nanobeam: formatImageUrls(nanobeamData),
                internet: formatImageUrls(internetData)
            });
            setError(null);
        } catch (err) {
            setError('Failed to fetch products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchNews = async () => {
        try {
            const data = await getNews();
            setNews(data);
        } catch (err) {
            console.error('Error fetching news:', err);
        }
    };

    // const handleAdd = (category) => {
    //     setSelectedCategory(category);
    //     setEditingProduct(null);
    //     setShowForm(true);
    // };

    const handleEdit = (product, category) => {
        setSelectedCategory(category);
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (productId, category) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            return;
        }

        try {
            let response;
            switch (category) {
                case 'cctv':
                    response = await deleteCCTVProduct(productId);
                    break;
                case 'nanobeam':
                    response = await deleteNanoBeamProduct(productId);
                    break;
                case 'internet':
                    response = await deleteInternetPackage(productId);
                    break;
                default:
                    throw new Error('Invalid category');
            }

            if (response.success) {
                // Update the products state by removing the deleted product
                setProducts(prev => ({
                    ...prev,
                    [category]: prev[category].filter(p => p._id !== productId)
                }));
                setError(null);
            } else {
                throw new Error(response.message || 'Failed to delete product');
            }
        } catch (err) {
            setError('Failed to delete product');
            console.error('Error deleting product:', err);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            let result;
            if (selectedCategory === 'cctv') {
                if (editingProduct) {
                    result = await updateCCTVProduct(editingProduct._id, formData);
                } else {
                    result = await createCCTVProduct(formData);
                }
            } else if (selectedCategory === 'nanobeam') {
                if (editingProduct) {
                    result = await updateNanoBeamProduct(editingProduct._id, formData);
                } else {
                    result = await createNanoBeamProduct(formData);
                }
            } else if (selectedCategory === 'internet') {
                if (editingProduct) {
                    result = await updateInternetPackage(editingProduct._id, formData);
                } else {
                    result = await createInternetPackage(formData);
                }
            } else if (selectedCategory === 'news') {
                if (editingNews) {
                    result = await updateNews(editingNews._id, formData);
                } else {
                    result = await createNews(formData);
                }
                await fetchNews(); // Refresh news list
                setShowForm(false);
                setEditingNews(null);
                return;
            } else {
                throw new Error('Invalid category');
            }

            if (result.success) {
                await fetchAllProducts(); // Refresh the products list
                setShowForm(false);
                setEditingProduct(null);
                setError(null);
            } else {
                throw new Error(result.message || 'Failed to save product');
            }
        } catch (error) {
            setError('فشل في حفظ البيانات');
            console.error('Error saving product:', error);
        }
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingProduct(null);
        setEditingNews(null);
    };

    const renderForm = () => {
        if (!showForm) return null;

        const commonProps = {
            onSubmit: handleFormSubmit,
            onCancel: handleFormCancel,
            product: editingProduct
        };

        switch (selectedCategory) {
            case 'cctv':
                return <CCTVForm {...commonProps} />;
            case 'nanobeam':
                return <NanoBeamForm {...commonProps} />;
            case 'internet':
                return <InternetPackageForm {...commonProps} />;
            case 'news':
                return <NewsForm {...commonProps} news={editingNews} />;
            default:
                return null;
        }
    };

    const handleDeleteNews = async (newsId) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
            try {
                await deleteNews(newsId);
                await fetchNews(); // Refresh the news list
                setError(null);
            } catch (err) {
                setError('فشل في حذف الخبر');
                console.error('Error deleting news:', err);
            }
        }
    };

    const handleEditNews = (newsItem) => {
        setEditingNews(newsItem);
        setSelectedCategory('news');
        setShowForm(true);
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-300">جاري التحميل...</p>
                </div>
            );
        }

        if (error) {
            return <p className="text-red-400">{error}</p>;
        }

        if (selectedCategory === 'news') {
            return (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-blue-400">إدارة الأخبار</h2>
                        <button
                            onClick={() => {
                                setEditingNews(null);
                                setShowForm(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            إضافة خبر جديد
                        </button>
                    </div>
                    <div className="grid gap-6">
                        {news.map((item) => (
                            <div key={item._id} className="bg-gray-800 p-6 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-blue-400">{item.title}</h3>
                                        <p className="text-gray-300 mt-2">{item.content}</p>
                                        <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm">
                                            <span>بواسطة {item.author?.firstName} {item.author?.lastName}</span>
                                            <span>{new Date(item.createdAt).toLocaleDateString('ar-SA')}</span>
                                            <span className={item.isPublished ? 'text-green-400' : 'text-yellow-400'}>
                                                {item.isPublished ? 'منشور' : 'مسودة'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditNews(item)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            تعديل
                                        </button>
                                        <button
                                            onClick={() => handleDeleteNews(item._id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-blue-400">
                        {selectedCategory === 'cctv'
                            ? 'إدارة منتجات كاميرات المراقبة'
                            : selectedCategory === 'nanobeam'
                            ? 'إدارة منتجات NanoBeam'
                            : 'إدارة باقات الإنترنت'}
                    </h2>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setShowForm(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        إضافة {selectedCategory === 'cctv' ? 'منتج' : 'باقة'} جديد
                    </button>
                </div>
                <div className="grid gap-6">
                    {products[selectedCategory].map((product) => (
                        <div key={product._id} className="bg-gray-800 p-6 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    {product.image && (
                                        <div className="w-32 h-32 flex-shrink-0">
                                            <img 
                                                src={product.image} 
                                                alt={product.title}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-bold text-blue-400">{product.title}</h3>
                                        <p className="text-gray-300 mt-2">{product.description}</p>
                                        <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm">
                                            <span>{product.price} ريال</span>
                                            <span className={product.isActive ? 'text-green-400' : 'text-red-400'}>
                                                {product.isActive ? 'متوفر' : 'غير متوفر'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(product, selectedCategory)}
                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        تعديل
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id, selectedCategory)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        حذف
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return null; // Don't render anything for non-admin users
    }

    return (
        <div className="bg-gray-900 min-h-screen py-12 pt-24" dir="rtl">
            <div className="container mx-auto px-4">
                {!showForm ? (
                    <>
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={() => setSelectedCategory('cctv')}
                                className={`px-4 py-2 rounded ${
                                    selectedCategory === 'cctv'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                كاميرات المراقبة
                            </button>
                            <button
                                onClick={() => setSelectedCategory('nanobeam')}
                                className={`px-4 py-2 rounded ${
                                    selectedCategory === 'nanobeam'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                NanoBeam
                            </button>
                            <button
                                onClick={() => setSelectedCategory('internet')}
                                className={`px-4 py-2 rounded ${
                                    selectedCategory === 'internet'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                باقات الإنترنت
                            </button>
                            <button
                                onClick={() => setSelectedCategory('news')}
                                className={`px-4 py-2 rounded ${
                                    selectedCategory === 'news'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                الأخبار
                            </button>
                        </div>
                        {renderContent()}
                    </>
                ) : (
                    <div className="bg-gray-800 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-blue-400">
                                {editingProduct || editingNews ? 'تعديل' : 'إضافة جديد'} - {
                                    selectedCategory === 'cctv' ? 'كاميرا مراقبة' :
                                    selectedCategory === 'nanobeam' ? 'NanoBeam' :
                                    selectedCategory === 'internet' ? 'باقة إنترنت' :
                                    'خبر'
                                }
                            </h2>
                            <button
                                onClick={handleFormCancel}
                                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                            >
                                إلغاء
                            </button>
                        </div>
                        {renderForm()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard; 