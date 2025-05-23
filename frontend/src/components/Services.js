import React from 'react';
import img from '../images/wifi.svg'; 
import img2 from '../images/adsl.svg';
import img3 from '../images/vdsl.svg';
import img4 from '../images/cctv.svg';
import { Link } from 'react-router-dom';

const Services = () => {

    return (
        <div id="services" className="bg-gray-900 py-12" dir="rtl">
            <section data-aos="zoom-in-down">
                    <div className="my-4 py-4">
                        <h2 className="my-2 text-center text-3xl text-blue-400 uppercase font-bold">خدماتنا</h2>
                        
                        <div className='flex justify-center'>
                            <div className='w-24 border-b-4 border-blue-400'></div>
                        </div>
                        <h4 className="mt-4 mx-12 text-center text-xl lg:text-xl font-normal text-blue-400">نلتزم في داناتليكوم بدعم نجاح عملائنا ونمو أعمالهم من خلال تقديم حلول اتصالات موثوقة، مدعومة بأنظمة مراقبة دقيقة لضمان أعلى مستويات الأداء والاستقرار</h4>
                    </div>

                    <div className="px-12" data-aos="fade-down" data-aos-delay="600">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            
                            <div className="bg-gray-800 transition-all ease-in-out duration-400 overflow-hidden text-gray-300 hover:bg-gray-700 rounded-lg shadow-2xl p-3 group">
                                <div className="m-2 text-justify text-sm" dir="rtl">
                                <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out opacity-90" src={img} />
                                    <h2 className="font-semibold my-4 text-xl text-center text-blue-400">🌐 خدمة الإنترنت اللاسلكي <span>(WiFi)</span></h2>
                                    <p className="text-md font-normal">
                                    توفر داناتليكوم حلول إنترنت لاسلكي فعّالة من خلال أجهزة NanoBeam عالية الجودة، وتغطية واسعة في الأحياء السكنية والتجارية. كما نقدم بطاقات إنترنت مسبقة الدفع لتناسب مختلف الاستخدامات بسرعات مستقرة وأسعار منافسة.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-800 transition-all ease-in-out duration-400 overflow-hidden text-gray-300 hover:bg-gray-700 rounded-lg shadow-2xl p-3 group">
                                <div className="m-2 text-justify text-sm" dir="rtl">
                                <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out opacity-90" src={img2} />
                                    <h2 className="font-semibold my-4 text-xl text-center text-blue-400">🧷 خدمة الإنترنت عبر ADSL</h2>
                                    <p className="text-md font-normal">
                                    نقدم خدمة ADSL بسرعات متعددة وأسعار مرنة لتناسب احتياجات المستخدمين في المنازل والمكاتب، مع ضمان اتصال ثابت ودعم فني مستمر لضمان راحتك واستمرارية الخدمة.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-800 transition-all ease-in-out duration-400 overflow-hidden text-gray-300 hover:bg-gray-700 rounded-lg shadow-2xl p-3 group">
                                <div className="m-2 text-justify text-sm" dir="rtl">
                                    <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out opacity-90" src={img3} />
                                    <h2 className="font-semibold my-4 text-xl text-center text-blue-400">⚡ خدمة الإنترنت عبر VDSL</h2>
                                    <p className="text-md font-normal">
                                    لمن يبحث عن سرعات أعلى، نوفر لك تقنية VDSL المتقدمة التي تتيح تحميلًا وتنزيلًا أسرع من ADSL، مما يجعلها مثالية للمؤسسات والمستخدمين ذوي الاحتياجات الكبيرة في تصفح الإنترنت أو العمل عن بعد.
                                    </p>
                                </div>
                            </div>

                            <Link to="/cctv-products" className="bg-gray-800 transition-all ease-in-out duration-400 overflow-hidden text-gray-300 hover:bg-gray-700 rounded-lg shadow-2xl p-3 group">
                                <div className="m-2 text-justify text-sm" dir="rtl">
                                <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out opacity-90" src={img4} />
                                    <h2 className="font-semibold my-4 text-xl text-center text-blue-400">📹 أنظمة المراقبة (CCTV)</h2>
                                    <p className="text-md font-normal">
                                    نركّب في داناتليكوم أنظمة مراقبة مرئية حديثة تشمل كاميرات داخلية وخارجية بدقة عالية، مع إمكانية المشاهدة عن بُعد عبر الإنترنت، لتأمين المنازل، المحلات، والمراكز التجارية بكل احترافية.
                                    </p>
                                </div>
                            </Link>                    
                        </div>
                    </div>
            </section>

            <section>
                <div className="m-auto max-w-6xl p-2 md:p-12 h-5/6">
                    <div className="flex flex-col-reverse lg:flex-row py-8 justify-between lg:text-left" data-aos="zoom-out">
                        <div className="lg:w-1/2 flex flex-col lg:mx-4 justify-center" dir="rtl">
                            <div className='text-blue-400 mb-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" className='fill-current'><path d="M2 12h2a7.986 7.986 0 0 1 2.337-5.663 7.91 7.91 0 0 1 2.542-1.71 8.12 8.12 0 0 1 6.13-.041A2.488 2.488 0 0 0 17.5 7C18.886 7 20 5.886 20 4.5S18.886 2 17.5 2c-.689 0-1.312.276-1.763.725-2.431-.973-5.223-.958-7.635.059a9.928 9.928 0 0 0-3.18 2.139 9.92 9.92 0 0 0-2.14 3.179A10.005 10.005 0 0 0 2 12zm17.373 3.122c-.401.952-.977 1.808-1.71 2.541s-1.589 1.309-2.542 1.71a8.12 8.12 0 0 1-6.13.041A2.488 2.488 0 0 0 6.5 17C5.114 17 4 18.114 4 19.5S5.114 22 6.5 22c.689 0 1.312-.276 1.763-.725A9.965 9.965 0 0 0 12 22a9.983 9.983 0 0 0 9.217-6.102A9.992 9.992 0 0 0 22 12h-2a7.993 7.993 0 0 1-.627 3.122z"></path><path d="M12 7.462c-2.502 0-4.538 2.036-4.538 4.538S9.498 16.538 12 16.538s4.538-2.036 4.538-4.538S14.502 7.462 12 7.462zm0 7.076c-1.399 0-2.538-1.139-2.538-2.538S10.601 9.462 12 9.462s2.538 1.139 2.538 2.538-1.139 2.538-2.538 2.538z"></path></svg>
                            </div>
                            <h3 className="text-3xl text-blue-400 font-bold">نُنفّذ بخبرة</h3>
                            <div>
                                <p className='my-3 text-xl text-gray-300 font-semibold'>
                                بخبرة تمتد لأكثر من 10 سنوات في مجال خدمات الإنترنت والاتصال، نوفر في داناتليكوم حلولًا تقنية موثوقة تشمل WiFi، ADSL، VDSL، وأنظمة المراقبة، مع توصيات مدروسة لضمان أفضل أداء وتقليل التكاليف وتحسين الكفاءة لدى الأفراد والمؤسسات.
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex flex-col lg:mx-4 justify-center" dir="rtl">
                            <div className='text-blue-400 mb-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" className='fill-current'><path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z"></path></svg>
                            </div >
                            <h3 className="text-3xl text-blue-400 font-bold">نتعاون معك لتحقيق الاتصال الأمثل</h3>
                            <div>
                                <p className='my-3 text-xl text-gray-300 font-semibold'>في داناتليكوم، نعمل جنبًا إلى جنب مع عملائنا لتوفير حلول اتصال مخصصة تشمل الإنترنت اللاسلكي، الـ ADSL وVDSL، وأنظمة المراقبة، بما يلائم احتياجاتهم التقنية ويوفر لهم أعلى درجات الاستقرار والأمان</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services;