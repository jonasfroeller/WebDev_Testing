import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

if ( WebGL.isWebGLAvailable() ) {
    const scene = new THREE.Scene();

    const loader = new GLTFLoader();
    let pineapple = null;
    loader.load('./public/pineapple.gltf', function (gltf) {
        pineapple = gltf.scene;

        const pineappleGroup = new THREE.Group();
        pineappleGroup.add(pineapple);

        scene.add( pineappleGroup );
    }, undefined, function ( error ) {
        console.error( error );
    });
    
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement);
    
    camera.position.z = 5;
    
    function animate() {
        requestAnimationFrame(animate);
    
        if (pineapple) {
            pineapple.rotation.y += 0.025;
            if (pineapple.position.y > -2) {
                pineapple.position.y -= 0.005; // pineapple.position.y += 0.005;
            }
        }
        
        renderer.render( scene, camera );
    }
    animate();

} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}