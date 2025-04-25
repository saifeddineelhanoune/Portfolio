// Import GSAP for smooth animations
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize animations for the website
 */
export function initAnimations() {
  // Hero section animations
  animateHero();
  
  // Section animations on scroll
  animateSections();
  
  // Animate particles in the background
  createParticles();
}

/**
 * Animate hero section elements
 */
function animateHero() {
  const heroContent = document.querySelector('.hero-content');
  const heroElements = heroContent.children;
  
  // Create a timeline for hero section animation
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  // Animate each element with a stagger
  tl.from(heroElements, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2
  });
  
  // Add glitch effect to the heading
  const heading = document.querySelector('.hero-content h1');
  if (heading) {
    // Set the data-text attribute for the glitch effect
    heading.setAttribute('data-text', heading.textContent);
  }
  
  // Animate CTA buttons
  const buttons = document.querySelectorAll('.cta-buttons .btn');
  buttons.forEach(btn => {
    btn.classList.add('btn-3d');
  });
}

/**
 * Animate sections on scroll using GSAP ScrollTrigger
 */
function animateSections() {
  // About section animation
  const aboutSection = document.querySelector('.about');
  if (aboutSection) {
    gsap.from('.about-text h3', {
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: -50,
      opacity: 0,
      duration: 0.8
    });
    
    gsap.from('.about-text p', {
      scrollTrigger: {
        trigger: '.about-text p',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
    
    gsap.from('.skill', {
      scrollTrigger: {
        trigger: '.skills-container',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15
    });
  }
  
  // Projects section animation
  const projectsSection = document.querySelector('.projects');
  if (projectsSection) {
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.github-projects',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    });
  }
  
  // Contact section animation
  const contactSection = document.querySelector('.contact');
  if (contactSection) {
    gsap.from('.contact-info', {
      scrollTrigger: {
        trigger: '.contact-container',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: -50,
      opacity: 0,
      duration: 0.8
    });
    
    gsap.from('.contact-form-container', {
      scrollTrigger: {
        trigger: '.contact-container',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: 50,
      opacity: 0,
      duration: 0.8
    });
    
    gsap.from('.form-group', {
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    });
  }
}

/**
 * Create animated background particles
 */
function createParticles() {
  const colors = [
    'rgba(3, 125, 214, 0.7)',
    'rgba(0, 195, 248, 0.7)',
    'rgba(255, 92, 53, 0.7)',
    'rgba(255, 185, 49, 0.7)'
  ];
  
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    heroSection.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const size = Math.random() * 5 + 2;
      
      // Random animation duration
      const duration = Math.random() * 120 + 30;
      
      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Set particle style
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.animationDuration = `${duration}s`;
      
      // Add particle to container
      particlesContainer.appendChild(particle);
    }
  }
  
  // Add blob shapes to sections
  const aboutSection = document.querySelector('.about');
  if (aboutSection) {
    addBlobToSection(aboutSection, 'blob');
    addBlobToSection(aboutSection, 'blob-2');
  }
  
  const contactSection = document.querySelector('.contact');
  if (contactSection) {
    addBlobToSection(contactSection, 'blob-3');
  }
}

/**
 * Add a blob SVG to a section
 */
function addBlobToSection(section, className) {
  // Create SVG element
  const blobSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  blobSvg.classList.add(className);
  blobSvg.setAttribute('viewBox', '0 0 200 200');
  blobSvg.setAttribute('width', '600');
  blobSvg.setAttribute('height', '600');
  
  // Create path element
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  
  // Set different path for each blob type
  if (className === 'blob') {
    path.setAttribute('d', 'M44.2,-64.8C56.6,-55.3,65.8,-42,71.3,-27.4C76.7,-12.7,78.3,3.3,74.4,17.2C70.5,31.1,61.1,42.9,49.1,50.8C37.1,58.7,22.6,62.6,7.4,67.4C-7.7,72.1,-23.6,77.8,-35.9,73.1C-48.3,68.4,-57.1,53.4,-65.3,38.1C-73.4,22.9,-80.9,7.4,-79.9,-7.5C-78.8,-22.4,-69.2,-36.7,-57.1,-46.3C-45,-55.9,-30.4,-60.8,-16.3,-65.2C-2.2,-69.7,11.3,-73.6,25.6,-72.3C39.9,-71,55,-74.4,44.2,-64.8Z');
  } else if (className === 'blob-2') {
    path.setAttribute('d', 'M44.9,-73.5C57.4,-67.4,66.2,-53.7,72.8,-39.2C79.4,-24.7,83.8,-9.3,82.5,5.8C81.2,21,74.1,35.9,64.5,48.1C54.9,60.3,42.7,69.8,28.8,74.8C14.9,79.8,-0.7,80.3,-14.8,76.1C-28.9,71.9,-41.5,63,-56.1,51.7C-70.7,40.3,-87.2,26.5,-92.9,9.5C-98.6,-7.6,-93.4,-27.8,-82.2,-42.8C-71,-57.8,-53.7,-67.7,-37.2,-72.1C-20.6,-76.6,-4.9,-75.6,10.8,-74.9C26.6,-74.1,32.3,-79.6,44.9,-73.5Z');
  } else {
    path.setAttribute('d', 'M46.3,-74.9C60.2,-69.3,72.1,-56.9,79.7,-42.2C87.3,-27.5,90.7,-10.5,88.6,6C86.4,22.5,78.8,38.6,67.9,51.3C57,64,42.9,73.3,27.3,78.7C11.8,84.1,-5.1,85.6,-21.7,83.3C-38.3,81,-54.6,74.9,-65.1,63.2C-75.6,51.6,-80.4,34.5,-83.1,17.5C-85.9,0.5,-86.7,-16.5,-81.6,-32C-76.5,-47.5,-65.5,-61.4,-51.3,-67.2C-37.2,-73,-18.6,-70.5,-1.6,-68C15.4,-65.5,32.4,-80.5,46.3,-74.9Z');
  }
  
  // Append path to SVG
  blobSvg.appendChild(path);
  
  // Append SVG to section
  section.style.position = 'relative';
  section.style.overflow = 'hidden';
  section.appendChild(blobSvg);
}