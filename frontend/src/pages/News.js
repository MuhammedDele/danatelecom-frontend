import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getNews, getNewsById, likeNews, addComment, deleteComment, addReply, deleteReply, getCurrentUser } from '../services/api';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaTrash } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

const News = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newsData, setNewsData] = useState([]);
    const [singleNews, setSingleNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState('');
    const [user, setUser] = useState(null);
    const [commentError, setCommentError] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
                if (token) {
                    const userData = await getCurrentUser();
                    setUser(userData);
                }
            } catch (err) {
                console.error('Error fetching user:', err);
                localStorage.removeItem('userToken');
                localStorage.removeItem('adminToken');
            }
        };

        const fetchData = async () => {
            try {
                setLoading(true);
                await fetchUser();
                
                if (id) {
                    const data = await getNewsById(id);
                    if (!data) {
                        setError('News post not found');
                        return;
                    }
                    setSingleNews(data);
                } else {
                    const data = await getNews();
                    setNewsData(data);
                }
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.response?.data?.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleLike = async (newsId) => {
        const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const updatedNews = await likeNews(newsId);
            if (id) {
                setSingleNews(updatedNews);
            } else {
                setNewsData(prev => prev.map(n => n._id === newsId ? updatedNews : n));
            }
        } catch (err) {
            console.error('Error liking news:', err);
            if (err.response?.status === 401) {
                localStorage.removeItem('userToken');
                localStorage.removeItem('adminToken');
                navigate('/login');
            }
        }
    };

    const handleComment = async (newsId) => {
        const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
            return;
        }

        if (!comment.trim()) {
            setCommentError('Please enter a comment');
            return;
        }

        try {
            setCommentError('');
            const updatedNews = await addComment(newsId, comment);
            if (id) {
                setSingleNews(updatedNews);
            } else {
                setNewsData(prev => prev.map(n => n._id === newsId ? updatedNews : n));
            }
            setComment('');
        } catch (err) {
            console.error('Error adding comment:', err);
            setCommentError('Failed to add comment. Please try again.');
            if (err.response?.status === 401) {
                localStorage.removeItem('userToken');
                localStorage.removeItem('adminToken');
                navigate('/login');
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
        if (!token) {
            navigate('/login');
            return;
        }

        const comment = singleNews.comments.find(c => c._id === commentId);
        if (!comment) return;

        // Check if user is admin or comment owner
        if (user?.role !== 'admin' && user?._id !== comment.user?._id) {
            setError('You are not authorized to delete this comment');
            return;
        }

        try {
            const updatedNews = await deleteComment(singleNews._id, commentId);
            setSingleNews(updatedNews);
        } catch (err) {
            console.error('Error deleting comment:', err);
            setError('Failed to delete comment');
            if (err.response?.status === 401) {
                localStorage.removeItem('userToken');
                localStorage.removeItem('adminToken');
                navigate('/login');
            }
        }
    };

    const handleReplySubmit = async (commentId) => {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
        if (!token) {
            navigate('/login');
            return;
        }

        if (!replyContent.trim()) {
            setCommentError('Please enter a reply');
            return;
        }

        try {
            setCommentError('');
            const updatedNews = await addReply(singleNews._id, commentId, replyContent);
            setSingleNews(updatedNews);
            setReplyContent('');
            setReplyingTo(null);
        } catch (err) {
            console.error('Error adding reply:', err);
            setCommentError('Failed to add reply. Please try again.');
            if (err.response?.status === 401) {
                localStorage.removeItem('userToken');
                localStorage.removeItem('adminToken');
                navigate('/login');
            }
        }
    };

    const handleDeleteReply = async (commentId, replyId) => {
        console.log('Attempting to delete reply:', { commentId, replyId });
        
        const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
        if (!token) {
            console.log('No token found, redirecting to login');
            navigate('/login');
            return;
        }

        const comment = singleNews.comments.find(c => c._id === commentId);
        if (!comment) {
            console.log('Comment not found:', commentId);
            setError('Comment not found');
            return;
        }

        const reply = comment.replies.find(r => r._id === replyId);
        if (!reply) {
            console.log('Reply not found:', replyId);
            setError('Reply not found');
            return;
        }

        // Check if user is admin or reply owner
        if (user?.role !== 'admin' && user?._id !== reply.user?._id) {
            console.log('User not authorized to delete reply:', { 
                userRole: user?.role, 
                userId: user?._id, 
                replyUserId: reply.user?._id 
            });
            setError('You are not authorized to delete this reply');
            return;
        }

        try {
            console.log('Sending delete request for reply:', { newsId: singleNews._id, commentId, replyId });
            const updatedNews = await deleteReply(singleNews._id, commentId, replyId);
            console.log('Reply deleted successfully, updating news:', updatedNews);
            setSingleNews(updatedNews);
            setError(null);
        } catch (err) {
            console.error('Error deleting reply:', err);
            const errorMessage = err.response?.data?.error || err.message || 'Failed to delete reply';
            console.log('Error details:', { 
                status: err.response?.status,
                data: err.response?.data,
                message: errorMessage
            });
            setError(errorMessage);
            
            if (err.response?.status === 401) {
                console.log('Authentication error, clearing tokens and redirecting to login');
                localStorage.removeItem('userToken');
                localStorage.removeItem('adminToken');
                navigate('/login');
            }
        }
    };

    const handleShare = (newsId) => {
        const url = `${window.location.origin}/news/${newsId}`;
        navigator.clipboard.writeText(url);
        // Show a toast or notification that the link was copied
    };

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen py-12 pt-24" dir="rtl">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-lg text-gray-300">جاري التحميل...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900 min-h-screen py-12 pt-24" dir="rtl">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-red-400">{error}</p>
                        <button
                            onClick={() => navigate('/news')}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            العودة إلى الأخبار
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (id && !singleNews) {
        return (
            <div className="bg-gray-900 min-h-screen py-12 pt-24" dir="rtl">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-red-400">لم يتم العثور على الخبر</p>
                        <button
                            onClick={() => navigate('/news')}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            العودة إلى الأخبار
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (id) {
        // Single news post view
        return (
            <div className="bg-gray-900 min-h-screen py-12 pt-24" dir="rtl">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden">
                        {singleNews.image && (
                            <img
                                src={`${API_URL}${singleNews.image}`}
                                alt={singleNews.title}
                                className="w-full h-96 object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/placeholder-image.jpg';
                                }}
                            />
                        )}
                        <div className="p-8">
                            <h1 className="text-3xl font-bold text-blue-400 mb-4">{singleNews.title}</h1>
                            <p className="text-gray-300 mb-4">{singleNews.content}</p>
                            <div className="flex items-center justify-between text-gray-400 text-sm mb-8">
                                <span>بواسطة {singleNews.author?.firstName} {singleNews.author?.lastName || 'مستخدم'}</span>
                                <span>{new Date(singleNews.createdAt).toLocaleDateString('ar-SA' , { calendar: 'gregory' })}</span>
                            </div>

                            {/* Social Interactions */}
                            <div className="border-t border-gray-700 pt-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <button
                                        onClick={() => handleLike(singleNews._id)}
                                        className={`flex items-center gap-2 ${
                                            singleNews.likes?.includes(user?._id)
                                                ? 'text-red-500'
                                                : 'text-gray-400'
                                        }`}
                                    >
                                        {singleNews.likes?.includes(user?._id) ? (
                                            <FaHeart className="text-xl" />
                                        ) : (
                                            <FaRegHeart className="text-xl" />
                                        )}
                                        <span>{singleNews.likes?.length || 0}</span>
                                    </button>
                                    <button
                                        onClick={() => handleShare(singleNews._id)}
                                        className="text-gray-400 hover:text-blue-400"
                                    >
                                        <FaShare className="text-xl" />
                                    </button>
                                </div>

                                {/* Comments Section */}
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                                        <FaComment className="text-xl" />
                                        التعليقات ({singleNews.comments?.length || 0})
                                    </h3>
                                    {user && (
                                        <div className="mb-4">
                                            <textarea
                                                value={comment}
                                                onChange={(e) => {
                                                    setComment(e.target.value);
                                                    setCommentError('');
                                                }}
                                                placeholder="اكتب تعليقك هنا..."
                                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                rows="3"
                                            />
                                            {commentError && (
                                                <p className="text-red-400 text-sm mt-1">{commentError}</p>
                                            )}
                                            <button
                                                onClick={() => handleComment(singleNews._id)}
                                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                            >
                                                تعليق
                                            </button>
                                        </div>
                                    )}
                                    <div className="space-y-4">
                                        {singleNews.comments?.map((comment) => (
                                            <div key={comment._id} className="bg-gray-700 p-4 rounded">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-bold text-blue-400">
                                                            {comment.user?.firstName} {comment.user?.lastName || 'مستخدم'}
                                                        </p>
                                                        <p className="text-gray-300 mt-1">
                                                            {comment.content}
                                                        </p>
                                                        <div className="flex items-center gap-4 mt-2">
                                                            {user && (
                                                                <button
                                                                    onClick={() => setReplyingTo(comment._id)}
                                                                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                                                                >
                                                                    <FaComment className="text-sm" />
                                                                    رد
                                                                </button>
                                                            )}
                                                            {(user?.role === 'admin' || user?._id === comment.user?._id) && (
                                                                <button
                                                                    onClick={() => handleDeleteComment(comment._id)}
                                                                    className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                                                                >
                                                                    <FaTrash className="text-sm" />
                                                                    حذف
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-sm mt-2">
                                                    {new Date(comment.createdAt).toLocaleDateString('ar-SA', { calendar: 'gregory' })}
                                                </p>

                                                {/* Replies List */}
                                                {comment.replies && comment.replies.length > 0 && (
                                                    <div className="mt-3 mr-4 space-y-2">
                                                        {comment.replies.map((reply) => (
                                                            <div key={reply._id} className="bg-gray-600 p-3 rounded">
                                                                <div className="flex justify-between items-start">
                                                                    <div>
                                                                        <p className="font-semibold text-blue-400">
                                                                            {reply.user?.firstName} {reply.user?.lastName}
                                                                        </p>
                                                                        <p className="text-gray-300 text-sm mt-1">
                                                                            {reply.content}
                                                                        </p>
                                                                    </div>
                                                                    {(user?.role === 'admin' || user?._id === reply.user?._id) && (
                                                                        <button
                                                                            onClick={() => handleDeleteReply(comment._id, reply._id)}
                                                                            className="text-red-400 hover:text-red-300 text-sm"
                                                                        >
                                                                            <FaTrash />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                                <p className="text-gray-400 text-xs mt-1">
                                                                    {new Date(reply.createdAt).toLocaleDateString('ar-SA', { calendar: 'gregory' })}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Reply Form */}
                                                {replyingTo === comment._id && (
                                                    <div className="mt-3 mr-4">
                                                        <textarea
                                                            value={replyContent}
                                                            onChange={(e) => setReplyContent(e.target.value)}
                                                            placeholder="اكتب ردك هنا..."
                                                            className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                            rows="2"
                                                        />
                                                        <div className="flex gap-2 mt-2">
                                                            <button
                                                                onClick={() => handleReplySubmit(comment._id)}
                                                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                                            >
                                                                إرسال
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setReplyingTo(null);
                                                                    setReplyContent('');
                                                                }}
                                                                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                                                            >
                                                                إلغاء
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // News list view
    return (
        <div className="bg-gray-900 min-h-screen py-12 pt-24" dir="rtl">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-blue-400 mb-8">آخر الأخبار</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsData.map((item) => (
                        <div key={item._id} className="bg-gray-800 rounded-lg overflow-hidden">
                            <Link to={`/news/${item._id}`}>
                                {item.image && (
                                    <img
                                        src={`${API_URL}${item.image}`}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                )}
                            </Link>
                            <div className="p-6">
                                <Link to={`/news/${item._id}`}>
                                    <h2 className="text-xl font-bold text-blue-400 mb-2">{item.title}</h2>
                                </Link>
                                <p className="text-gray-300 mb-4 line-clamp-3">{item.content}</p>
                                <div className="flex items-center justify-between text-gray-400 text-sm">
                                    <span>بواسطة {item.author?.firstName} {item.author?.lastName || 'مستخدم'}</span>
                                    <span>{new Date(item.createdAt).toLocaleDateString('ar-SA')}</span>
                                </div>
                                <div className="flex items-center gap-4 mt-4">
                                    <button
                                        onClick={() => handleLike(item._id)}
                                        className={`flex items-center gap-2 ${
                                            item.likes.includes(user?._id)
                                                ? 'text-red-500'
                                                : 'text-gray-400'
                                        }`}
                                    >
                                        {item.likes.includes(user?._id) ? (
                                            <FaHeart className="text-xl" />
                                        ) : (
                                            <FaRegHeart className="text-xl" />
                                        )}
                                        <span>{item.likes.length}</span>
                                    </button>
                                    <Link
                                        to={`/news/${item._id}`}
                                        className="flex items-center gap-2 text-gray-400"
                                    >
                                        <FaComment className="text-xl" />
                                        <span>{item.comments.length}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News; 