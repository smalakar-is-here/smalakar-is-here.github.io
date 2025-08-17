/**
 * Projects module for handling project rendering and filtering
 */

// Project data
const projects = [
  {
    title: 'স্বরব্যঞ্জন (Swarabyanjan) — NLP Framework for Bias Detection',
    description: 'A novel computational linguistics framework investigating media bias in Bengali news content through advanced natural language processing techniques. This research addresses the critical gap in automated bias detection for low-resource languages, employing custom-developed lexical analysis algorithms and supervised machine learning models trained on manually annotated corpora.',
    file: 'swarabyanjan/Swarabyanjan-Framework.pdf',
    category: 'nlp',
    tags: ['NLP', 'Computational Linguistics', 'Media Analysis', 'Bengali Language'],
    methodology: 'The methodology employs a hybrid approach combining rule-based linguistic pattern recognition with supervised machine learning classification. The research includes corpus development, annotation schema design, feature engineering, and model evaluation against human expert assessments.',
    objectives: 'To develop a comprehensive framework for detecting subtle linguistic markers of bias in Bengali news media; to create an annotated corpus of Bengali news content; to evaluate the effectiveness of various NLP techniques for bias detection in morphologically rich languages.',
    outcomes: 'Preliminary results demonstrate 78% accuracy in identifying biased content, with particularly strong performance in detecting framing bias and word choice manipulation. The annotated corpus represents the first substantial dataset for bias analysis in Bengali media.',
    implications: 'This work contributes to the growing field of computational media analysis for non-English languages and provides methodological insights for developing NLP tools for low-resource languages. The framework has potential applications in media literacy education and automated content analysis.'
  },
  {
    title: 'LifeLink: A Comprehensive All-in-One Service Platform for Bangladesh',
    description: 'LifeLink is a full-stack digital platform developed to unify essential services for the Bangladeshi population. Over a four-month timeline (Feb–June 2025), we built and deployed this solution to address the fragmented service landscape by integrating healthcare, shopping, education, employment, housing, and vehicle services into a single responsive platform.',
    file: 'lifelink/LifeLink-Research-Overview.pdf',
    category: 'healthcare',
    tags: ['Full-stack Development', 'MVC Architecture', 'PHP', 'MySQL', 'Tailwind CSS'],
    methodology: 'The system uses a custom-built MVC-like architecture, incorporates robust user authentication, unified cart and payment systems, a chatbot assistant, and role-based access controls. It was developed using PHP, MySQL, JavaScript (ES6), and Tailwind CSS, with agile sprint planning tracked via JIRA.',
    objectives: 'To create a unified platform for essential services in Bangladesh, addressing the fragmented service landscape and providing a seamless user experience across multiple service domains.',
    outcomes: '8 fully functional service modules, 39 database tables, 156 API endpoints, 45K+ lines of code. Average load time: 2.3s; concurrent user support: 10,000+. Deployed responsive UI and multilingual-ready structure. Received strong feedback from users and stakeholders during the final demo.',
    implications: 'Skills & Technologies Used: Frontend: HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, Responsive Design. Backend: PHP 7.4+, MySQL 5.7+, Apache/Nginx, PDO, MVC architecture. Dev Tools: JIRA, Git. Security: CSRF protection, session handling, hashed authentication. Others: bKash/Nagad/Rocket Payment Gateway Integration, Chatbot (Basic AI), Order Management System, Cross-module Cart System. Soft Skills: Agile development, team coordination, project planning, client presentation.'
  },
  {
    title: 'Blockchain for Pharmaceutical Supply Chain Integrity — Counterfeit Drug Prevention in Bangladesh',
    description: 'Implemented blockchain technology to enhance the efficiency, transparency, and security of the pharmaceutical supply chain in Bangladesh, addressing counterfeit drug challenges.',
    file: 'blockchain/Pharma-Blockchain-Research.pdf',
    category: 'blockchain',
    tags: ['Blockchain', 'Supply Chain', 'Pharmaceutical Industry', 'Counterfeit Prevention'],
    methodology: 'Researched and analyzed the pharmaceutical industry\'s vulnerabilities to counterfeit medications. Explored the implementation of blockchain to provide end-to-end traceability, ensuring the authenticity of medications from manufacturing to distribution.',
    objectives: 'To implement blockchain technology for enhancing pharmaceutical supply chain integrity, providing end-to-end traceability, and ensuring medication authenticity from manufacturing to distribution in Bangladesh.',
    outcomes: 'Assessed blockchain\'s potential to automate regulatory compliance, reduce costs, and mitigate risks associated with organized crime. Developed strategies for overcoming implementation challenges, such as regulatory gaps, high initial costs, and the need for industry collaboration.',
    implications: 'Improved patient safety, strengthened regulatory adherence, and created a framework for future integration of blockchain in pharmaceutical supply chains globally.'
  }
];

/**
 * Initialize projects functionality
 */
const initProjects = () => {
  const projectsContainer = document.getElementById('projects-grid');
  
  if (!projectsContainer) return;
  
  // Render all projects
  renderProjects(projectsContainer);
};

/**
 * Render projects
 * @param {Element} container - Container for projects
 */
const renderProjects = (container) => {
  if (!container) return;
  
  // Clear container
  container.innerHTML = '';
  
  // Create project cards
  projects.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'card academic-project-card';
    card.style.setProperty('--animation-delay', `${index * 100}ms`);
    
    const tagsHTML = project.tags.map(tag => `<li>${escapeHTML(tag)}</li>`).join('');
    
    card.innerHTML = `
      <div class="card-header">
        <h3>${escapeHTML(project.title)}</h3>
        <span class="card-badge">${escapeHTML(project.category)}</span>
      </div>
      <div class="project-overview">
        <p>${escapeHTML(project.description)}</p>
      </div>
      <div class="project-details">
        <div class="project-section">
          <h4><i class="fas fa-flask"></i> Methodology</h4>
          <p>${escapeHTML(project.methodology)}</p>
        </div>
        <div class="project-section">
          <h4><i class="fas fa-bullseye"></i> Research Objectives</h4>
          <p>${escapeHTML(project.objectives)}</p>
        </div>
        <div class="project-section">
          <h4><i class="fas fa-chart-line"></i> Outcomes</h4>
          <p>${escapeHTML(project.outcomes)}</p>
        </div>
        <div class="project-section">
          <h4><i class="fas fa-lightbulb"></i> Implications</h4>
          <p>${escapeHTML(project.implications)}</p>
        </div>
      </div>
      <div class="project-footer">
        <p><a class="button button--sm" href="assets/projects/${escapeHTML(project.file)}" target="_blank" rel="noopener">View Full Research</a></p>
        <ul class="tag-list">
          ${tagsHTML}
        </ul>
      </div>
    `;
    
    container.appendChild(card);
    
    // Trigger animation after a small delay
    setTimeout(() => {
      card.classList.add('is-visible');
    }, 50);
  });
};

// Make project functions available globally
window.initProjects = initProjects;
window.renderProjects = renderProjects;