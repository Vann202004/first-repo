/* jshint esversion: 6 */

/* ----- PRELOADER ----- */
// Check for dark mode preference immediately before preloader appears
if (localStorage.getItem('dark-mode') === 'enabled') {
  document.body.classList.add('dark-mode');
  // Apply dark mode to preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('dark-mode');
  }
}

window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  
  // Fade out the preloader after the page has loaded
  setTimeout(function() {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    
    // Enable scrolling on the body after preloader is hidden
    document.body.style.overflow = '';
    
    // Remove preloader from DOM after transition
    setTimeout(function() {
      preloader.remove();
    }, 500);
  }, 2000); // Show preloader for 2 seconds
});

// Disable scrolling while preloader is visible
document.body.style.overflow = 'hidden';

/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
  var menuBtn = document.getElementById("myNavMenu");

  if(menuBtn.className === "nav-menu"){
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

// Close mobile menu when a nav link is clicked
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  
  // Add click event listener to each link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Get the nav menu element
      const navMenu = document.getElementById('myNavMenu');
      
      // Check if we're in mobile view (menu is responsive)
      if (navMenu.classList.contains('responsive')) {
        // Remove responsive class to close the menu
        navMenu.className = 'nav-menu';
      }
    });
  });
});

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING & MAKE IT STICKY ----- */
window.onscroll = function() {handleNavigation();};

function handleNavigation() {
  const navHeader = document.getElementById("header");
  const navSpacer = document.getElementById("nav-spacer");
  const scrollPosition = window.scrollY;

  // Make nav sticky after scrolling past a certain point
  if (scrollPosition > 100) {
    navHeader.classList.add("sticky");
    navSpacer.classList.add("spacer-active");
  } else {
    navHeader.classList.remove("sticky");
    navSpacer.classList.remove("spacer-active");
  }
  
  // Apply shadow based on scroll position
  if (scrollPosition > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else if (scrollPosition <= 50 && !navHeader.classList.contains("sticky")) {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
  
  // Call the scrollActive function to update active links
  scrollActive();
}

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
  strings: ["Bruno Mars Cosplayer", "DP Photo Editor", "Coder"],
  loop: true,
  typeSpeed: 100, 
  backSpeed: 80,
  backDelay: 2000
});

/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true     
});

/* -- HOME -- */
sr.reveal('.featured-text-card', {});
sr.reveal('.featured-name', {delay: 100});
sr.reveal('.featured-text-info', {delay: 200});
sr.reveal('.featured-text-btn', {delay: 200});
sr.reveal('.social_icons', {delay: 200});
sr.reveal('.featured-image', {delay: 300});

/* -- PROJECT BOX -- */
sr.reveal('.project-box', {interval: 200});

/* -- GALLERY -- */
sr.reveal('.gallery-item', {interval: 200});

/* -- HEADINGS -- */
sr.reveal('.top-header', {});

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
});

srLeft.reveal('.about-info', {delay: 100});
srLeft.reveal('.contact-info', {delay: 100});

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
});

srRight.reveal('.skills-box', {delay: 100});
srRight.reveal('.form-control', {delay: 100});

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute('id');
    
    // Use attribute selector with quotes to handle special characters
    const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
    
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
      if(navLink) navLink.classList.add('active-link');
    } else {
      if(navLink) navLink.classList.remove('active-link');
    }
  });
  
  // Special case for home when at the top
  if(scrollY < 50) {
    const homeLink = document.querySelector('.nav-menu a[href*="home"]');
    if(homeLink) homeLink.classList.add('active-link');
  }
}

/* ----- GALLERY LIGHTBOX FUNCTIONALITY ----- */
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  
  let currentIndex = 0;
  
  // Open lightbox when gallery item is clicked
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      currentIndex = index;
      const imgSrc = this.getAttribute('data-img');
      const title = this.querySelector('h3').textContent;
      const desc = this.querySelector('p').textContent;
      
      openLightbox(imgSrc, title, desc);
    });
  });
  
  // Close lightbox when close button is clicked
  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Navigate to previous image
  lightboxPrev.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
  });
  
  // Navigate to next image
  lightboxNext.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightbox();
  });
  
  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox.style.display || lightbox.style.display === 'none') return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightbox();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateLightbox();
    }
  });
  
  function openLightbox(imgSrc, title, desc) {
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  }
  
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  function updateLightbox() {
    const item = galleryItems[currentIndex];
    const imgSrc = item.getAttribute('data-img');
    const title = item.querySelector('h3').textContent;
    const desc = item.querySelector('p').textContent;
    
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
  }

  // Dark Mode Toggle
  const toggleSwitch = document.getElementById("toggle-switch");
  
  // Toggle dark mode when the switch is clicked
  toggleSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
  
  // Initialize background music functionality
  initBackgroundMusic();
  
  /* ----- SCROLL TO TOP BUTTON ----- */
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
    
  // Scroll to top with smooth animation when button is clicked
  scrollToTopBtn.addEventListener('click', function() {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Initialize the progress ring on DOM ready
  setupProgressRing();
});

// Setup Progress Ring with SVG viewBox approach
function setupProgressRing() {
  const circle = document.querySelector('.progress-ring__circle');
  if (!circle) return;
  
  // Get radius and calculate circumference (using viewBox coordinates)
  const radius = parseFloat(circle.getAttribute('r'));
  const circumference = 2 * Math.PI * radius;
  
  // Set initial stroke properties
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference; // Start with full offset (no progress)
}

// Background Music Functionality
function initBackgroundMusic() {
  const audio = document.getElementById('audio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const nowPlayingText = document.getElementById('now-playing-text');
  const currentTrackName = document.getElementById('current-track-name');
  const trackArtistElement = document.getElementById('track-artist');

  // Get all audio sources
  let musicSources = Array.from(document.querySelectorAll('#music-sources audio'));
  let current = 0;
  let isPlaying = false;

  // Shuffle the music array when page loads
  shuffleArray(musicSources);

  // Shuffle array function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Initialize
  function initPlayer() {
    audio.volume = 0.4;
    loadTrack(current);
    
    audio.addEventListener('ended', function() {
      nextTrack();
    });
    
    audio.addEventListener('timeupdate', updateProgress);
  }

  // Update progress ring - FIXED FOR RESPONSIVENESS
  function updateProgress() {
    const circle = document.querySelector('.progress-ring__circle');
    if (!circle || !audio.duration) return;
    
    // Get radius from SVG viewBox coordinate system (not physical pixels)
    const radius = parseFloat(circle.getAttribute('r'));
    const circumference = 2 * Math.PI * radius;
    
    // Calculate current progress percentage
    const percent = audio.currentTime / audio.duration;
    const offset = circumference - (percent * circumference);
    
    // Update the stroke dashoffset
    circle.style.strokeDashoffset = offset;
  }

  // Function to load and play a track
  function loadTrack(index) {
    const currentAudio = musicSources[index];
    const sourceElement = currentAudio.querySelector('source');
    
    // Get track metadata
    const title = currentAudio.getAttribute('data-title') || 'Unknown Title';
    const artist = currentAudio.getAttribute('data-artist') || 'Unknown Artist';
    
    // Set the source for the main audio element
    audio.src = sourceElement.src;
    audio.load();
    
    updateNowPlaying(title, artist);
    
    // Play if was previously playing
    if (isPlaying) {
      playTrack();
    }
  }

  // Play current track
  function playTrack() {
    audio.play()
      .then(() => {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isPlaying = true;
      })
      .catch(error => {
        console.error("Error playing audio:", error);
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        isPlaying = false;
      });
  }

  // Pause current track
  function pauseTrack() {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaying = false;
  }

  // Toggle play/pause
  function togglePlayPause() {
    if (audio.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  }

  // Go to previous track
  function prevTrack() {
    current = (current - 1 + musicSources.length) % musicSources.length;
    loadTrack(current);
  }

  // Go to next track
  function nextTrack() {
    current = (current + 1) % musicSources.length;
    loadTrack(current);
  }

  // Update now playing text with title and artist
  function updateNowPlaying(title, artist) {
    if (nowPlayingText) nowPlayingText.textContent = `${title} - ${artist}`;
    if (currentTrackName) currentTrackName.textContent = title;
    if (trackArtistElement) trackArtistElement.textContent = artist;
  }

  // Event listeners
  playPauseBtn.addEventListener('click', togglePlayPause);
  prevBtn.addEventListener('click', prevTrack);
  nextBtn.addEventListener('click', nextTrack);
  
  // Initialize the player
  initPlayer();

  // Handle window resize to update progress ring
  window.addEventListener('resize', function() {
    updateProgress();
  });
}

// Speech Bubble Animation
const speechBubble = document.querySelector('.speech-bubble');
if (speechBubble) {
    // Make the speech bubble disappear after 5 seconds with ease-in-out
    setTimeout(function() {
        speechBubble.classList.add('disappear');
        
        // Remove from DOM after animation completes
        setTimeout(function() {
            speechBubble.remove();
        }, 1000);
    }, 34000);
}

// Call scrollActive once on page load to set initial active state
document.addEventListener('DOMContentLoaded', function() {
  scrollActive();
});

/* ----- CONTACT FORM FUNCTIONALITY ----- */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form-control');
  const nameInput = form.querySelector('input[placeholder="Name"]');
  const emailInput = form.querySelector('input[placeholder="Email"]');
  const messageTextarea = form.querySelector('textarea');
  const submitButton = form.querySelector('.form-button .btn');

  // Add form submission event
  submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Validate form fields
    if (validateForm()) {
      // Show sending feedback
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = 'Sending <i class="fa-solid fa-spinner fa-spin"></i>';
      submitButton.disabled = true;
      
      // Simulate form submission (since we don't have a backend)
      setTimeout(() => {
        // Clear form fields
        nameInput.value = '';
        emailInput.value = '';
        messageTextarea.value = '';
        
        // Show success message
        submitButton.innerHTML = 'Sent Successfully <i class="fa-solid fa-check"></i>';
        submitButton.style.backgroundColor = '#4CAF50';
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
          submitButton.style.backgroundColor = '';
        }, 3000);
        
        // Show toast notification
        showToast('Message sent successfully!', 'success');
      }, 1500);
    }
  });

  // Form validation function
  function validateForm() {
    let isValid = true;
    
    // Reset previous error styles
    removeErrorStyles();
    
    // Validate Name
    if (nameInput.value.trim() === '') {
      setErrorFor(nameInput, 'Name cannot be empty');
      isValid = false;
    }
    
    // Validate Email
    if (emailInput.value.trim() === '') {
      setErrorFor(emailInput, 'Email cannot be empty');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      setErrorFor(emailInput, 'Email is not valid');
      isValid = false;
    }
    
    // Validate Message
    if (messageTextarea.value.trim() === '') {
      setErrorFor(messageTextarea, 'Message cannot be empty');
      isValid = false;
    }
    
    return isValid;
  }

  // Set error message and style
  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    
    // Create error message element if it doesn't exist
    let errorDisplay = formControl.querySelector('.error-message');
    if (!errorDisplay) {
      errorDisplay = document.createElement('div');
      errorDisplay.className = 'error-message';
      formControl.appendChild(errorDisplay);
    }
    
    // Add error class and message
    input.classList.add('input-error');
    errorDisplay.innerText = message;
  }

  // Remove all error styles
  function removeErrorStyles() {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());
    
    const errorInputs = form.querySelectorAll('.input-error');
    errorInputs.forEach(input => input.classList.remove('input-error'));
  }

  // Email validation using regex
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Toast notification function
  function showToast(message, type) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <div class="toast-message">${message}</div>
      </div>
      <i class="fa-solid fa-times toast-close"></i>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Add close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.add('toast-hiding');
      setTimeout(() => toast.remove(), 300);
    });
    
    // Auto remove toast after 5 seconds
    setTimeout(() => {
      toast.classList.add('toast-hiding');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }
});