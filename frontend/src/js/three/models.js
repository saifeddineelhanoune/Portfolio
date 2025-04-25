import * as THREE from 'three';

/**
 * Create 3D models and objects for the scene
 * @returns {Array} Array of 3D objects
 */
export function createModels() {
  const models = [];
  
  // Add various geometric shapes with different materials
  models.push(...createGeometricShapes());
  
  return models;
}

/**
 * Create various geometric shapes with colorful materials
 * @returns {Array} Array of geometric objects
 */
function createGeometricShapes() {
  const shapes = [];
  
  // Theme colors
  const colors = [
    0x037dd6, // primary blue
    0x00c3f8, // secondary blue
    0xff5c35, // accent orange
    0xffb931  // accent yellow
  ];
  
  // Create various geometric shapes
  
  // 1. Create a dodecahedron
  const dodecahedronGeometry = new THREE.DodecahedronGeometry(1, 0);
  const dodecahedronMaterial = new THREE.MeshStandardMaterial({
    color: colors[0],
    metalness: 0.3,
    roughness: 0.4,
    flatShading: true
  });
  const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
  dodecahedron.position.set(-2, 1, -2);
  dodecahedron.userData = {
    animate: true,
    spinningObject: true,
    spinSpeed: { x: 0.1, y: 0.2, z: 0.05 }
  };
  shapes.push(dodecahedron);
  
  // 2. Create an octahedron
  const octahedronGeometry = new THREE.OctahedronGeometry(0.8, 0);
  const octahedronMaterial = new THREE.MeshStandardMaterial({
    color: colors[1],
    metalness: 0.3,
    roughness: 0.4,
    flatShading: true
  });
  const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
  octahedron.position.set(2, -1, -1);
  octahedron.userData = {
    animate: true,
    spinningObject: true,
    spinSpeed: { x: 0.05, y: 0.15, z: 0.1 }
  };
  shapes.push(octahedron);
  
  // 3. Create a torus
  const torusGeometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
  const torusMaterial = new THREE.MeshStandardMaterial({
    color: colors[2],
    metalness: 0.3,
    roughness: 0.4
  });
  const torus = new THREE.Mesh(torusGeometry, torusMaterial);
  torus.position.set(-1.5, -1.5, 1);
  torus.userData = {
    animate: true,
    spinningObject: true,
    spinSpeed: { x: 0.2, y: 0.1, z: 0 }
  };
  shapes.push(torus);
  
  // 4. Create a icosahedron
  const icosahedronGeometry = new THREE.IcosahedronGeometry(0.5, 0);
  const icosahedronMaterial = new THREE.MeshStandardMaterial({
    color: colors[3],
    metalness: 0.3,
    roughness: 0.4,
    flatShading: true
  });
  const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
  icosahedron.position.set(1.5, 1, 2);
  icosahedron.userData = {
    animate: true,
    floatingObject: true,
    floatSpeed: 1.5,
    floatAmplitude: 0.2,
    floatOffset: icosahedron.position.y
  };
  shapes.push(icosahedron);
  
  // 5. Create a cube with glowing edges
  const cubeGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: colors[0],
    metalness: 0.7,
    roughness: 0.2
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(2, 1.5, -2);
  cube.userData = {
    animate: true,
    floatingObject: true,
    floatSpeed: 2,
    floatAmplitude: 0.15,
    floatOffset: cube.position.y
  };
  shapes.push(cube);
  
  // Add glow edges to the cube
  const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5
  });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  cube.add(edges);
  
  // 6. Create a small sphere with glowing effect
  const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: colors[1],
    metalness: 0.5,
    roughness: 0.2,
    emissive: colors[1],
    emissiveIntensity: 0.2
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(-3, 0, 0);
  sphere.userData = {
    animate: true,
    floatingObject: true,
    floatSpeed: 1,
    floatAmplitude: 0.3,
    floatOffset: sphere.position.y
  };
  shapes.push(sphere);
  
  // Add glow effect to the sphere
  const glowGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: colors[1],
    transparent: true,
    opacity: 0.15
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  sphere.add(glow);
  
  return shapes;
}