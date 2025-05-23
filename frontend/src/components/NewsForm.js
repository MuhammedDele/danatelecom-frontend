import React, { useState, useEffect } from 'react';

const NewsForm = ({ onSubmit, onCancel, news }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        isPublished: true
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (news) {
            setFormData({
                title: news.title || '',
                content: news.content || '',
                isPublished: news.isPublished
            });
        }
    }, [news]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate required fields
        if (!formData.title || !formData.content) {
            setError('Please fill in all required fields');
            return;
        }

        // Validate image for new posts
        if (!news && !image) {
            setError('Please select an image');
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('isPublished', formData.isPublished);

            if (image) {
                formDataToSend.append('image', image);
            }

            await onSubmit(formDataToSend);
        } catch (err) {
            setError('Failed to save news post');
            console.error('Error saving news post:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-400 px-4 py-3 rounded relative">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-blue-400">العنوان *</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-400">المحتوى *</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-400">الصورة {!news && '*'}</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!news}
                    className="mt-1 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <label className="mr-2 block text-sm font-medium text-blue-400">نشر الخبر</label>
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                    إلغاء
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {news ? 'تحديث' : 'إنشاء'} الخبر
                </button>
            </div>
        </form>
    );
};

export default NewsForm; 