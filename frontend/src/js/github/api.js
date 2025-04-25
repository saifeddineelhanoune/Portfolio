import axios from 'axios';

/**
 * Fetch GitHub projects and display them in the projects section
 */
export async function fetchGitHubProjects() {
  const githubUsername = 'saifeddineelhanoune';
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
      },
      timeout: 10000
    });
    
    // Check if we have repositories
    if (response.data && response.data.length > 0) {
      // Clear loading spinner
      projectsContainer.innerHTML = '';
      
      // Process and display each repository
      response.data.forEach(repo => {
        // Create project card without fetching languages (to avoid multiple API calls)
        const projectCard = createProjectCard(repo, []);
        projectsContainer.appendChild(projectCard);
      });
    } else {
      // No repositories found
      const errorMsg = 'No GitHub repositories were found for this user.';
      
      // Dispatch error event for the main.js to handle
      window.dispatchEvent(new CustomEvent('github-api-error', {
        detail: { message: errorMsg }
      }));
    }
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    
    // Get a user-friendly error message
    let errorMsg = 'There was an error loading projects from GitHub.';
    
    if (error.response) {
      // The request was made and the server responded with a status code outside of 2xx
      if (error.response.status === 403) {
        errorMsg = 'GitHub API rate limit exceeded. Please try again later.';
      } else if (error.response.status === 404) {
        errorMsg = 'GitHub user not found.';
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMsg = 'Network error. Please check your connection.';
    }
    
    // Dispatch error event for the main.js to handle
    window.dispatchEvent(new CustomEvent('github-api-error', {
      detail: { message: errorMsg }
    }));
  }
}

/**
 * Create a project card element for a GitHub repository
 * @param {Object} repo - GitHub repository data
 * @param {Array} languages - Programming languages used in the repository
 * @returns {HTMLElement} Project card element
 */
export function createProjectCard(repo, languages) {
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
  
  if (languages && languages.length > 0) {
    languages.forEach(language => {
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

/**
 * Function to handle GitHub API errors and display them in the UI
 * @param {string} errorMsg - The error message to display
 */
export function displayGitHubError(errorMsg) {
  const projectsContainer = document.querySelector('.github-projects');
  
  if (!projectsContainer) return;
  
  // Create an error message element
  const errorElement = document.createElement('div');
  errorElement.classList.add('error-message');
  errorElement.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    <p>${errorMsg}</p>
    <button class="btn btn-outline retry-button">
      <i class="fas fa-sync"></i> Retry
    </button>
  `;
  
  // Clear the container and add the error message
  projectsContainer.innerHTML = '';
  projectsContainer.appendChild(errorElement);
  
  // Add event listener to the retry button
  const retryButton = errorElement.querySelector('.retry-button');
  if (retryButton) {
    retryButton.addEventListener('click', () => {
      fetchGitHubProjects();
    });
  }
}