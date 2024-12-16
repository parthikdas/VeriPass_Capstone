import { useEffect } from "react";
const Planet = () => {
    useEffect(() => {
        // Ensure THREE is available globally
        const THREE = window.THREE;
        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true }); // To enable transparency
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Here the planet is appended as a child of SectionB
        document.getElementById('sectionB').appendChild(renderer.domElement);
        const planetGeometry = new THREE.SphereGeometry(2, 20, 26);
        const planetMaterial = new THREE.MeshBasicMaterial({
            color: 0x0bdada,
            wireframe: true // Enable wireframe mode
        },);
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        planet.position.set(2.5, 0, 0);
        scene.add(planet);

        // Create the ring geometry and material
        const ringGeometry = new THREE.RingGeometry(2.5, 2.7, 10, 3, 0, 3);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xe2e209,
            side: THREE.DoubleSide,
            wireframe: true
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2 - 0.1; // Rotate the ring to be horizontal
        planet.add(ring); // Add the ring to the planet

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            planet.rotation.y += 0.005;
            renderer.render(scene, camera);
        };
        animate();
        document.addEventListener('mousemove', (e) => { // On mouse move rotate to make it look cool
            planet.rotation.x += e.clientX * 0.00001;
            planet.rotation.y += e.clientY * 0.00001;
        })
        // Clean up on component unmount
        return () => {
            console.log("Planet Gone")
            // document.getElementById('sectionB').removeChild(renderer.domElement);
        };
    }, [])
    return (
        <></>
    )
}
export default Planet;