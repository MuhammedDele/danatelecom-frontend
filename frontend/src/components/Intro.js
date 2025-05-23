import React from 'react';
import img from '../images/Black and Blue Modern CCTV Installation Service Instagram Story.svg';


const Intro = () => {
    return (
        <>
                <div className="m-auto max-w-6xl p-2 md:p-12 h-5/6" id='about' >

                    <div className="flex flex-col-reverse lg:flex-row py-8 justify-between lg:text-left" data-aos="fade-up">
                        <div className="lg:w-1/2 flex flex-col xl:mx-4 ">
                            <img alt="card img" className="rounded-t float-right duration-1000 w-5/6 md:w-3/4 lg:w-2/3 max-w-lg mx-auto opacity-90" src={img} />
                        </div>
                        <div className="flex-col my-4 text-center lg:text-left lg:my-0 lg:justify-end w-full lg:w-1/2 px-8" data-aos="zoom-in" data-aos-delay="500">
                            
                            <h4 className="text-xl text-blue-400 font-medium text-right" dir="rtl">للمؤسسات والشركات الصغيرة والمتوسطة نقدم حلولًا متكاملة لأنظمة المراقبة بالفيديو <span>(CCTV)</span></h4>
                            <div dir="rtl">
                                <p className='my-3 text-lg text-gray-300 font-normal text-right'>فريقنا المتخصص يتمتع بخبرة واسعة في تصميم وتنفيذ أنظمة مراقبة حديثة مصممة لتلبية احتياجاتك الأمنية بدقة وكفاءة</p>
                            </div>
                            
                            <div dir="rtl">
                                <p className='my-3 text-lg text-gray-300 font-normal text-right'>
                                    نتولى مسؤولية إعداد، تركيب، وصيانة أنظمة المراقبة لضمان مراقبة فعالة على مدار الساعة، وتعزيز الحماية للمباني، المنشآت، والممتلكات.
                                    <br /><br />
                                    تشمل خدماتنا: دراسة الموقع، اختيار المعدات المناسبة، تركيب الكاميرات، ربطها بالشبكات، وتوفير الدعم الفني المستمر.
                                    <br /><br />
                                    نساعدك على تحقيق أقصى استفادة من تقنيات المراقبة الحديثة لتعزيز السلامة وتحسين عمليات المتابعة والإدارة.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Intro;