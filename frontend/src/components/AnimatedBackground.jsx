import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Dark gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#090919] to-[#16162a]" />
      
      {/* Animated Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] bg-purple-600/20 rounded-full blur-[100px] animate-float opacity-30 mix-blend-screen" />
      <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] bg-blue-600/20 rounded-full blur-[90px] animate-float animation-delay-2000 opacity-30 mix-blend-screen" />
      <div className="absolute top-[40%] left-[50%] w-[20vw] h-[20vw] bg-indigo-500/20 rounded-full blur-[80px] animate-float animation-delay-4000 opacity-20 mix-blend-screen" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};

export default AnimatedBackground;
