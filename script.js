function initPortfolio() {
  
  // ==========================================================================
  // Loader Fade-Out
  // ==========================================================================
  const loader = document.getElementById('loader');
  
  function hideLoader() {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.visibility = 'hidden';
      }, 600);
    }
  }

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 600);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideLoader, 600);
    });
    // Fallback for loader
    setTimeout(hideLoader, 2500);
  }


  // ==========================================================================
  // Mobile Navigation Toggle
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // Intersection Observer - Scroll Reveal
  // ==========================================================================
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // Card Tilt Effect
  // ==========================================================================
  const tiltCards = document.querySelectorAll('[data-tilt]');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      const mouseX = e.clientX - cardRect.left - cardWidth / 2;
      const mouseY = e.clientY - cardRect.top - cardHeight / 2;
      
      const rotateX = -(mouseY / (cardHeight / 2)) * 12;
      const rotateY = (mouseX / (cardWidth / 2)) * 12;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ==========================================================================
  // Portfolio Poster Assets Configuration
  // ==========================================================================
  const portfolioItems = [
    {
      src: "assets/media__1783928818172.jpg",
      title: "Google Ads Business Growth",
      category: "Creative Design Studio"
    },
    {
      src: "assets/media__1783928818183.jpg",
      title: "Steer Brand To Next Level",
      category: "Skyline Selfdrive"
    },
    {
      src: "assets/media__1783928818269.jpg",
      title: "Merry Christmas Block Mortar",
      category: "INFRABLOC"
    },
    {
      src: "assets/media__1783927453300.jpg",
      title: "Blend In? Never - Campaign Poster",
      category: "Creative Design Studio"
    },
    {
      src: "assets/media__1783927453304.jpg",
      title: "Digital Solutions Promotion",
      category: "Creative Design Studio"
    },
    {
      src: "assets/media__1783927453316.jpg",
      title: "Brand Identity Design Services",
      category: "Creative Design Studio"
    },
    {
      src: "assets/media__1783927453324.jpg",
      title: "Empower Your Brand - Campaign Design",
      category: "Creative Design Studio"
    },
    {
      src: "assets/media__1783927453331.jpg",
      title: "Social Media Management Diagram",
      category: "Creative Design Studio"
    },
    {
      src: "assets/media__1783928818193.jpg",
      title: "Weekend Relax & Recharge Campaign",
      category: "Creative Design Studio"
    },
    {
      src: "assets/media__1783928818199.jpg",
      title: "Services Showcase Strategy Outline",
      category: "Creative Design Studio"
    },
    {
      src: "assets/media__1783929311934.jpg",
      title: "Hellonhells Republic Day Campaign",
      category: "Social Media"
    },
    {
      src: "assets/media__1783929311952.jpg",
      title: "Delamine Goa Trip Incentive Promotion",
      category: "Branding"
    },
    {
      src: "assets/media__1783929311961.jpg",
      title: "Orry Cars Fleet Attachment Campaign",
      category: "Skyline Selfdrive"
    },
    {
      src: "assets/media__1783929311969.jpg",
      title: "Skyline Corporate SCS Booking Promo",
      category: "Skyline Selfdrive"
    },
    {
      src: "assets/media__1783929874878.jpg",
      title: "Impossible - Creative Campaign",
      category: "Creative Design Studio"
    },
    {
      src: "assets/media__1783929874887.jpg",
      title: "Sharp Leads for Social Media & Web",
      category: "Creative Design Studio"
    },
    {
      src: "assets/media__1783929874898.jpg",
      title: "Durable ACC Blocks Promotion",
      category: "INFRABLOC"
    },
    {
      src: "assets/media__1783929874907.jpg",
      title: "Quality Social Media Designs for Brands",
      category: "Creative Design Studio"
    },
    {
      src: "assets/media__1783929912450.jpg",
      title: "Black Apron Toe Leather Loafers",
      category: "NAPPA DORI"
    }
  ];

  let activeImageIndex = 0;
  let currentSlideIndex = 0;

  // ==========================================================================
  // Blurry 3D Stack Unlock & Horizontal Slider Builder
  // ==========================================================================
  const stackWrapper = document.getElementById('portfolioStackWrapper');
  const btnUnlock = document.getElementById('btnUnlockGallery');
  const sliderWrapper = document.getElementById('portfolioSliderWrapper');
  const sliderTrack = document.getElementById('sliderTrack');
  const dotsContainer = document.getElementById('sliderIndicatorDots');
  
  const arrowLeft = document.getElementById('sliderArrowLeft');
  const arrowRight = document.getElementById('sliderArrowRight');

  btnUnlock.addEventListener('click', () => {
    // 1. Trigger stack cards to expand and fade blur
    stackWrapper.classList.add('unlocked');
    
    // 2. Wait for cards zoom/blur fade transition
    setTimeout(() => {
      stackWrapper.classList.add('hidden');
      
      // 3. Render and show the slider
      renderSliderCarousel();
      sliderWrapper.classList.remove('hidden');
      
      setTimeout(() => {
        sliderWrapper.classList.add('active');
        // Reset scroll position on active
        updateSliderPosition();
      }, 50);
    }, 600);
  });

  function renderSliderCarousel() {
    sliderTrack.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    portfolioItems.forEach((item, index) => {
      // Create slide item
      const slide = document.createElement('div');
      slide.className = 'slider-item';
      slide.setAttribute('data-index', index);
      
      slide.innerHTML = `
        <div class="slider-image-wrapper">
          <img src="${item.src}" alt="${item.title}">
          <div class="slider-overlay">
            <h4 class="slider-title">${item.title}</h4>
            <span class="slider-category">${item.category}</span>
          </div>
        </div>
      `;
      
      slide.addEventListener('click', () => {
        openLightbox(index);
      });
      
      sliderTrack.appendChild(slide);

      // Create indicator dot
      const dot = document.createElement('span');
      dot.className = 'indicator-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('data-slide', index);
      
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
      
      dotsContainer.appendChild(dot);
    });
  }

  // Horizontal Carousel Math
  function getSlideOffset() {
    const slideItem = document.querySelector('.slider-item');
    if (!slideItem) return 350; // Fallback width + gap
    
    const slideWidth = slideItem.getBoundingClientRect().width;
    const gap = 30; // Matches CSS gap
    return slideWidth + gap;
  }

  function getMaxSlides() {
    const containerWidth = document.querySelector('.slider-track-container').getBoundingClientRect().width;
    const itemOffset = getSlideOffset();
    const visibleCount = Math.floor(containerWidth / itemOffset);
    // Limit slide indexes so we don't scroll into blank space
    return Math.max(0, portfolioItems.length - (visibleCount || 1));
  }

  function updateSliderPosition() {
    const offset = getSlideOffset();
    sliderTrack.style.transform = `translateX(-${currentSlideIndex * offset}px)`;
    
    // Update active dot indicators
    const dots = document.querySelectorAll('.slider-indicator-dots .indicator-dot');
    dots.forEach((dot, index) => {
      dot.classList.remove('active');
      if (index === currentSlideIndex) {
        dot.classList.add('active');
      }
    });
  }

  function goToSlide(index) {
    const maxSlides = getMaxSlides();
    currentSlideIndex = Math.min(Math.max(0, index), maxSlides);
    updateSliderPosition();
  }

  arrowLeft.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSliderPosition();
    }
  });

  arrowRight.addEventListener('click', () => {
    const maxSlides = getMaxSlides();
    if (currentSlideIndex < maxSlides) {
      currentSlideIndex++;
      updateSliderPosition();
    }
  });

  // Adjust slides on window resize
  window.addEventListener('resize', () => {
    if (sliderWrapper.classList.contains('active')) {
      goToSlide(currentSlideIndex); // Recalculate max limits and adjust
    }
  });

  // ==========================================================================
  // Lightbox & Image Slider Logic
  // ==========================================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  function openLightbox(index) {
    activeImageIndex = index;
    updateLightboxContent();
    lightbox.style.display = 'flex';
    setTimeout(() => {
      lightbox.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 400);
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const activeItem = portfolioItems[activeImageIndex];
    if (!activeItem) return;

    lightboxImg.classList.remove('active');
    lightboxImg.src = activeItem.src;
    lightboxCaption.textContent = `${activeItem.title} - ${activeItem.category}`;
    
    setTimeout(() => {
      lightboxImg.classList.add('active');
    }, 50);
  }

  lightboxClose.addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

  lightboxPrev.addEventListener('click', () => {
    if (portfolioItems.length <= 1) return;
    activeImageIndex = (activeImageIndex - 1 + portfolioItems.length) % portfolioItems.length;
    updateLightboxContent();
  });

  lightboxNext.addEventListener('click', () => {
    if (portfolioItems.length <= 1) return;
    activeImageIndex = (activeImageIndex + 1) % portfolioItems.length;
    updateLightboxContent();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev.click();
      if (e.key === 'ArrowRight') lightboxNext.click();
    }
  });

  // ==========================================================================
  // Smooth scroll links override
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
