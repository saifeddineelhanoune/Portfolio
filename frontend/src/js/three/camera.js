import * as THREE from 'three';

/**
 * Create and configure a camera for the scene
 * @returns {THREE.PerspectiveCamera} The configured camera
 */
export function createCamera() {
  // Create a perspective camera
  const camera = new THREE.PerspectiveCamera(
    75, // Field of view (degrees)
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    100 // Far clipping plane
  );
  
  // Position the camera
  camera.position.set(0, 0, 5);
  
  return camera;
}