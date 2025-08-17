/**
 * Certificates module for handling certificate rendering and filtering
 */

// Certificate data
const certificates = [
  {
    title: 'Cisco CCNA: Introduction to Networks (ITN)',
    issuer: 'Cisco',
    date: '2022-09',
    file: 'ccna-itn-swagotam-malakar.pdf',
    category: 'networking'
  },
  {
    title: 'Cybersecurity Essentials',
    issuer: 'Cisco',
    date: '2022-08',
    file: 'cybersecurity-essentials.pdf',
    category: 'security'
  },
  {
    title: 'Cybersecurity for Engineers',
    issuer: 'Cisco',
    date: '2022-07',
    file: 'cybersecurity-for-engineers.pdf',
    category: 'security'
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    date: '2022-06',
    file: 'introduction-to-cybersecurity.pdf',
    category: 'security'
  },
  {
    title: 'Linux NDG Essentials',
    issuer: 'NDG',
    date: '2022-05',
    file: 'ndg-linux-essentials.pdf',
    category: 'os'
  },
  {
    title: 'Programming Essentials in C (CLA)',
    issuer: 'CLA',
    date: '2022-04',
    file: 'cla-programming-essentials-in-c.pdf',
    category: 'programming'
  },
  {
    title: 'Programming Essentials in C (CLE)',
    issuer: 'CLE',
    date: '2022-03',
    file: 'cle-entry-level-c.pdf',
    category: 'programming'
  },
  {
    title: 'C Essentials - Part 1',
    issuer: 'C Programming',
    date: '2022-02',
    file: 'c-essentials-1.pdf',
    category: 'programming'
  },
  {
    title: 'C Essentials - Part 2',
    issuer: 'C Programming',
    date: '2022-01',
    file: 'c-essentials-2.pdf',
    category: 'programming'
  },
  {
    title: 'Python Basic',
    issuer: 'HackerRank',
    date: '2021-12',
    file: 'hackerrank-python-basic.pdf',
    category: 'programming'
  },
  {
    title: 'Python: From Basics to Advanced',
    issuer: 'Udemy',
    date: '2021-11',
    file: 'udemy-python-basics-to-advanced.pdf',
    category: 'programming'
  },
  {
    title: 'Python Bootcamp 2022',
    issuer: 'Udemy',
    date: '2021-10',
    file: 'udemy-python-bootcamp-2022.pdf',
    category: 'programming'
  },
  {
    title: 'Python for Complete Beginners',
    issuer: 'Udemy',
    date: '2021-09',
    file: 'udemy-python-complete-beginners.pdf',
    category: 'programming'
  },
  {
    title: 'Java: Beginner to Advanced',
    issuer: 'Udemy',
    date: '2021-08',
    file: 'udemy-java-beginner-to-advanced.pdf',
    category: 'programming'
  },
  {
    title: 'LeetCode Top Interview Questions (Java)',
    issuer: 'Udemy',
    date: '2021-07',
    file: 'udemy-leetcode-top-interview-java.pdf',
    category: 'programming'
  },
  {
    title: 'Red Hat System Administration I (RH124)',
    issuer: 'Red Hat',
    date: '2021-06',
    file: 'red-hat-rh124.pdf',
    category: 'os'
  },
  {
    title: 'Red Hat System Administration II (RH134)',
    issuer: 'Red Hat',
    date: '2021-05',
    file: 'red-hat-rh134.pdf',
    category: 'os'
  },
  {
    title: 'Red Hat System Administration (RH104)',
    issuer: 'Red Hat',
    date: '2021-04',
    file: 'rh104-attendance.pdf',
    category: 'os'
  },
  {
    title: 'DevOps for Engineers',
    issuer: 'DevOps Institute',
    date: '2021-03',
    file: 'devops-for-engineers.pdf',
    category: 'devops'
  }
];

/**
 * Initialize certificate functionality
 */
const initCertificates = () => {
  const certificatesContainer = $('#certificates-container');
  const filterContainer = $('#filter-container');
  
  if (!certificatesContainer) return;
  
  // Create filter buttons
  createFilterButtons(filterContainer);
  
  // Render all certificates initially
  renderCertificates(certificatesContainer);
};

/**
 * Create filter buttons based on certificate categories
 * @param {Element} container - Container for filter buttons
 */
const createFilterButtons = (container) => {
  if (!container) return;
  
  // Get unique categories
  const categories = ['all', ...new Set(certificates.map(cert => cert.category))];
  
  // Create category labels map
  const categoryLabels = {
    'all': 'All Certificates',
    'programming': 'Programming Languages',
    'networking': 'Networking',
    'security': 'Cybersecurity',
    'os': 'Operating Systems',
    'devops': 'DevOps'
  };
  
  // Create buttons
  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = 'filter-btn' + (category === 'all' ? ' active' : '');
    button.dataset.category = category;
    button.textContent = categoryLabels[category] || category;
    
    button.addEventListener('click', () => {
      // Update active button
      container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn === button);
      });
      
      // Filter certificates
      renderCertificates($('#certificates-container'), category);
    });
    
    container.appendChild(button);
  });
};

/**
 * Render certificates based on filter
 * @param {Element} container - Container for certificates
 * @param {string} filter - Category filter (default: 'all')
 */
const renderCertificates = (container, filter = 'all') => {
  if (!container) return;
  
  // Clear container
  container.innerHTML = '';
  
  // Filter and sort certificates by date (newest first)
  const filteredCertificates = certificates
    .filter(cert => filter === 'all' || cert.category === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Create certificate cards
  filteredCertificates.forEach((cert, index) => {
    const card = document.createElement('div');
    card.className = 'card certificate-card';
    card.style.setProperty('--animation-delay', `${index * 100}ms`);
    
    // Format date
    const dateObj = new Date(cert.date + '-01'); // Add day for valid date
    const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    card.innerHTML = `
      <div class="card-header">
        <h3>${escapeHTML(cert.title)}</h3>
        <span class="card-badge">${escapeHTML(cert.category)}</span>
      </div>
      <p class="cert-date">${escapeHTML(formattedDate)} • ${escapeHTML(cert.issuer)}</p>
      <a href="assets/certificates/${escapeHTML(cert.file)}" class="button button--outline" target="_blank">View Certificate</a>
    `;
    
    container.appendChild(card);
    
    // Trigger animation after a small delay
    setTimeout(() => {
      card.classList.add('is-visible');
    }, 50);
  });
  
  // Show message if no certificates match the filter
  if (filteredCertificates.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No certificates found for this category.';
    message.style.textAlign = 'center';
    container.appendChild(message);
  }
};

// Make certificate functions available globally
window.initCertificates = initCertificates;
window.createFilterButtons = createFilterButtons;
window.renderCertificates = renderCertificates;