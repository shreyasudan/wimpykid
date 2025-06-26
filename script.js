document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const createMobileNav = () => {
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
  };
  
  // Add active class to current page nav link
  const setActiveNavLink = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.site-nav a');
    
    navLinks.forEach(function(link) {
      const linkPath = link.getAttribute('href');
      
      if (currentPath.endsWith(linkPath) || 
          (linkPath === 'index.html' && (currentPath === '/' || currentPath.endsWith('/')))) {
        link.classList.add('active');
      }
    });
  };
  
  // Smooth scroll for anchor links
  const setupSmoothScroll = () => {
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
  };
  
  // Initialize functions
  createMobileNav();
  setActiveNavLink();
  setupSmoothScroll();
  
  // Add additional CSS for mobile navigation
  const addMobileNavStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .nav-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 20px;
        position: relative;
        z-index: 10;
      }
      
      .nav-toggle span {
        display: block;
        width: 100%;
        height: 2px;
        background-color: var(--text-color);
        position: absolute;
        left: 0;
        transition: all 0.3s ease;
      }
      
      .nav-toggle span:nth-child(1) {
        top: 0;
      }
      
      .nav-toggle span:nth-child(2) {
        top: 9px;
      }
      
      .nav-toggle span:nth-child(3) {
        top: 18px;
      }
      
      .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg);
        top: 9px;
      }
      
      .nav-toggle.active span:nth-child(2) {
        opacity: 0;
      }
      
      .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg);
        top: 9px;
      }
      
      @media (max-width: 768px) {
        .nav-toggle {
          display: block;
        }
        
        .site-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: var(--background-color);
          padding: 80px 2rem 2rem;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 5;
        }
        
        .site-nav.active {
          transform: translateX(0);
        }
        
        .site-nav ul {
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .site-nav li {
          margin: 0;
        }
      }
    `;
    document.head.appendChild(style);
  };
  
  addMobileNavStyles();
}); 