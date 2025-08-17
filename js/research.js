/**
 * Research module for handling research rendering
 */

// Research data
const researchTopics = [
  {
    title: 'স্বরবয্ঞ্জন – Swarabyanjan: A Novel NLP Framework for Bias Detection in Bengali News Headlines and Articles',
    description: 'A comprehensive framework for detecting and analyzing bias in Bengali news content, utilizing advanced NLP techniques and machine learning models tailored for the Bengali language.',
    tags: ['NLP', 'Bias Detection', 'Bengali Language', 'Media Analysis', 'In Progress']
  },
  {
    title: 'AI Applications in Breast Cancer Detection',
    description: 'Research exploring the application of artificial intelligence and machine learning techniques for early detection and diagnosis of breast cancer through medical imaging analysis.',
    tags: ['AI in Healthcare', 'Medical Imaging', 'Cancer Detection', 'Machine Learning', 'In Progress']
  },
  {
    title: 'Associative Rule Time Complexity Reducer for Data Mining Optimization',
    description: 'Development of an optimized algorithm to reduce time complexity in associative rule mining, enhancing efficiency in large-scale data analysis applications.',
    tags: ['Data Mining', 'Algorithm Optimization', 'Associative Rules', 'Computational Efficiency', 'In Progress']
  },
  {
    title: 'VANET Security and Scalability Models',
    description: 'Research on Vehicular Ad-Hoc Networks (VANETs) focusing on simulation, scalability challenges, and security frameworks for next-generation vehicular communication systems.',
    tags: ['VANET', 'Network Security', 'Scalability', 'Simulation Modeling', 'In Progress']
  }
];

/**
 * Initialize research functionality
 */
const initResearch = () => {
  const researchContainer = $('#research .cards');
  
  if (!researchContainer) return;
  
  // Render research topics
  renderResearch(researchContainer);
};

/**
 * Render research topics
 * @param {Element} container - Container for research topics
 */
const renderResearch = (container) => {
  if (!container) return;
  
  // Clear container
  container.innerHTML = '';
  
  // Create research cards
  researchTopics.forEach((topic, index) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.setProperty('--animation-delay', `${index * 100}ms`);
    
    const tagsHTML = topic.tags.map(tag => `<li>${escapeHTML(tag)}</li>`).join('');
    
    card.innerHTML = `
      <h3>${escapeHTML(topic.title)}</h3>
      <p>${escapeHTML(topic.description)}</p>
      <ul class="tag-list">
        ${tagsHTML}
      </ul>
    `;
    
    container.appendChild(card);
    
    // Trigger animation after a small delay
    setTimeout(() => {
      card.classList.add('is-visible');
    }, 50);
  });
};

// Make research functions available globally
window.initResearch = initResearch;
window.renderResearch = renderResearch;