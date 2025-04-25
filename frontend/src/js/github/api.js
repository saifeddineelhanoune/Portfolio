import axios from 'axios';

/**
 * Fetch GitHub projects and display them in the projects section
 */
export async function fetchGitHubProjects() {
  const githubUsername = 'sel-hano'; // Replace with your actual GitHub username
  const projectsContainer = document.querySelector('.github-projects');
  
  if (!projectsContainer) return;
  
  try {
    // Show loading state
    projectsContainer.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
    `;
    
    // Fetch repositories from GitHub API
    const response = await axios.get(`https://api.github.com/users/${githubUsername}/repos`, {
      params: {
        sort: 'updated',
        per_page: 6 // Limit to 6 most recently updated repos
      }
    });
    
    // Check if we have repositories
    if (response.data && response.data.length > 0) {
      // Clear loading spinner
      projectsContainer.innerHTML = '';
      
      // Process and display each repository
      response.data.forEach(async (repo) => {
        // Fetch languages for the repository
        const languagesResponse = await axios.get(repo.languages_url);
        const languages = Object.keys(languagesResponse.data).slice(0, 3); // Get top 3 languages
        
        // Create project card
        const projectCard = createProjectCard(repo, languages);
        projectsContainer.appendChild(projectCard);
      });
    } else {
      // No repositories found
      projectsContainer.innerHTML = `
        <div class="no-projects">
          <h3>No projects found</h3>
          <p>No GitHub repositories were found for this user.</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    
    // Show error message
    projectsContainer.innerHTML = `
      <div class="error-message">
        <h3>Error loading projects</h3>
        <p>There was an error loading projects from GitHub. Please try again later.</p>
      </div>
    `;
  }
}

/**
 * Create a project card element for a GitHub repository
 * @param {Object} repo - GitHub repository data
 * @param {Array} languages - Programming languages used in the repository
 * @returns {HTMLElement} Project card element
 */
function createProjectCard(repo, languages) {
  // Create card container
  const card = document.createElement('div');
  card.classList.add('project-card');
  
  // Create card inner element for 3D effect
  const cardInner = document.createElement('div');
  cardInner.classList.add('project-card-inner');
  card.appendChild(cardInner);
  
  // Create card content
  const cardContent = document.createElement('div');
  cardContent.classList.add('project-card-content');
  
  // Project title
  const title = document.createElement('h3');
  title.textContent = repo.name;
  cardContent.appendChild(title);
  
  // Project description
  const description = document.createElement('p');
  description.textContent = repo.description || 'No description available';
  cardContent.appendChild(description);
  
  // Project footer with languages and links
  const cardFooter = document.createElement('div');
  cardFooter.classList.add('project-card-footer');
  
  // Project languages
  const languagesContainer = document.createElement('div');
  languagesContainer.classList.add('project-languages');
  
  languages.forEach(language => {
    const languageTag = document.createElement('span');
    languageTag.classList.add('project-language');
    languageTag.textContent = language;
    languagesContainer.appendChild(languageTag);
  });
  
  cardFooter.appendChild(languagesContainer);
  
  // Project links
  const linksContainer = document.createElement('div');
  linksContainer.classList.add('project-links');
  
  // GitHub link
  const githubLink = document.createElement('a');
  githubLink.href = repo.html_url;
  githubLink.target = '_blank';
  githubLink.rel = 'noopener noreferrer';
  githubLink.classList.add('project-link');
  githubLink.setAttribute('aria-label', 'View on GitHub');
  githubLink.innerHTML = '<i class="fab fa-github"></i>';
  linksContainer.appendChild(githubLink);
  
  // Demo link if homepage is available
  if (repo.homepage) {
    const demoLink = document.createElement('a');
    demoLink.href = repo.homepage;
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
  
  return card;
}

/**
 * Create placeholder project cards for loading state
 */
export function createPlaceholderCards() {
  const projectsContainer = document.querySelector('.github-projects');
  
  if (!projectsContainer) return;
  
  // Clear existing content
  projectsContainer.innerHTML = '';
  
  // Create 6 placeholder cards
  for (let i = 0; i < 6; i++) {
    const card = document.createElement('div');
    card.classList.add('project-card', 'loading');
    
    card.innerHTML = `
      <div class="project-card-content">
        <div class="placeholder-title"></div>
        <div class="placeholder-description"></div>
        <div class="placeholder-languages"></div>
      </div>
    `;
    
    projectsContainer.appendChild(card);
  }
}