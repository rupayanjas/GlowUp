document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
      });
  });

  // Testimonial Slider
  const testimonialTrack = document.getElementById('testimonialTrack');
  const sliderNavButtons = document.querySelectorAll('.slider-nav button');
  let currentSlide = 0;
  const totalSlides = testimonialTrack.children.length;

  function updateSlider() {
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      sliderNavButtons.forEach((btn, index) => {
          btn.classList.toggle('active', index === currentSlide);
      });
  }

  sliderNavButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          currentSlide = index;
          updateSlider();
      });
  });

  // Auto-slide every 5 seconds
  let autoSlide = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
  }, 5000);

  // Pause auto-slide on hover
  document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => {
      clearInterval(autoSlide);
  });

  document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
          currentSlide = (currentSlide + 1) % totalSlides;
          updateSlider();
      }, 5000);
  });

  // Modal Functionality
  const loginBtn = document.getElementById('loginBtn');
  const getStartedBtn = document.getElementById('getStartedBtn');
  const premiumBtn = document.getElementById('premiumBtn');
  const modal = document.createElement('div');
  
  modal.className = 'modal';
  modal.innerHTML = `
      <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h2 class="modal-title">Login to GlowUp</h2>
          <form id="loginForm">
              <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" class="form-control" required>
              </div>
              <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" class="form-control" required>
              </div>
              <button type="submit" class="btn-modal">Login</button>
          </form>
      </div>
  `;
  
  document.body.appendChild(modal);
  const closeModal = modal.querySelector('.close-modal');
  
  function openModal() {
      modal.style.display = 'flex';
  }
  
  function closeModalFunc() {
      modal.style.display = 'none';
  }

  loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
  });

  getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
  });

  premiumBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
  });

  closeModal.addEventListener('click', closeModalFunc);
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          closeModalFunc();
      }
  });

  // Form submission
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Simple form validation and submission simulation
      if (email && password) {
          console.log('Login attempted with:', { email, password });
          alert('Login successful! (This is a demo)');
          closeModalFunc();
          loginForm.reset();
      }
  });

  // Smooth Scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });

  // Feature Card Animation on Scroll
  const featureCards = document.querySelectorAll('.feature-card');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, {
      threshold: 0.2
  });

  featureCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
      card.style.transition = 'all 0.5s ease';
      observer.observe(card);
  });
});