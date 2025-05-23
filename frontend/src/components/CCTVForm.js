import React, { useState, useEffect } from 'react';

const CCTVForm = ({ onSubmit, onCancel, product }) => {
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        type_detail: 'camera',
        isActive: true
    });
    const [image, setImage] = useState(null);
    const [features, setFeatures] = useState([]);
    const [specifications, setSpecifications] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                description: product.description || '',
                price: product.price || '',
                type_detail: product.type_detail || 'camera',
                isActive: product.isActive
            });
            setFeatures(product.features || []);
            setSpecifications(product.specifications || {});
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const addFeature = () => {
        setFeatures([...features, '']);
    };

    const removeFeature = (index) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
    };

    const handleSpecificationChange = (key, value) => {
        setSpecifications(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const addSpecification = () => {
        setSpecifications(prev => ({
            ...prev,
            '': ''
        }));
    };

    const removeSpecification = (key) => {
        const newSpecs = { ...specifications };
        delete newSpecs[key];
        setSpecifications(newSpecs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate required fields
        if (!formData.title || !formData.description || !formData.price || !formData.type_detail) {
            setError('Please fill in all required fields');
            return;
        }

        // Validate image for new products
        if (!product && !image) {
            setError('Please select an image');
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('type_detail', formData.type_detail);
            formDataToSend.append('isActive', formData.isActive);

            // Only append image if it's a new file
            if (image) {
                formDataToSend.append('image', image);
            }

            // Append features
            features.forEach((feature, index) => {
                formDataToSend.append(`features[${index}]`, feature);
            });

            // Append specifications
            Object.entries(specifications).forEach(([key, value]) => {
                formDataToSend.append(`specifications[${key}]`, value);
            });

            await onSubmit(formDataToSend);
        } catch (err) {
            setError('Failed to save product');
            console.error('Error saving product:', err);
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
                <label className="block text-sm font-medium text-blue-400">الوصف *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-400">السعر *</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-400">النوع *</label>
                <select
                    name="type_detail"
                    value={formData.type_detail}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="camera">كاميرا</option>
                    <option value="dvr">مسجل</option>
                    <option value="nvr">مسجل شبكة</option>
                    <option value="accessories">ملحقات</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-400">الصورة {!product && '*'}</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!product}
                    className="mt-1 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-400">المميزات</label>
                {features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                        <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            حذف
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addFeature}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    إضافة ميزة
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium text-blue-400">المواصفات</label>
                {Object.entries(specifications).map(([key, value], index) => (
                    <div key={index} className="mt-2 flex items-center gap-2">
                        <input
                            type="text"
                            value={key}
                            onChange={(e) => {
                                const newSpecs = { ...specifications };
                                delete newSpecs[key];
                                newSpecs[e.target.value] = value;
                                setSpecifications(newSpecs);
                            }}
                            placeholder="المفتاح"
                            className="block w-1/3 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleSpecificationChange(key, e.target.value)}
                            placeholder="القيمة"
                            className="block w-1/3 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => removeSpecification(key)}
                            className="text-red-600 hover:text-red-800"
                        >
                            حذف
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addSpecification}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    إضافة مواصفة
                </button>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <label className="mr-2 block text-sm font-medium text-blue-400">متوفر</label>
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
                    {product ? 'تحديث' : 'إنشاء'} المنتج
                </button>
            </div>
        </form>
    );
};

export default CCTVForm; 