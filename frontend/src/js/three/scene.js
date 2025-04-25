import * as THREE from 'three';
import { createCamera } from './camera';
import { createLights } from './lights';
import { createControls } from './controls';
import { createModels } from './models';

// Scene variables
let scene, renderer, camera, controls;
let animationFrameId;

// Animation objects
let objects = [];

/**
 * Initialize the Three.js scene
 */
export function initThreeScene() {
  // Get the canvas element
  const canvas = document.querySelector('.webgl');
  
  if (!canvas) return;
  
  // Create the scene
  scene = new THREE.Scene();
  
  // Create the renderer
  renderer = createRenderer(canvas);
  
  // Create the camera
  camera = createCamera();
  
  // Create lights
  const lights = createLights();
  lights.forEach(light => scene.add(light));
  
  // Create controls
  controls = createControls(camera, renderer.domElement);
  
  // Create scene objects
  const models = createModels();
  models.forEach(model => {
    scene.add(model);
    if (model.userData && model.userData.animate) {
      objects.push(model);
    }
  });
  
  // Add background particles
  createBackgroundParticles();
  
  // Add window resize listener
  window.addEventListener('resize', handleResize);
  
  // Start animation loop
  animate();
}

/**
 * Create the WebGL renderer
 */
function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true // Enable transparency
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Update deprecated properties with newer Three.js API
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  return renderer;
}

/**
 * Create animated background particles
 */
function createBackgroundParticles() {
  // Generate random particle distribution
  const particleCount = 1000;
  const particles = new THREE.BufferGeometry();
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  // Particle colors based on our theme
  const colorOptions = [
    new THREE.Color(0x037dd6), // primary
    new THREE.Color(0x00c3f8), // secondary
    new THREE.Color(0xff5c35), // accent
    new THREE.Color(0xffb931)  // accent-2
  ];
  
  // Generate random positions and colors
  for (let i = 0; i < particleCount; i++) {
    // Position
    positions[i * 3] = (Math.random() - 0.5) * 10;     // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    
    // Color
    const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  
  // Add attributes to geometry
  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  // Create material with custom point size
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.7
  });
  
  // Create the particle system
  const particleSystem = new THREE.Points(particles, particleMaterial);
  particleSystem.userData = { animate: true, particleSystem: true };
  
  // Add to scene and animation objects
  scene.add(particleSystem);
  objects.push(particleSystem);
}

/**
 * Handle window resize
 */
function handleResize() {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

/**
 * Animation loop
 */
function animate() {
  animationFrameId = requestAnimationFrame(animate);
  
  // Update controls
  if (controls) controls.update();
  
  // Animate objects
  const time = performance.now() * 0.001; // Time in seconds
  
  objects.forEach(object => {
    if (object.userData.particleSystem) {
      // Rotate particle system slowly
      object.rotation.y = time * 0.05;
    } else if (object.userData.floatingObject) {
      // Floating animation with sine wave
      object.position.y = Math.sin(time * object.userData.floatSpeed) * object.userData.floatAmplitude + object.userData.floatOffset;
      
      // Gentle rotation
      object.rotation.y = time * 0.2;
    } else if (object.userData.spinningObject) {
      // Spinning animation
      object.rotation.x = time * object.userData.spinSpeed.x;
      object.rotation.y = time * object.userData.spinSpeed.y;
      object.rotation.z = time * object.userData.spinSpeed.z;
    }
  });
  
  // Render the scene
  renderer.render(scene, camera);
}

/**
 * Cleanup resources when the component unmounts
 */
export function cleanupThreeScene() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  
  // Remove event listener
  window.removeEventListener('resize', handleResize);
  
  // Dispose of resources
  objects.forEach(object => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach(material => material.dispose());
      } else {
        object.material.dispose();
      }
    }
  });
  
  // Clear references
  scene = null;
  renderer = null;
  camera = null;
  controls = null;
  objects = [];
}