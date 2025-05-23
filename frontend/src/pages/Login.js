import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Add console log to verify component mounting
        console.log('Login component mounted');
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegister) {
                // Handle Registration
                if (formData.password !== formData.confirmPassword) {
                    setError('كلمات المرور غير متطابقة');
                    setLoading(false);
                    return;
                }
                
                // Create registration data object with only the required fields
                const registrationData = {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName
                };
                
                console.log("Sending registration data:", registrationData);
                const response = await register(registrationData);
                console.log("Registration response:", response);
                
                // Store token in localStorage
                if (response.token) {
                    localStorage.setItem('userToken', response.token);
                }
                
                // Redirect based on user role
                if (response.user && response.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/profile');
                }
            } else {
                // Handle Login
                const loginData = {
                    username: formData.username,
                    password: formData.password
                };
                
                console.log("Sending login data:", loginData);
                const response = await login(loginData);
                console.log("Login response:", response);
                
                // Store token in localStorage
                if (response.token) {
                    localStorage.setItem('userToken', response.token);
                }
                
                // Redirect based on user role
                if (response.user && response.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/profile');
                }
            }
        } catch (err) {
            console.error(isRegister ? 'Registration error:' : 'Login error:', err);
            
            // Extract error message from response if available
            let errorMessage;
            if (err.response) {
                errorMessage = err.response.data?.message || 
                    (isRegister ? 'فشل تسجيل الحساب' : 'فشل تسجيل الدخول');
                
                // Handle specific error cases
                if (err.response.status === 400) {
                    if (err.response.data?.message === 'Username or email already exists') {
                        errorMessage = 'اسم المستخدم أو البريد الإلكتروني مستخدم بالفعل';
                    }
                }
            } else {
                errorMessage = isRegister ? 'فشل تسجيل الحساب' : 'فشل تسجيل الدخول';
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const toggleRegister = () => {
        setIsRegister(!isRegister);
        setError(''); // Clear errors when switching form type
        setFormData({  // Reset form data when switching
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        {isRegister ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500 text-white p-3 rounded text-center">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">اسم المستخدم</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="اسم المستخدم"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        {isRegister && (
                            <>
                                <div>
                                    <label htmlFor="firstName" className="sr-only">الاسم الأول</label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="الاسم الأول"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="sr-only">اسم العائلة</label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="اسم العائلة"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                        {isRegister && (
                            <div>
                                <label htmlFor="email" className="sr-only">البريد الإلكتروني</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="البريد الإلكتروني"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="password" className="sr-only">كلمة المرور</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${isRegister ? '' : 'rounded-b-md'}`}
                                placeholder="كلمة المرور"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        {isRegister && (
                            <div>
                                <label htmlFor="confirmPassword" className="sr-only">تأكيد كلمة المرور</label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="تأكيد كلمة المرور"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                            ) : null}
                            {loading ? (isRegister ? 'جاري إنشاء الحساب...' : 'جاري تسجيل الدخول...') : (isRegister ? 'إنشاء حساب' : 'تسجيل الدخول')}
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm text-gray-400 mt-4">
                    {isRegister ? (
                        <> لديك حساب بالفعل؟ <button onClick={toggleRegister} className="font-medium text-blue-400 hover:text-blue-300 focus:outline-none">تسجيل الدخول</button></>
                    ) : (
                        <>ليس لديك حساب؟ <button onClick={toggleRegister} className="font-medium text-blue-400 hover:text-blue-300 focus:outline-none">سجل الآن!</button></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;