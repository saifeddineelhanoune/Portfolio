import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Create and configure controls for the scene
 * @param {THREE.Camera} camera - The camera to control
 * @param {HTMLElement} domElement - The DOM element for controls (usually canvas)
 * @returns {OrbitControls} The configured controls
 */
export function createControls(camera, domElement) {
  // Create orbit controls
  const controls = new OrbitControls(camera, domElement);
  
  // Configure controls for smooth navigation
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.enablePan = false;
  
  // Limit rotation to prevent disorientation
  controls.minPolarAngle = Math.PI * 0.4;
  controls.maxPolarAngle = Math.PI * 0.6;
  
  // Automatically rotate for an interactive background effect
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  
  return controls;
}