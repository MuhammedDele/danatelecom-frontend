import React, { useState } from 'react';
import CCTVForm from './CCTVForm';
import InternetPackageForm from './InternetPackageForm';
import NanoBeamForm from './NanoBeamForm';

const ProductForm = ({ onSubmit, onCancel, product, category }) => {
    const [type, setType] = useState(product?.type || category || '');

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    return (
        <div className="space-y-6">
            {!category && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        name="type"
                        value={type}
                        onChange={handleTypeChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Select Type</option>
                        <option value="cctv">CCTV</option>
                        <option value="internet">Internet Package</option>
                        <option value="nanobeam">NanoBeam</option>
                    </select>
                </div>
            )}
            {type === 'cctv' && <CCTVForm onSubmit={onSubmit} onCancel={onCancel} product={product} />}
            {type === 'internet' && <InternetPackageForm onSubmit={onSubmit} onCancel={onCancel} product={product} />}
            {type === 'nanobeam' && <NanoBeamForm onSubmit={onSubmit} onCancel={onCancel} product={product} />}
        </div>
    );
};

export default ProductForm; 