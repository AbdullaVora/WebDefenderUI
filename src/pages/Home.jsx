import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import bg from '../assets/homeBG.png';
import logo from '../assets/logo.png';
import { LuSearchCode } from "react-icons/lu";

const Home = () => {
    useEffect(() => {
        // GSAP animation on component mount
        gsap.fromTo(
            ".logo",
            {
                opacity: 0,
                scale: 0.8,
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                ease: "power3.out",
                duration: 3,
                delay: 0.5,
                yoyo: true, // Optional to make the animation repeat back and forth
            }
        );

    }, []);

    return (
        <div className="h-screen w-full overflow-hidden relative">
            <img src={bg} alt="main-banner" className="w-full h-full object-cover" />

            <div className="flex justify-center flex-col items-center h-full absolute top-50 -translate-y-64 left-0 w-full">
                <img
                    src={logo}
                    alt="logo"
                    className="w-[15%] logo"  
                />

                <div className="relative w-[50%] my-4">
                    <input
                        type="text"
                        className="w-full px-2 py-3 pl-3 bg-[#1D243D] border-transparent 
            focus:outline-2 focus:outline-[#2e538f] transition-all duration-200 
            placeholder-[#6f7585] text-white rounded-md"
                        placeholder="Search..."
                    />
                    <LuSearchCode
                        size={24}
                        color='#6f7585'
                        className="text-white absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
