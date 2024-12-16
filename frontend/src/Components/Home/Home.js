import React, { useEffect, Suspense } from 'react';
import '../../App.css';
import './Home.css';
const Planet = React.lazy(() => import("../Threejs/Planet"))
const Home = () => {
    const text = "Easily sign up and set up your company’s security preferences.No more password headaches – just streamlined security.";
    useEffect(() => {
        const timeouts = [];
        const loadText = () => {
            for (let i = 0; i < text.length; i++) {
                const timeout = setTimeout(() => {
                    const element = document.getElementById('loadText');
                    if (element) {
                        element.innerHTML += text[i] === '.' ? '.<br>' : text[i];
                    }
                }, i * 50);
                timeouts.push(timeout);
            }
        };

        loadText();

        // Cleanup function to clear timeouts
        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, [text]);
    return (
        <div id="body">
            <div id="sectionA">
                <h5 className='orbitron-text grey'>Secure Your Digital Space</h5>
                <h1 className='orbitron-text' id='logo'>
                    <p>V</p>
                    <p>e</p>
                    <p>r</p>
                    <p>i</p>
                    <p>P</p>
                    <p>a</p>
                    <p>s</p>
                    <p>s</p>
                </h1>
                <h6 id="loadText" className='exo-2-text grey1'> </h6>
            </div>
            <div id="sectionB">
                <Suspense fallback={<div>Loading...</div>}>
                    <Planet />
                </Suspense>
            </div>
        </div>
    );
};
export default Home;