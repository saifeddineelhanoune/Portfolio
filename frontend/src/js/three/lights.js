import * as THREE from 'three';

/**
 * Create and configure lights for the scene
 * @returns {Array} Array of configured lights
 */
export function createLights() {
  const lights = [];
  
  // Ambient light for base illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  lights.push(ambientLight);
  
  // Directional light for main illumination with shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  
  // Configure shadow properties for better quality
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.bias = -0.0001;
  
  lights.push(directionalLight);
  
  // Add colorful point lights for the MetaMask-like effect
  const pointLightColors = [
    0x037dd6, // primary blue
    0x00c3f8, // secondary blue
    0xff5c35, // accent orange
    0xffb931  // accent yellow
  ];
  
  // Create point lights with different colors
  const pointLights = pointLightColors.map((color, index) => {
    const pointLight = new THREE.PointLight(color, 0.5, 10);
    
    // Position lights in a circle around the scene
    const angle = (index / pointLightColors.length) * Math.PI * 2;
    const radius = 5;
    pointLight.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * 2,
      Math.sin(angle) * radius
    );
    
    return pointLight;
  });
  
  // Add all point lights to the lights array
  lights.push(...pointLights);
  
  return lights;
}