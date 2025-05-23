import React, { useState } from 'react';

const InternetPackageForm = ({ onSubmit, onCancel, product }) => {
    const [formData, setFormData] = useState({
        title: product?.title || '',
        description: product?.description || '',
        price: product?.price || '',
        type_detail: product?.type_detail || 'wifi',
        features: product?.features || [],
        specifications: product?.specifications || {},
        isActive: product?.isActive ?? true
    });
    
    const [error, setError] = useState('');
    const [specKey, setSpecKey] = useState('');
    const [specValue, setSpecValue] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const handleFeatureChange = (index, value) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map((feature, i) => i === index ? value : feature)
        }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const addSpecification = () => {
        if (specKey && specValue) {
            setFormData(prev => ({
                ...prev,
                specifications: {
                    ...prev.specifications,
                    [specKey]: specValue
                }
            }));
            setSpecKey('');
            setSpecValue('');
        }
    };

    const removeSpecification = (key) => {
        setFormData(prev => {
            const newSpecs = { ...prev.specifications };
            delete newSpecs[key];
            return { ...prev, specifications: newSpecs };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.title || !formData.description || !formData.price || !formData.type_detail) {
            setError('Please fill in all required fields.');
            return;
        }

        // Filter out empty features
        const filteredFeatures = formData.features.filter(f => f.trim() !== '');
        
        // Prepare the data for submission
        const submitData = {
            ...formData,
            features: filteredFeatures,
            price: Number(formData.price)
        };

        setError('');
        onSubmit(submitData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-600">{error}</div>}
            
            {/* Common Fields */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                    rows="3" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                />
            </div>

            {/* Internet Package Specific Fields */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Service Type</label>
                <select 
                    name="type_detail" 
                    value={formData.type_detail} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="wifi">WiFi</option>
                    <option value="adsl">ADSL</option>
                    <option value="vdsl">VDSL</option>
                </select>
            </div>

            {/* Specifications */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Specifications</label>
                <div className="mt-2 space-y-2">
                    {Object.entries(formData.specifications).map(([key, value]) => (
                        <div key={key} className="flex gap-2">
                            <span className="flex-1 bg-gray-100 p-2 rounded">{key}: {value}</span>
                            <button 
                                type="button" 
                                onClick={() => removeSpecification(key)} 
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={specKey} 
                            onChange={(e) => setSpecKey(e.target.value)} 
                            placeholder="Specification name" 
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                        />
                        <input 
                            type="text" 
                            value={specValue} 
                            onChange={(e) => setSpecValue(e.target.value)} 
                            placeholder="Value" 
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                        />
                        <button 
                            type="button" 
                            onClick={addSpecification} 
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Features</label>
                <div className="mt-2 space-y-2">
                    {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                            <input 
                                type="text" 
                                value={feature} 
                                onChange={e => handleFeatureChange(index, e.target.value)} 
                                placeholder="Feature" 
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                            />
                            <button 
                                type="button" 
                                onClick={() => removeFeature(index)} 
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button 
                        type="button" 
                        onClick={addFeature} 
                        className="text-blue-600 hover:text-blue-800"
                    >
                        + Add Feature
                    </button>
                </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center">
                <input 
                    type="checkbox" 
                    name="isActive" 
                    checked={formData.isActive} 
                    onChange={handleChange} 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                />
                <label className="ml-2 block text-sm text-gray-700">Active</label>
            </div>

            <div className="flex justify-end space-x-3">
                <button 
                    type="button" 
                    onClick={onCancel} 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                >
                    {product ? 'Update Package' : 'Create Package'}
                </button>
            </div>
        </form>
    );
};

export default InternetPackageForm; 