import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';

const GlobalLayout = () => {
    return (
        <div className="relative min-h-screen text-white font-sans antialiased selection:bg-indigo-500/30">
            <AnimatedBackground />

            <div className="flex flex-col min-h-screen relative z-10">
                <Navbar />

                <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="animate-fade-in">
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default GlobalLayout;
