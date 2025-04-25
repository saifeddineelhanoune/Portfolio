// Import styles
import '../css/style.css';
import '../css/animations.css';

// Import Three.js modules
import { initThreeScene } from './three/scene';
import { initAnimations } from './animation';

// Import GitHub API module
import { fetchGitHubProjects } from './github/api';

// DOM elements
const themeToggle = document.querySelector('.theme-toggle');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav ul li a');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// Initialize Three.js scene
document.addEventListener('DOMContentLoaded', () => {
  // Init Three.js scene
  initThreeScene();
  
  // Init animations
  initAnimations();
  
  // Fetch GitHub projects
  fetchGitHubProjects();
  
  // Setup event listeners
  setupEventListeners();
  
  // Setup scroll animations
  setupScrollAnimations();
});

// Event listeners
function setupEventListeners() {
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Mobile navigation toggle
  mobileNavToggle.addEventListener('click', toggleMobileNav);
  
  // Navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Close mobile nav if open
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  });
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Header scroll effect
  window.addEventListener('scroll', handleScroll);
}

// Toggle theme between light and dark mode
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  
  // Update theme toggle icon
  const themeIcon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
}

// Toggle mobile navigation
function toggleMobileNav() {
  nav.classList.toggle('active');
  
  // Update toggle icon
  const navIcon = mobileNavToggle.querySelector('i');
  if (nav.classList.contains('active')) {
    navIcon.classList.remove('fa-bars');
    navIcon.classList.add('fa-times');
  } else {
    navIcon.classList.remove('fa-times');
    navIcon.classList.add('fa-bars');
  }
}

// Handle contact form submission
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const formObj = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };
  
  try {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    const response = await fetch('/api/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObj)
    });
    
    const data = await response.json();
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    formMessage.textContent = data.message || 'Your message has been sent successfully!';
    formMessage.classList.add('success');
    formMessage.classList.remove('error');
    formMessage.style.display = 'block';
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
    
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Show error message
    formMessage.textContent = 'There was an error sending your message. Please try again.';
    formMessage.classList.add('error');
    formMessage.classList.remove('success');
    formMessage.style.display = 'block';
    
    // Reset button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
}

// Handle scroll effects
function handleScroll() {
  const scrollPosition = window.scrollY;
  const header = document.querySelector('.header');
  
  // Header scroll effect
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Check for scroll animations
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
  animatedElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight * 0.85) {
      el.classList.add('visible');
    }
  });
}

// Setup scroll animations
function setupScrollAnimations() {
  // Add animation classes to elements
  const sections = document.querySelectorAll('section:not(.hero)');
  sections.forEach(section => {
    const header = section.querySelector('.section-header');
    if (header) {
      header.classList.add('fade-in');
    }
    
    // Add other animation classes to different elements
    const contentBlocks = section.querySelectorAll('.about-content, .contact-container, .github-projects');
    contentBlocks.forEach(block => {
      block.classList.add('fade-in');
    });
  });
  
  // About section skills
  const skills = document.querySelectorAll('.skill');
  skills.forEach((skill, index) => {
    if (index % 2 === 0) {
      skill.classList.add('slide-in-left');
    } else {
      skill.classList.add('slide-in-right');
    }
  });
  
  // Initial check for visible elements
  handleScroll();
}

// Check for saved theme preference
function checkThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = themeToggle.querySelector('i');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

// Initialize theme preference
checkThemePreference();