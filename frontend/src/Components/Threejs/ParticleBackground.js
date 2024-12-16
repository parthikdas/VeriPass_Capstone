import { useEffect } from "react";
import "../../App.css";
const ParticleBackground = () => {
    useEffect(() => {
        // Ensure THREE is available globally
        const THREE = window.THREE;
        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('three-container').appendChild(renderer.domElement);
        // Create the particle geometry
        const particles = new THREE.BufferGeometry();
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        // Create the particle material
        const particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.015
        });
        // Create the particle system
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        camera.position.z = 5;
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            particleSystem.rotation.y += 0.001;
            renderer.render(scene, camera);
        };
        animate();
        document.addEventListener('mousemove', (e) => { // On mouse move rotate to make it look cool
            particleSystem.rotation.x += e.clientX * 0.00001;
            particleSystem.rotation.y += e.clientY * 0.00001;
        })
        // Clean up on component unmount
        return () => {
            document.getElementById('three-container').removeChild(renderer.domElement);
        };
    }, []);
    return (
        <div id="three-container"></div>
    )
}
export default ParticleBackground;