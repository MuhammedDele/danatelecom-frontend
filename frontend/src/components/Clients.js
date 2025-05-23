import React from 'react';
import hv from '../images/clients/Hikvision_logo.svg.png';
import mim from '../images/clients/mimosa-seeklogo.png';
import tp from '../images/clients/tp-link-seeklogo.png';

const clientImage = {
    height: '10rem',
    width: 'auto',
    mixBlendMode: 'colorBurn'
}

const Clients = () => {
    return (
        <div className="mt-8 bg-gray-100">
            <section data-aos="fade-up">
                <div className="my-4 py-4">
                    <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">علامات تجارية موثوقة نوفرها لكم</h2>
                    <div className='flex justify-center'>
                        <div className='w-64 border-b-4 border-blue-900'></div>
                    </div>
                    <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">نفخر بتوفير منتجات عالية الجودة من علامات تجارية عالمية مرموقة مثل Mimosa وTP-Link وHikvision، لنضمن لعملائنا أفضل حلول الشبكات والأمن.</h2>
                </div>

                <div className="p-16" data-aos="fade-in" data-aos-delay="600">
                    <div className="grid sm:grid-cols-3 lg:grid-cols-3">
                        <div style={clientImage} className="overflow-hidden flex justify-center transition-all ease-in-out opacity-50 hover:opacity-100 w-1/6">
                            <img src={hv} alt="client" />
                        </div>

                        <div style={clientImage} className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-50 hover:opacity-100">
                            <img src={tp} alt="client" />
                        </div>

                        <div style={clientImage} className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-50 hover:opacity-100">
                            <img src={mim} alt="client" />
                        </div>


                    </div>
                </div>
            </section>
        </div>
    )
}

export default Clients;