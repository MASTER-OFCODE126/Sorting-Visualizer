// src/components/Hero.jsx
import React from "react";

const Hero = ({ children }) => {
    return (
        <section className="text-black h-screen flex flex-col items-center  bg-zinc-800 ">
            {/* Content */}
            {/* <div className="text-[10vw]">
                <h1>THE SORTING VISUALIZER</h1>
            </div> */}
            <nav className="bg-zinc-800 w-full text-zinc-300 card p-1 pb-1.5 pr-1.5 rounde-lg">
                <h1 className="  text-3xl text-center bg-zinc-900 py-2  ">THE SORTING VISUALIZER</h1>
            </nav>
            <div className="px-6 max-w-3xl">

                <p className="mt-6  text-[3vw] text-center text-zinc-300 font-medium ">
                    Experience algorithms come alive with interactive sorting animations.
                    Learn, play, and master sorting techniques visually.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => {
                            const visualizer = document.getElementById("visualizer");
                            visualizer?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="ring-2 ring-zinc-100 text-zinc-200 px-6 py-3 bg-indigo-500 hover:bg-indigo-700 rounded-xl font-semibold shadow-lg transition"
                    >
                        Get Started
                    </button>
                   
                </div>
            </div>

            {/* Scroll indicator */}

            <div>
                {children}
            </div>
        </section>
    );
};

export default Hero;
