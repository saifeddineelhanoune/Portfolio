/**
 * Skills filter functionality
 */
export function initializeSkillsFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  
  if (!filterButtons.length || !skillCards.length) return;
  
  // Set up observer to animate skills when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all skill cards
  skillCards.forEach(card => {
    observer.observe(card);
  });
  
  // Add click event listener to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get selected filter
      const filter = button.getAttribute('data-filter');
      
      // Filter skill cards
      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || filter === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Initialize timeline animation
 */
export function initializeTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (!timelineItems.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all timeline items
  timelineItems.forEach(item => {
    observer.observe(item);
    // Add animation delay based on item index
    const index = Array.from(timelineItems).indexOf(item);
    item.style.animationDelay = `${index * 0.2}s`;
  });
}

/**
 * Handle loading sample projects
 */
export function loadSampleProjects() {
  const projectsContainer = document.querySelector('.github-projects');
  
  if (!projectsContainer) return;
  
  // Show loading state
  projectsContainer.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
    </div>
  `;
  
  // Simulate loading delay
  setTimeout(() => {
    // Sample projects data (replace with your actual projects)
    const sampleProjects = [
      {
        name: "Portfolio Website",
        description: "A modern portfolio website built with Three.js for 3D visualization and Django for backend functionality.",
        html_url: "#",
        homepage: "https://portfolio.selhano.com",
        languages: ["JavaScript", "Python", "CSS"]
      },
      {
        name: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with admin dashboard, payment processing, and inventory management.",
        html_url: "#",
        homepage: "https://shop.example.com",
        languages: ["JavaScript", "Node.js", "MongoDB"]
      },
      {
        name: "Weather App",
        description: "Real-time weather application using OpenWeatherMap API with location-based search and 7-day forecasts.",
        html_url: "#",
        languages: ["JavaScript", "React", "CSS"]
      },
      {
        name: "Task Manager",
        description: "A productivity application for managing tasks, projects, and deadlines with team collaboration features.",
        html_url: "#",
        homepage: "https://tasks.example.com",
        languages: ["TypeScript", "Angular", "Firebase"]
      },
      {
        name: "Machine Learning Model",
        description: "A machine learning project that predicts stock market trends using historical data and neural networks.",
        html_url: "#",
        languages: ["Python", "TensorFlow", "Pandas"]
      },
      {
        name: "Mobile Fitness App",
        description: "A cross-platform mobile application for tracking workouts, nutrition, and fitness goals.",
        html_url: "#",
        homepage: "https://fitness.example.com",
        languages: ["JavaScript", "React Native", "Firebase"]
      }
    ];
    
    // Clear container
    projectsContainer.innerHTML = '';
    
    // Create and append sample project cards
    sampleProjects.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      
      const cardInner = document.createElement('div');
      cardInner.classList.add('project-card-inner');
      
      const cardContent = document.createElement('div');
      cardContent.classList.add('project-card-content');
      
      // Project title
      const title = document.createElement('h3');
      title.textContent = project.name;
      cardContent.appendChild(title);
      
      // Project description
      const description = document.createElement('p');
      description.textContent = project.description;
      cardContent.appendChild(description);
      
      // Project footer
      const cardFooter = document.createElement('div');
      cardFooter.classList.add('project-card-footer');
      
      // Project languages
      const languagesContainer = document.createElement('div');
      languagesContainer.classList.add('project-languages');
      
      if (project.languages && project.languages.length > 0) {
        project.languages.forEach(language => {
          const languageTag = document.createElement('span');
          languageTag.classList.add('project-language');
          languageTag.textContent = language;
          languagesContainer.appendChild(languageTag);
        });
      }
      
      cardFooter.appendChild(languagesContainer);
      
      // Project links
      const linksContainer = document.createElement('div');
      linksContainer.classList.add('project-links');
      
      // GitHub link
      const githubLink = document.createElement('a');
      githubLink.href = project.html_url;
      githubLink.target = '_blank';
      githubLink.rel = 'noopener noreferrer';
      githubLink.classList.add('project-link');
      githubLink.setAttribute('aria-label', 'View on GitHub');
      githubLink.innerHTML = '<i class="fab fa-github"></i>';
      linksContainer.appendChild(githubLink);
      
      // Demo link if homepage is available
      if (project.homepage) {
        const demoLink = document.createElement('a');
        demoLink.href = project.homepage;
        demoLink.target = '_blank';
        demoLink.rel = 'noopener noreferrer';
        demoLink.classList.add('project-link');
        demoLink.setAttribute('aria-label', 'View Demo');
        demoLink.innerHTML = '<i class="fas fa-external-link-alt"></i>';
        linksContainer.appendChild(demoLink);
      }
      
      cardFooter.appendChild(linksContainer);
      cardContent.appendChild(cardFooter);
      
      // Add content to card
      cardInner.appendChild(cardContent);
      card.appendChild(cardInner);
      
      // Add animation classes
      card.classList.add('fade-in');
      
      // Append to container
      projectsContainer.appendChild(card);
    });
    
    // Add info message about sample projects
    const infoMessage = document.createElement('div');
    infoMessage.classList.add('info-message');
    infoMessage.innerHTML = `
      <i class="fas fa-info-circle"></i>
      <p>These are sample projects. You can try loading GitHub projects again later.</p>
      <button id="retry-github-again" class="btn btn-outline">
        <i class="fas fa-sync"></i> Try Again
      </button>
    `;
    projectsContainer.appendChild(infoMessage);
    
    // Add retry functionality
    const retryButton = document.getElementById('retry-github-again');
    if (retryButton) {
      retryButton.addEventListener('click', () => {
        import('./github/api.js').then(module => {
          module.fetchGitHubProjects();
        });
      });
    }
    
    // Trigger animation
    setTimeout(() => {
      const projects = document.querySelectorAll('.project-card');
      projects.forEach((project, index) => {
        setTimeout(() => {
          project.classList.add('visible');
        }, index * 100);
      });
    }, 100);
  }, 1000); // Simulate network delay
}

/**
 * Page Loader Animation
 * Provides a smooth loading transition when the site first loads
 */
export function initializePageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  
  const progressBar = loader.querySelector('.loader-progress-bar');
  const progressText = loader.querySelector('.loader-progress-text');
  const content = document.querySelector('.content-wrapper');
  
  let progress = 0;
  const totalAssets = document.images.length + document.querySelectorAll('video, audio, iframe').length + 5;
  let loadedAssets = 0;
  
  // Function to update loader progress
  const updateProgress = (value) => {
    progress = Math.min(value, 100);
    
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
    
    if (progressText) {
      progressText.textContent = `${Math.round(progress)}%`;
    }
  };
  
  // Function to hide loader and show content
  const hideLoader = () => {
    if (!loader) return;
    
    // Final progress update
    updateProgress(100);
    
    // Animate loader out
    gsap.to(loader, {
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        // Hide loader completely
        loader.style.display = 'none';
        
        // Reveal content
        if (content) {
          gsap.fromTo(content, 
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1, 
              ease: 'power2.out',
              clearProps: 'all'
            }
          );
        }
        
        // Dispatch custom event to signal loading complete
        document.dispatchEvent(new CustomEvent('page-loaded'));
      }
    });
  };
  
  // Track loading progress based on assets
  const trackAssetLoading = () => {
    // Track image loading
    Array.from(document.images).forEach(img => {
      if (img.complete) {
        incrementProgress();
      } else {
        img.addEventListener('load', incrementProgress);
        img.addEventListener('error', incrementProgress);
      }
    });
    
    // Track other media elements
    document.querySelectorAll('video, audio, iframe').forEach(media => {
      media.addEventListener('loadeddata', incrementProgress);
      media.addEventListener('error', incrementProgress);
    });
    
    // Ensure loader completes even if some assets fail
    setTimeout(() => {
      if (progress < 100) {
        hideLoader();
      }
    }, 5000);
  };
  
  // Increment progress for each loaded asset
  const incrementProgress = () => {
    loadedAssets++;
    const percentage = Math.min((loadedAssets / totalAssets) * 100, 100);
    updateProgress(percentage);
    
    // Once all assets are loaded, hide loader
    if (percentage >= 100) {
      hideLoader();
    }
  };
  
  // Initialize with starting progress
  updateProgress(5);
  
  // Add artificial delay for minimum load time
  setTimeout(() => {
    updateProgress(20);
    
    // Start tracking asset loading
    trackAssetLoading();
    
    // Simulate initial resources loading
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        updateProgress(20 + (i * 5));
      }, i * 200);
    }
  }, 500);
}