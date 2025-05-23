import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsById, addComment, deleteComment, addReply, deleteReply } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [news, setNews] = useState(null);
    const [comment, setComment] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNews();
    }, [id]);

    const fetchNews = async () => {
        try {
            const data = await getNewsById(id);
            setNews(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load news post');
            setLoading(false);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        try {
            const updatedNews = await addComment(id, comment);
            setNews(updatedNews);
            setComment('');
        } catch (err) {
            setError('Failed to add comment');
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const updatedNews = await deleteComment(id, commentId);
            setNews(updatedNews);
        } catch (err) {
            setError('Failed to delete comment');
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!replyContent.trim() || !replyingTo) return;

        try {
            const updatedNews = await addReply(id, replyingTo, replyContent);
            setNews(updatedNews);
            setReplyContent('');
            setReplyingTo(null);
        } catch (err) {
            setError('Failed to add reply');
        }
    };

    const handleDeleteReply = async (commentId, replyId) => {
        try {
            const updatedNews = await deleteReply(id, commentId, replyId);
            setNews(updatedNews);
        } catch (err) {
            setError('Failed to delete reply');
        }
    };

    if (loading) return <div className="text-center p-4">جاري التحميل...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
    if (!news) return <div className="text-center p-4">لم يتم العثور على الخبر</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={news.image} alt={news.title} className="w-full h-96 object-cover" />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                        <span>بواسطة {news.author?.firstName} {news.author?.lastName}</span>
                        <span className="mx-2">•</span>
                        <span>{format(new Date(news.createdAt), 'PPP', { locale: ar })}</span>
                    </div>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">التعليقات</h2>
                
                {/* Comment Form */}
                {(user || user?.role === 'admin') && (
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="اكتب تعليقك هنا..."
                            className="w-full p-3 border rounded-lg mb-2"
                            rows="3"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            إضافة تعليق
                        </button>
                    </form>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                    {news.comments.map((comment) => (
                        <div key={comment._id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="font-semibold">
                                        {comment.user?.firstName} {comment.user?.lastName}
                                    </span>
                                    <span className="text-gray-500 text-sm mr-2">
                                        {format(new Date(comment.createdAt), 'PPP', { locale: ar })}
                                    </span>
                                </div>
                                {(user?.role === 'admin' || user?._id === comment.user?._id) && (
                                    <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        حذف
                                    </button>
                                )}
                            </div>
                            <p className="mb-2">{comment.content}</p>

                            {/* Reply Button */}
                            {(user || user?.role === 'admin') && (
                                <button
                                    onClick={() => setReplyingTo(comment._id)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    رد
                                </button>
                            )}

                            {/* Reply Form */}
                            {replyingTo === comment._id && (
                                <form onSubmit={handleReplySubmit} className="mt-2">
                                    <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder="اكتب ردك هنا..."
                                        className="w-full p-2 border rounded-lg mb-2"
                                        rows="2"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
                                        >
                                            إرسال
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setReplyingTo(null);
                                                setReplyContent('');
                                            }}
                                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 text-sm"
                                        >
                                            إلغاء
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Replies List */}
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-2 mr-4 space-y-2">
                                    {comment.replies.map((reply) => (
                                        <div key={reply._id} className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <span className="font-semibold">
                                                        {reply.user?.firstName} {reply.user?.lastName}
                                                    </span>
                                                    <span className="text-gray-500 text-sm mr-2">
                                                        {format(new Date(reply.createdAt), 'PPP', { locale: ar })}
                                                    </span>
                                                </div>
                                                {(user?.role === 'admin' || user?._id === reply.user?._id) && (
                                                    <button
                                                        onClick={() => handleDeleteReply(comment._id, reply._id)}
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                    >
                                                        حذف
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-sm">{reply.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsDetail; 