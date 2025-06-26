document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.createElement('button');
  navToggle.classList.add('nav-toggle');
  navToggle.innerHTML = '<span></span><span></span><span></span>';
  
  const siteNav = document.querySelector('.site-nav');
  const siteHeader = document.querySelector('.site-header .container');
  
  if (siteHeader && siteNav) {
    siteHeader.insertBefore(navToggle, siteNav);
    
    navToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      siteNav.classList.toggle('active');
    });
  }
  
  // Image lightbox
  const lightboxImages = document.querySelectorAll('.lightbox-image');
  
  if (lightboxImages.length > 0) {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    
    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');
    
    const lightboxImg = document.createElement('img');
    const lightboxClose = document.createElement('button');
    lightboxClose.classList.add('lightbox-close');
    lightboxClose.innerHTML = '&times;';
    
    lightboxContent.appendChild(lightboxImg);
    lightboxContent.appendChild(lightboxClose);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // Open lightbox on image click
    lightboxImages.forEach(function(img) {
      img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close lightbox on close button click
    lightboxClose.addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Close lightbox on outside click
    lightbox.addEventListener('click', function(e) {
      if (e.target === this) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to current page nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.site-nav a');
  
  navLinks.forEach(function(link) {
    const linkPath = link.getAttribute('href');
    
    if (currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });
  
  // Live search functionality (if present)
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      
      if (query.length < 2) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        return;
      }
      
      // This would typically be an AJAX request to a search endpoint
      // For demo purposes, we'll just simulate a search
      setTimeout(function() {
        searchResults.innerHTML = '<p>Search results for "' + query + '" would appear here.</p>';
        searchResults.style.display = 'block';
      }, 300);
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }
}); 