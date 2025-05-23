import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Container */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">شركة داناتليكوم</span>
              <span className="block text-blue-400 mt-2">نحن نبتكر المستقبل</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-semibold">
              شركة رائدة في مجال الاتصالات والتكنولوجيا وأنظمة المراقبة في سوريا
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Vision Card */}
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="mr-3 text-lg leading-6 font-bold text-white">رؤيتنا</h3>
              </div>
              <div className="mt-4 text-base text-gray-300 font-semibold">
                نسعى لأن نكون الشركة الرائدة في تقديم حلول الاتصالات والتكنولوجيا وأنظمة المراقبة في سوريا، مع التركيز على الابتكار والجودة والموثوقية.
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mr-3 text-lg leading-6 font-bold text-white">مهمتنا</h3>
              </div>
              <div className="mt-4 text-base text-gray-300 font-semibold">
                تقديم حلول تقنية متكاملة وعالية الجودة تلبي احتياجات عملائنا وتساهم في تطوير المجتمع السوري.
              </div>
            </div>
          </div>

          {/* Values Card */}
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mr-3 text-lg leading-6 font-bold text-white">قيمنا</h3>
              </div>
              <div className="mt-4 text-base text-gray-300 font-semibold">
                نؤمن بالجودة، الابتكار، النزاهة، والالتزام بتقديم أفضل الخدمات لعملائنا.
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-white text-center mb-8">خدماتنا</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-xl font-bold text-white mb-4">أنظمة المراقبة</h3>
                <ul className="space-y-3 text-gray-300 font-semibold">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    كاميرات مراقبة عالية الدقة
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    أنظمة مراقبة عن بعد
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    حلول أمنية متكاملة
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-xl font-bold text-white mb-4">خدمات الاتصالات</h3>
                <ul className="space-y-3 text-gray-300 font-semibold">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    خدمات الإنترنت عالية السرعة
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    حلول الشبكات المتكاملة
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    خدمات الدعم الفني
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">تواصل معنا</h2>
          <p className="text-lg text-gray-300 mb-8 font-semibold">
            نحن هنا لمساعدتك في اختيار أفضل الحلول لاحتياجاتك
          </p>
          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            <a href="tel:+963XXXXXXXXX" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
              <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              اتصل بنا
            </a>
            <a href="mailto:info@danatelcom.com" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200">
              <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              راسلنا
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 