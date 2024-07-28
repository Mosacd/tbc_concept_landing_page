
// heaer menu dropdown functionality

function closeDropdown() {
    const contentDiv = document.querySelector('.header_dropdown-bg');
    const navdrops = document.querySelectorAll('[id^="navdrop"]');
    const drops = document.querySelectorAll('[id^="drop"]');

    // Removing active class to trigger CSS transitions
   
    contentDiv.classList.remove("active");
    navdrops.forEach(navdrop => navdrop.classList.remove("active"));
    drops.forEach(drop => drop.classList.remove("active"));
        contentDiv.innerHTML = ``;
  
}

function setupDropdown(buttonId, navdropId, dropId, htmlContent) {
    document.getElementById(buttonId).addEventListener('click', function(event) {
        const contentDiv = document.querySelector('.header_dropdown-bg');
        const navdrop = document.getElementById(navdropId);
        const drop = document.getElementById(dropId);
       
        if (!contentDiv.classList.contains('active')) {
            closeDropdown(); // Close any open dropdown
           
                contentDiv.innerHTML = htmlContent;
            contentDiv.classList.add("active");
            navdrop.classList.add("active");
            drop.classList.add("active");
           
        } else if (navdrop.classList.contains('active')) {
            closeDropdown(); // Close if clicking the same button
            
        } else {
                 closeDropdown();
                 
                 contentDiv.classList.add("active");
                 navdrop.classList.add("active");
                 drop.classList.add("active");
                contentDiv.innerHTML = htmlContent;
             
        }
        
        event.stopPropagation();
    });
}

const dropdownContent = `
    <div cont1="1" class="container">
        <a id="cartimages" href="https://tbconline.ge/tbcrd/login?t=false" target="_blank" class="header_dropdown-link-block w-inline-block">
            <div class="header_dropdown-link-block-img-wrapper">
                <picture>
                    <source media="(max-width: 767px)" srcset="https://static.tbcconcept.ge/mobile/media/uz0y3tkf.idxFixed aspect ratio block [Utility].png">
                    <source media="(max-width: 1023px)" srcset="https://static.tbcconcept.ge/tablet/media/uz0y3tkf.idxFixed aspect ratio block [Utility].png">
                    <img src="https://static.tbcconcept.ge/desktop/media/uz0y3tkf.idxFixed aspect ratio block [Utility].png" loading="lazy" width="190" height="136" class="header_dropdown-link-block-img">
                </picture>
            </div>
            <div data-animation="arrow" class="arrow-link">
                <div class="button_icon w-embed">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8342 4.04761H7.50091C7.04258 4.04761 6.66758 4.42261 6.66758 4.88094C6.66758 5.33927 7.04258 5.71427 7.50091 5.71427H13.8259L3.57578 15.9643C3.25078 16.2893 3.25078 16.8143 3.57578 17.1393C3.74245 17.3059 3.95078 17.3809 4.16744 17.3809C4.38411 17.3809 4.59244 17.2976 4.75911 17.1393L15.0009 6.88927V13.2143C15.0009 13.6726 15.3759 14.0476 15.8342 14.0476C16.2925 14.0476 16.6675 13.6726 16.6675 13.2143V4.88094C16.6675 4.42261 16.2925 4.04761 15.8342 4.04761Z"></path>
                    </svg>
                </div>
                <div class="button_text"> ციფრული ბანკი </div>
            </div>
        </a>
    </div>
`;

setupDropdown('forhugedrop1', 'navdrop1', 'drop1', dropdownContent);
setupDropdown('forhugedrop2', 'navdrop2', 'drop2', dropdownContent);
setupDropdown('forhugedrop3', 'navdrop3', 'drop3', dropdownContent);

document.addEventListener('click', function(event) {
    const contentDiv = document.querySelector('.header_dropdown-bg');
    const buttons = document.querySelectorAll('[id^="forhugedrop"]');
    let clickedOutside = true;

    buttons.forEach(button => {
        if (button.contains(event.target)) {
            clickedOutside = false;
        }
    });

    if (!contentDiv.contains(event.target) && clickedOutside) {
        closeDropdown();
        
    }
});

const checkViewportWidth = () => {
    if (window.innerWidth < 991) {
        closeDropdown();

    }
}

window.addEventListener('resize', checkViewportWidth);





//swiper functionality and resizings

document.addEventListener('DOMContentLoaded', function () {
  const sliderComponents = document.querySelectorAll('.section_offers-swiper, .section_awards-swiper');

  function initializeSlider(sliderComponent, index) {
      const swiperContainer = sliderComponent.querySelector('.swiper_container');
      const swiperWrapper = sliderComponent.querySelector('.swiper-wrapper');
      const swiperSlides = sliderComponent.querySelectorAll('.swiper-slide');
      const swiperScrollbar = sliderComponent.querySelector('.swiper-scrollbar-drag');
      const scrollbarContainer = sliderComponent.querySelector('.swiper_scrollbar');
      const prevArrow = sliderComponent.querySelector('.main-slider-prev');
      const nextArrow = sliderComponent.querySelector('.main-slider-next');

      let isDragging = false;
      let startPos = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;
      let currentIndex = 0;

  function adjustSlideWidth() {
      const containerWidth = swiperContainer.offsetWidth;
      let slideWidth, marginRight;

      if (window.innerWidth < 480) {
          slideWidth = containerWidth * 0.818;
          marginRight = 15;
      } else if (window.innerWidth < 600) {
          slideWidth = containerWidth * 0.82;
          marginRight = 15;
      } else if (window.innerWidth < 768) {
          slideWidth = containerWidth * 0.485;
          marginRight = 15;
      } else if (window.innerWidth < 1024) {
          slideWidth = containerWidth * 0.4915;
          marginRight = 15;
      } else if (window.innerWidth < 1440) {
          slideWidth = containerWidth * 0.38;
          marginRight = 30;
      } else {
          slideWidth = containerWidth * 0.315;
          marginRight = 30;
      }

      swiperSlides.forEach(slide => {
          slide.style.width = `${slideWidth}px`;
          slide.style.marginRight = `${marginRight}px`;
      });

      // Recalculate currentTranslate based on new slide widths
      currentTranslate = -currentIndex * (slideWidth + marginRight);
      setSliderPosition();
      updateScrollbar();
  }

  function updateScrollbarVisibility() {
    if (index === 1) { // Check if it's the second slider (index 1)
        if (window.innerWidth >= 1440) {
            scrollbarContainer.style.display = 'none';
        } else {
            scrollbarContainer.style.display = 'block';
        }
    }
}

  function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function setSliderPosition() {
    requestAnimationFrame(() => {
        swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
    });
}

  function updateSlideClasses() {
      swiperSlides.forEach((slide, index) => {
          slide.classList.remove('swiper-slide-active', 'swiper-slide-prev', 'swiper-slide-next');
          if (index === currentIndex) slide.classList.add('swiper-slide-active');
          if (index === currentIndex - 1) slide.classList.add('swiper-slide-prev');
          if (index === currentIndex + 1) slide.classList.add('swiper-slide-next');
      });
  }

 function updateScrollbar(immediate = false) {
  const containerWidth = swiperContainer.offsetWidth;
  const totalWidth = swiperWrapper.scrollWidth;
  const scrollPercentage = -currentTranslate / (totalWidth - containerWidth);
  const scrollbarWidth = swiperContainer.offsetWidth - 90; // Subtract space for arrows
  
  // Calculate the thumb width as 50% of its original size
  const thumbWidth = ((containerWidth / totalWidth) * scrollbarWidth) * 0.5;
  const thumbTranslate = scrollPercentage * (scrollbarWidth - thumbWidth);
  
  if (immediate) {
      swiperScrollbar.style.width = `${thumbWidth}px`;
      swiperScrollbar.style.transform = `translateX(${thumbTranslate}px)`;
  } else {
      requestAnimationFrame(() => {
          swiperScrollbar.style.width = `${thumbWidth}px`;
          swiperScrollbar.style.transform = `translateX(${thumbTranslate}px)`;
      });
  }
}


function updateArrows() {
  const containerWidth = swiperContainer.offsetWidth;
  const totalWidth = swiperWrapper.scrollWidth;
  const maxTranslate = containerWidth - totalWidth;
  
  prevArrow.classList.toggle('swiper-button-disabled', currentTranslate >= 0);
  nextArrow.classList.toggle('swiper-button-disabled', currentTranslate <= maxTranslate);
}

  function snapToSlide() {
    const slideWidth = swiperSlides[0].offsetWidth;
    const marginRight = parseInt(getComputedStyle(swiperSlides[0]).marginRight);
    const snapIndex = Math.round(-currentTranslate / (slideWidth + marginRight));
    currentIndex = Math.max(0, Math.min(snapIndex, swiperSlides.length - 1));
    
    const containerWidth = swiperContainer.offsetWidth;
    const totalWidth = swiperWrapper.scrollWidth;
    const maxTranslate = containerWidth - totalWidth;
    
    currentTranslate = -currentIndex * (slideWidth + marginRight);
    currentTranslate = Math.max(maxTranslate, Math.min(0, currentTranslate));
    
    swiperWrapper.style.transition = 'transform 800ms';
    setSliderPosition();
    updateSlideClasses();
    updateScrollbar();
    updateArrows();

    setTimeout(() => {
        swiperWrapper.style.transition = '';
    }, 300);
}


function dragStart(event) {
  isDragging = true;
  startPos = getPositionX(event) - currentTranslate;
  swiperContainer.style.cursor = 'grabbing';
  swiperWrapper.classList.add('dragging');
  swiperScrollbar.classList.add('dragging'); // Add this line
}

  function drag(event) {
  if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
      setSliderPosition();
      updateScrollbar(true);
  }
}

function dragEnd() {
isDragging = false;
swiperContainer.style.cursor = 'grab';
swiperWrapper.classList.remove('dragging');
swiperScrollbar.classList.remove('dragging'); // Add this line
snapToSlide();
}

adjustSlideWidth();
        updateSlideClasses();
        updateScrollbar();
        updateArrows();
        updateScrollbarVisibility();

  swiperContainer.addEventListener('mousedown', dragStart);
        swiperContainer.addEventListener('touchstart', dragStart);
        swiperContainer.addEventListener('mousemove', drag);
        swiperContainer.addEventListener('touchmove', drag);
        swiperContainer.addEventListener('mouseup', dragEnd);
        swiperContainer.addEventListener('touchend', dragEnd);
        swiperContainer.addEventListener('mouseleave', dragEnd);

  prevArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        const slideWidth = swiperSlides[0].offsetWidth;
      const marginRight = parseInt(getComputedStyle(swiperSlides[0]).marginRight);
      currentTranslate = -currentIndex * (slideWidth + marginRight);
      
      // Ensure we don't scroll past the last slide
      const containerWidth = swiperContainer.offsetWidth;
      const totalWidth = swiperWrapper.scrollWidth;
      const maxTranslate = Math.min(0, containerWidth - totalWidth);
      currentTranslate = Math.max(maxTranslate, currentTranslate);
      
      setSliderPosition();
      updateScrollbar();
      updateSlideClasses();
      updateArrows();
    }
});

nextArrow.addEventListener('click', () => {
  const containerWidth = swiperContainer.offsetWidth;
  const totalWidth = swiperWrapper.scrollWidth;
  const maxTranslate = containerWidth - totalWidth;
  
  if (currentTranslate > maxTranslate) {
      currentIndex++;
      const slideWidth = swiperSlides[0].offsetWidth;
      const marginRight = parseInt(getComputedStyle(swiperSlides[0]).marginRight);
      currentTranslate = Math.max(maxTranslate, -currentIndex * (slideWidth + marginRight));
      
      setSliderPosition();
      updateScrollbar();
      updateSlideClasses();
      updateArrows();
  }
});

// Add resize event listener
window.addEventListener('resize', () => {
  adjustSlideWidth();
  snapToSlide();
  updateScrollbarVisibility();
});
}

// Initialize all slider components
sliderComponents.forEach((component, index) => initializeSlider(component, index));
});









//webpage custom scrollbar functionality

  let isScrolling = false;
  let scrollTimeout;
  
  function adjustLayout() {
    const container = document.querySelector('.responsive-container');
    let smoothScrollContainer = container.querySelector('.smooth-scroll-container');
    let contentDiv = container.querySelector('.scroll-content') || container.querySelector('div:not(.smooth-scroll-container):not(.scrollbar-track)');
  
    if (window.innerWidth <= 991) {
          // Mobile layout
          if (smoothScrollContainer) {
              while (smoothScrollContainer.firstChild) {
                  container.appendChild(smoothScrollContainer.firstChild);
              }
              container.removeChild(smoothScrollContainer);
              smoothScrollContainer = null;
          }
          if (contentDiv && contentDiv.classList.contains('scroll-content')) {
              const newDiv = document.createElement('div');
              while (contentDiv.firstChild) {
                  newDiv.appendChild(contentDiv.firstChild);
              }
              container.replaceChild(newDiv, contentDiv);
              contentDiv = newDiv;
          }
          const scrollbarTracks = container.querySelectorAll('.scrollbar-track');
          scrollbarTracks.forEach(track => track.remove());
      } else {
          // Desktop layout
          if (!smoothScrollContainer) {
            smoothScrollContainer = document.createElement('div');
            smoothScrollContainer.className = 'smooth-scroll-container';
            smoothScrollContainer.setAttribute('data-scrollbar', 'true');
            smoothScrollContainer.setAttribute('tabindex', '-1');
            let scrollContent;
            if (contentDiv && !contentDiv.classList.contains('scroll-content')) {
                scrollContent = document.createElement('div');
                scrollContent.className = 'scroll-content';
                while (contentDiv.firstChild) {
                    scrollContent.appendChild(contentDiv.firstChild);
                }
                container.replaceChild(scrollContent, contentDiv);
            } else {
                scrollContent = contentDiv || document.createElement('div');
                scrollContent.className = 'scroll-content';
            }
            smoothScrollContainer.appendChild(scrollContent);
            container.appendChild(smoothScrollContainer);
        }
  
        createScrollbars(smoothScrollContainer);
        updateScrollbarPositions(smoothScrollContainer);
        
        // Remove existing event listeners
        
        smoothScrollContainer.removeEventListener('wheel', wheelHandler);
        
        // Reattach event listeners
     
        smoothScrollContainer.addEventListener('wheel', wheelHandler);
      }
  }
  
  function smoothScroll(element, target, duration) {
    const start = element.scrollTop;
    const distance = target - start;
    const startTime = performance.now();
  
    function animation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress); // Simpler easing function
        
        element.scrollTop = start + distance * easeOutQuad;
        updateScrollbarPositions(element);
  
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
  
    requestAnimationFrame(animation);
  }
  
  
  function wheelHandler(e) {
    e.preventDefault();
    const smoothScrollContainer = e.currentTarget;
    const scrollSpeed = 1; // Adjust this value to change scroll speed
    const targetScroll = smoothScrollContainer.scrollTop + (e.deltaY * scrollSpeed);
    
    // Directly update scroll position for immediate response
    smoothScrollContainer.scrollTop = targetScroll;
    
    updateScrollbarPositions(smoothScrollContainer);
    showScrollbar(smoothScrollContainer);
    clearTimeout(scrollTimeout);
    isScrolling = true;
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
        hideScrollbar(smoothScrollContainer);
    }, 1000);
  }
  
     
  
  function scrollHandler() {
      const container = this;
      updateScrollbarPositions(container);
      showScrollbar(container);
      clearTimeout(scrollTimeout);
      isScrolling = true;
      scrollTimeout = setTimeout(() => {
          isScrolling = false;
          hideScrollbar(container);
      }, 1000); // Hide scrollbar after 1 second of inactivity
  }
  
  function createScrollbars(container) {
    let vTrack = container.querySelector('.scrollbar-track-y');
    if (!vTrack) {
        vTrack = document.createElement('div');
        vTrack.className = 'scrollbar-track scrollbar-track-y';
        const vThumb = document.createElement('div');
        vThumb.className = 'scrollbar-thumb scrollbar-thumb-y';
        vTrack.appendChild(vThumb);
        container.appendChild(vTrack);
    }
    let hTrack = container.querySelector('.scrollbar-track-x');
    if (!hTrack) {
        hTrack = document.createElement('div');
        hTrack.className = 'scrollbar-track scrollbar-track-x';
        const hThumb = document.createElement('div');
        hThumb.className = 'scrollbar-thumb scrollbar-thumb-x';
        hTrack.appendChild(hThumb);
        container.appendChild(hTrack);
    }
    addScrollbarDragFunctionality(container, vTrack, 'y');
    addScrollbarDragFunctionality(container, hTrack, 'x');

    // Add event listeners for hover
    vTrack.addEventListener('mouseenter', () => showScrollbar(container));
    vTrack.addEventListener('mouseleave', () => {
        if (!isScrolling) {
            hideScrollbar(container);
        }
    });
    hTrack.addEventListener('mouseenter', () => showScrollbar(container));
    hTrack.addEventListener('mouseleave', () => {
        if (!isScrolling) {
            hideScrollbar(container);
        }
    });
}
  
  function addScrollbarDragFunctionality(container, track, axis) {
    const thumb = track.querySelector(`.scrollbar-thumb-${axis}`);
    thumb.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const startPos = axis === 'y' ? e.clientY : e.clientX;
        const startScroll = axis === 'y' ? container.scrollTop : container.scrollLeft;
        const scrollContentSize = axis === 'y' ? container.scrollHeight : container.scrollWidth;
        const containerSize = axis === 'y' ? container.clientHeight : container.clientWidth;
        function mousemove(e) {
            const delta = (axis === 'y' ? e.clientY : e.clientX) - startPos;
            const scrollRatio = delta / containerSize;
            const newScroll = startScroll + scrollRatio * scrollContentSize;
            if (axis === 'y') {
                container.scrollTop = newScroll; // Direct scrolling for more responsiveness
            } else {
                container.scrollLeft = newScroll;
            }
            updateScrollbarPositions(container);
            showScrollbar(container);
        }
        function mouseup() {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
            setTimeout(() => hideScrollbar(container), 1000);
        }
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
    });
  }
  
  function updateScrollbarPositions(container) {
      const scrollContent = container.querySelector('.scroll-content');
      const vTrack = container.querySelector('.scrollbar-track-y');
      const hTrack = container.querySelector('.scrollbar-track-x');
      if (scrollContent && vTrack && hTrack) {
          const vThumb = vTrack.querySelector('.scrollbar-thumb-y');
          const hThumb = hTrack.querySelector('.scrollbar-thumb-x');
          const containerHeight = container.clientHeight;
          const containerWidth = container.clientWidth;
          const contentHeight = scrollContent.scrollHeight;
          const contentWidth = scrollContent.scrollWidth;
          // Vertical scrollbar
          const vScrollRatio = containerHeight / contentHeight;
          const vThumbHeight = Math.max(20, containerHeight * vScrollRatio);
          vThumb.style.height = `${vThumbHeight}px`;
          const vScrollTop = (container.scrollTop / (contentHeight - containerHeight)) * (containerHeight - vThumbHeight);
          vThumb.style.transform = `translate3d(0px, ${vScrollTop}px, 0px)`;
          vTrack.style.display = contentHeight > containerHeight ? 'block' : 'none';
          // Horizontal scrollbar
          const hScrollRatio = containerWidth / contentWidth;
          const hThumbWidth = Math.max(20, containerWidth * hScrollRatio);
          hThumb.style.width = `${hThumbWidth}px`;
          const hScrollLeft = (container.scrollLeft / (contentWidth - containerWidth)) * (containerWidth - hThumbWidth);
          hThumb.style.transform = `translate3d(${hScrollLeft}px, 0px, 0px)`;
          hTrack.style.display = contentWidth > containerWidth ? 'block' : 'none';
      }
  }
  
function showScrollbar(container) {
    const vTrack = container.querySelector('.scrollbar-track-y');
    const hTrack = container.querySelector('.scrollbar-track-x');
    if (vTrack) vTrack.style.opacity = '1';
    if (hTrack) hTrack.style.opacity = '1';
}
  
function hideScrollbar(container) {
  if (!isScrolling) {
      const vTrack = container.querySelector('.scrollbar-track-y');
      const hTrack = container.querySelector('.scrollbar-track-x');
      if (vTrack && !vTrack.matches(':hover')) vTrack.style.opacity = '0';
      if (hTrack && !hTrack.matches(':hover')) hTrack.style.opacity = '0';
  }
}
  
  function initializeScrollbars() {
    setTimeout(() => {
        const container = document.querySelector('.responsive-container');
        if (container) {
            adjustLayout();
            const smoothScrollContainer = container.querySelector('.smooth-scroll-container');
            if (smoothScrollContainer) {
                createScrollbars(smoothScrollContainer);
                updateScrollbarPositions(smoothScrollContainer);
                smoothScrollContainer.addEventListener('scroll', scrollHandler);
                smoothScrollContainer.addEventListener('wheel', wheelHandler);
            }
        }
    }, 100);
  }
  
  // Replace the existing load event listener with this:
  document.addEventListener('DOMContentLoaded', initializeScrollbars);
  window.addEventListener('resize', () => {
    adjustLayout();
    const smoothScrollContainer = document.querySelector('.smooth-scroll-container');
    if (smoothScrollContainer) {
        updateScrollbarPositions(smoothScrollContainer);
    }
  });
  















//footer dropdown menus


  document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.footer_dropdown');
    let openDropdown = null;
  
    function adjustFooterDropdowns() {
      const isMobile = window.innerWidth < 767;
      console.log('Adjusting dropdowns. Is mobile:', isMobile);
  
      dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.footer_dropdown-toggle');
        const arrow = dropdown.querySelector('.footer_dropdown-arrow');
        const list = dropdown.querySelector('.footer_dropdown-list');
        let wrapper = dropdown.querySelector('[aria-hidden="true"], [aria-expanded="true"]');
  
        // Remove existing event listener
        if (toggle.hasListener) {
          toggle.removeEventListener('click', toggle.clickHandler);
          toggle.hasListener = false;
        }
  
        if (isMobile) {
          if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.setAttribute('data-v-174d8ed1', '');
            wrapper.setAttribute('aria-hidden', 'true');
            wrapper.setAttribute('hidden', 'hidden');
            wrapper.style.height = '0px';
            wrapper.style.overflow = 'hidden';
            wrapper.style.transitionProperty = 'height';
            wrapper.style.transitionDuration = '1000ms';
            list.parentNode.insertBefore(wrapper, list);
            wrapper.appendChild(list);
          }
        } else {
          if (wrapper) {
            dropdown.insertBefore(list, wrapper);
            wrapper.remove();
          }
          arrow.classList.remove('active');
          list.style.display = '';
        }
  
        // Reset arrow and wrapper state
        arrow.classList.remove('active');
        if (wrapper) {
          wrapper.style.height = '0px';
          wrapper.setAttribute('aria-hidden', 'true');
          wrapper.setAttribute('hidden', 'hidden');
          wrapper.removeAttribute('aria-expanded');
        }
  
        // Reattach event listener
        toggle.clickHandler = function() {
          const currentIsMobile = window.innerWidth < 767;
          if (!currentIsMobile) return; // Prevent toggle on desktop
  
          const currentWrapper = dropdown.querySelector('[aria-hidden="true"], [aria-expanded="true"]');
          if (!currentWrapper) return;
  
          if (openDropdown && openDropdown !== dropdown) {
            closeDropdown(openDropdown);
          }
  
          if (currentWrapper.getAttribute('aria-hidden') === 'true') {
            openDropdown = dropdown;
            currentWrapper.style.height = '0px';
            currentWrapper.removeAttribute('hidden');
            currentWrapper.removeAttribute('aria-hidden');
            currentWrapper.setAttribute('aria-expanded', 'true');
            arrow.classList.add('active');
            requestAnimationFrame(() => {
              currentWrapper.style.height = `${list.offsetHeight}px`;
            });
          } else {
            closeDropdown(dropdown);
          }
        };
  
        toggle.addEventListener('click', toggle.clickHandler);
        toggle.hasListener = true;
      });
    }
  
    function closeDropdown(dropdown) {
      const wrapper = dropdown.querySelector('[aria-expanded="true"]');
      const arrow = dropdown.querySelector('.footer_dropdown-arrow');
      if (wrapper) {
        arrow.classList.remove('active');
        wrapper.style.height = `${wrapper.offsetHeight}px`;
        requestAnimationFrame(() => {
          wrapper.style.height = '0px';
        });
        wrapper.addEventListener('transitionend', function handleTransitionEnd(e) {
          if (e.propertyName === 'height') {
            wrapper.setAttribute('aria-hidden', 'true');
            wrapper.setAttribute('hidden', 'hidden');
            wrapper.removeAttribute('aria-expanded');
            wrapper.removeEventListener('transitionend', handleTransitionEnd);
          }
        });
      }
      if (openDropdown === dropdown) {
        openDropdown = null;
      }
    }
  
    // Run on page load and resize
    adjustFooterDropdowns();
  
    // Debounce the resize event
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(adjustFooterDropdowns, 250);
    });
  });







//header mobile menu implementation


document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const header = document.querySelector('header');

// Function to close the mobile menu
  function closeMobileMenu() {
    const existingMobileMenu = document.querySelector('.header_menu-mobile');
    
    if (existingMobileMenu) {
      existingMobileMenu.remove();
      menuToggle.classList.remove('active');

      setTimeout(() => {
        existingMobileMenu.remove();
      }, 300); // This should match the transition duration in CSS
    }
  }

 // Function to check window width and close menu if necessary
 function checkWindowWidth() {
  if (window.innerWidth > 991) {
    closeMobileMenu();
  }
}

window.addEventListener('resize', checkWindowWidth);

checkWindowWidth();

  menuToggle.addEventListener('click', function() {
    const existingMobileMenu = document.querySelector('.header_menu-mobile');
    
    if (!existingMobileMenu) {
      // If the mobile menu doesn't exist, create and append it
      const mobileMenu = document.createElement('div');
      mobileMenu.className = 'header_menu-mobile';
      mobileMenu.setAttribute('data-v-562b0aec', '');
      mobileMenu.innerHTML = `
<div data-v-562b0aec="" class="header_menu-mobile-inner">
<div data-v-562b0aec="" class="header_menu-mobile-main">
<div data-v-562b0aec="" class="header_mobile-dropdown w-dropdown">
<div data-v-562b0aec="" class="header_mobile-dropdown-toggle w-dropdown-toggle">
<div data-v-562b0aec="">პროდუქტები</div>
<div data-v-562b0aec="" class="header_dropdown-line"></div>
<div data-v-562b0aec="" class="header_mobile-dropdown-arr w-embed">
<svg data-v-562b0aec="" width="12" height="7" viewbox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path data-v-562b0aec="" d="M6.35253 6.23266L11.3525 1.23266L10.6445 0.524658L5.64453 5.52466L6.35253 6.23266Z" fill="#9999AA">
</path>
<path data-v-562b0aec="" d="M0.644531 1.23266L5.64453 6.23266L6.35253 5.52466L1.35253 0.524658L0.644531 1.23266Z" fill="#9999AA"></path>
</svg>
</div>
</div>
<div class="thisoneplease" data-v-562b0aec="" aria-hidden="true" hidden="hidden" style="height: 0px; overflow: hidden; transition-property: height; transition-duration: 1000ms;">
<nav data-v-562b0aec="" class="header_mobile-dropdown-list w-dropdown-list">
<div data-v-562b0aec="" class="header_mobile-dropdown-list-inner">
<a data-v-562b0aec="" href="/ge/products/overview" class="header_dropdown-link">პროდუქტების მიმოხილვა</a>
<a data-v-562b0aec="" href="/ge/products/kits" class="header_dropdown-link">ნაკრები</a>
<a data-v-562b0aec="" href="/ge/products/personalbanker" class="header_dropdown-link">პირადი ბანკირი</a>
</div>
</nav>
</div>
</div>
<div data-v-562b0aec="" class="header_mobile-dropdown w-dropdown">
<div data-v-562b0aec="" class="header_mobile-dropdown-toggle w-dropdown-toggle">
<div data-v-562b0aec="">შეთავაზებები</div>
<div data-v-562b0aec="" class="header_dropdown-line"></div>
<div data-v-562b0aec="" class="header_mobile-dropdown-arr w-embed">
<svg data-v-562b0aec="" width="12" height="7" viewbox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path data-v-562b0aec="" d="M6.35253 6.23266L11.3525 1.23266L10.6445 0.524658L5.64453 5.52466L6.35253 6.23266Z" fill="#9999AA"></path>
<path data-v-562b0aec="" d="M0.644531 1.23266L5.64453 6.23266L6.35253 5.52466L1.35253 0.524658L0.644531 1.23266Z" fill="#9999AA"></path>
</svg>
</div>
</div>
<div class="thisoneplease" data-v-562b0aec="" aria-hidden="true" hidden="hidden" style="height: 0px; overflow: hidden; transition-property: height; transition-duration: 1000ms;">
<nav data-v-562b0aec="" class="header_mobile-dropdown-list w-dropdown-list">
<div data-v-562b0aec="" class="header_mobile-dropdown-list-inner">
<a data-v-562b0aec="" href="/ge/lifestyle/overview" class="header_dropdown-link">მიმოხილვა</a>
<a data-v-562b0aec="" href="/ge/lifestyle/offers" class="header_dropdown-link">შეთავაზებები</a>
<a data-v-562b0aec="" href="/ge/lifestyle/events" class="header_dropdown-link">ღონისძიებები</a>
</div>
</nav>
</div>
</div>
<div data-v-562b0aec="" class="header_mobile-dropdown w-dropdown">
<div data-v-562b0aec="" class="header_mobile-dropdown-toggle w-dropdown-toggle">
<div data-v-562b0aec="">კონცეპტის სივრცე</div>
<div data-v-562b0aec="" class="header_dropdown-line"></div>
<div data-v-562b0aec="" class="header_mobile-dropdown-arr w-embed">
<svg data-v-562b0aec="" width="12" height="7" viewbox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path data-v-562b0aec="" d="M6.35253 6.23266L11.3525 1.23266L10.6445 0.524658L5.64453 5.52466L6.35253 6.23266Z" fill="#9999AA"></path>
<path data-v-562b0aec="" d="M0.644531 1.23266L5.64453 6.23266L6.35253 5.52466L1.35253 0.524658L0.644531 1.23266Z" fill="#9999AA"></path>
</svg>
</div>
</div>
<div class="thisoneplease" data-v-562b0aec="" aria-hidden="true" hidden="hidden" style="height: 0px; overflow: hidden; transition-property: height; transition-duration: 1000ms;">
<nav data-v-562b0aec="" class="header_mobile-dropdown-list w-dropdown-list">
<div data-v-562b0aec="" class="header_mobile-dropdown-list-inner">
<a data-v-562b0aec="" href="/ge/concept-space/overview" class="header_dropdown-link">მიმოხილვა</a>
<a data-v-562b0aec="" href="/ge/concept-space/cafe" class="header_dropdown-link">კაფე</a>
<a data-v-562b0aec="" href="/ge/concept-space/library" class="header_dropdown-link">ბიბლიოთეკა</a>
<a data-v-562b0aec="" href="/ge/concept-space/concept-branches" class="header_dropdown-link">კონცეპტ ფილიალები</a>
</div>
</nav>
</div>
</div>
<div data-v-562b0aec="" class="header_menu-mobile-contacts">
<div data-v-562b0aec="" class="container">
<a data-v-562b0aec="" href="#" class="footer_heading">დაგვიკავშირდით:</a>
<div data-v-562b0aec="" class="footer_contact-list">
<a data-v-562b0aec="" href="mob:+995 32 2 27 27 00" class="footer_contact-item w-inline-block">
<div data-v-562b0aec="" class="icon w-embed">
<svg data-v-562b0aec="" width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path data-v-562b0aec="" d="M11.5987 14.6676C5.93736 14.6676 1.33203 10.0622 1.33203 4.4009C1.33203 2.70956 2.70803 1.33423 4.3987 1.33423C4.57203 1.33423 4.74336 1.3489 4.90936 1.37756C5.07136 1.40356 5.2347 1.4449 5.3927 1.49956C5.61003 1.5749 5.7727 1.7569 5.82403 1.9809L6.73736 5.9569C6.78736 6.17556 6.72403 6.4049 6.5687 6.56756C6.47736 6.66223 6.47536 6.66423 5.6487 7.0969C6.31803 8.54623 7.48136 9.70556 8.90203 10.3522C9.3347 9.5249 9.33736 9.52223 9.43203 9.43156C9.59536 9.27556 9.82537 9.2149 10.0434 9.2629L14.0194 10.1756C14.2427 10.2269 14.4247 10.3896 14.5 10.6062C14.5547 10.7636 14.5954 10.9262 14.6227 11.0936C14.6507 11.2582 14.6654 11.4289 14.6654 11.6009C14.6654 13.2922 13.29 14.6676 11.5987 14.6676Z" fill="#555F62">
</path>
<mask data-v-562b0aec="" id="mask0_167_7524" maskunits="userSpaceOnUse" x="1" y="1" width="14" height="14" style="mask-type: luminance;">
<path data-v-562b0aec="" d="M11.5987 14.6676C5.93736 14.6676 1.33203 10.0622 1.33203 4.4009C1.33203 2.70956 2.70803 1.33423 4.3987 1.33423C4.57203 1.33423 4.74336 1.3489 4.90936 1.37756C5.07136 1.40356 5.2347 1.4449 5.3927 1.49956C5.61003 1.5749 5.7727 1.7569 5.82403 1.9809L6.73736 5.9569C6.78736 6.17556 6.72403 6.4049 6.5687 6.56756C6.47736 6.66223 6.47536 6.66423 5.6487 7.0969C6.31803 8.54623 7.48136 9.70556 8.90203 10.3522C9.3347 9.5249 9.33736 9.52223 9.43203 9.43156C9.59536 9.27556 9.82537 9.2149 10.0434 9.2629L14.0194 10.1756C14.2427 10.2269 14.4247 10.3896 14.5 10.6062C14.5547 10.7636 14.5954 10.9262 14.6227 11.0936C14.6507 11.2582 14.6654 11.4289 14.6654 11.6009C14.6654 13.2922 13.29 14.6676 11.5987 14.6676Z" fill="white"></path>
</mask>
<g data-v-562b0aec="" mask="url(#mask0_167_7524)"></g>
</svg>
</div>
<p class="footerforcontact" data-v-562b0aec="">+995 32 2 27 27 00</p>
</a>
<a data-v-562b0aec="" href="mailto:info@tbcconcept.ge" class="footer_contact-item w-inline-block">
<div data-v-562b0aec="" class="icon w-embed">
<svg data-v-562b0aec="" width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path data-v-562b0aec="" d="M11.9987 2.66772H3.9987C2.52536 2.66772 1.33203 3.86106 1.33203 5.33439V10.6744C1.33203 12.1477 2.52536 13.3411 3.9987 13.3411H11.9987C13.472 13.3411 14.6654 12.1477 14.6654 10.6744V5.33439C14.6654 3.86106 13.472 2.66772 11.9987 2.66772ZM11.9987 4.00106C12.0787 4.00106 12.152 4.01439 12.232 4.02106L7.9987 6.56106L3.75203 4.02772C3.83203 4.01439 3.9187 4.00106 4.00536 4.00106H12.0054H11.9987Z" fill="#555F62"></path>
</svg>
</div>
<p class="footerforcontact" data-v-562b0aec="">info@tbcconcept.ge</p>
</a>
<a data-v-562b0aec="" href="/ge/concept-space/concept-branches" class="footer_contact-item w-inline-block" target="_self">
<div data-v-562b0aec="" class="icon w-embed">
<svg data-v-562b0aec="" width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path data-v-562b0aec="" fill-rule="evenodd" clip-rule="evenodd" d="M2.66797 6.61623C2.66797 3.70356 5.06064 1.33423 8.0013 1.33423C10.942 1.33423 13.3346 3.70356 13.3346 6.61623C13.3346 10.2656 8.6353 14.3356 8.4353 14.5069C8.30997 14.6142 8.15597 14.6676 8.0013 14.6676C7.84664 14.6676 7.69264 14.6142 7.5673 14.5069C7.3673 14.3356 2.66797 10.2656 2.66797 6.61623ZM8.0013 8.66756C6.71464 8.66756 5.66797 7.62089 5.66797 6.33423C5.66797 5.04756 6.71464 4.0009 8.0013 4.0009C9.28797 4.0009 10.3346 5.04756 10.3346 6.33423C10.3346 7.62089 9.28797 8.66756 8.0013 8.66756ZM8.0013 5.33423C7.44997 5.33423 7.0013 5.7829 7.0013 6.33423C7.0013 6.88556 7.44997 7.33423 8.0013 7.33423C8.55264 7.33423 9.0013 6.88556 9.0013 6.33423C9.0013 5.7829 8.55264 5.33423 8.0013 5.33423Z" fill="#555F62"></path>
<mask data-v-562b0aec="" id="mask0_167_7533" maskunits="userSpaceOnUse" x="2" y="1" width="12" height="14" style="mask-type: luminance;">
<path data-v-562b0aec="" fill-rule="evenodd" clip-rule="evenodd" d="M2.66797 6.61623C2.66797 3.70356 5.06064 1.33423 8.0013 1.33423C10.942 1.33423 13.3346 3.70356 13.3346 6.61623C13.3346 10.2656 8.6353 14.3356 8.4353 14.5069C8.30997 14.6142 8.15597 14.6676 8.0013 14.6676C7.84664 14.6676 7.69264 14.6142 7.5673 14.5069C7.3673 14.3356 2.66797 10.2656 2.66797 6.61623ZM8.0013 8.66756C6.71464 8.66756 5.66797 7.62089 5.66797 6.33423C5.66797 5.04756 6.71464 4.0009 8.0013 4.0009C9.28797 4.0009 10.3346 5.04756 10.3346 6.33423C10.3346 7.62089 9.28797 8.66756 8.0013 8.66756ZM8.0013 5.33423C7.44997 5.33423 7.0013 5.7829 7.0013 6.33423C7.0013 6.88556 7.44997 7.33423 8.0013 7.33423C8.55264 7.33423 9.0013 6.88556 9.0013 6.33423C9.0013 5.7829 8.55264 5.33423 8.0013 5.33423Z" fill="white"></path>
</mask>
<g data-v-562b0aec="" mask="url(#mask0_167_7533)">
</g>
</svg>
</div>
<p class="footerforcontact" data-v-562b0aec=""> ფილიალები </p>
</a>
</div>
<p data-v-562b0aec="" class="footer_heading"> სოციალური ქსელები </p>
<div data-v-562b0aec="" class="footer_social-list">
<a data-v-562b0aec="" href="https://www.facebook.com/tbcconcept" target="_self" class="footer_social-link w-inline-block">
<div data-v-562b0aec="" class="icon w-embed">
<svg width="17" height="16" viewBox="0 0 17 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">                         
<g clip-path="url(#clip0_167_7547)">                           
<path d="M9.83464 9.00163H11.5013L12.168 6.33496H9.83464V5.00163C9.83464 4.31496 9.83464 3.66829 11.168 3.66829H12.168V1.42829C11.9506 1.39963 11.13 1.33496 10.2633 1.33496C8.4533 1.33496 7.16797 2.43963 7.16797 4.46829V6.33496H5.16797V9.00163H7.16797V14.6683H9.83464V9.00163Z"></path>                         
</g>                         
<defs>                           
<clipPath id="clip0_167_7547">                             
<rect width="16" height="16" fill="white" transform="translate(0.5 0.000976562)"></rect>                           
</clipPath>                         
</defs>                       
</svg>
</div>
</a>
<a data-v-562b0aec="" href="https://www.instagram.com/tbc_concept/" target="_self" class="footer_social-link w-inline-block">
<div data-v-562b0aec="" class="icon w-embed">
<svg width="17" height="16" viewBox="0 0 17 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi bi-instagram">   
<path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"></path> 
</svg>
</div>
</a>
</div>
</div>
</div>
</div>
<div data-v-562b0aec="" class="header_menu-mobile-bottom">
<div data-v-562b0aec="" class="padding-global">
<div data-v-562b0aec="" class="container">
<div data-v-562b0aec="" class="footer_bottom-inner">
<div data-v-562b0aec="" class="footer_bottom-logo-wrapper">
<div data-v-562b0aec="" class="footer_bottom-logo w-embed">
<svg data-v-562b0aec="" width="36" height="32" viewBox="0 0 36 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path data-v-562b0aec="" d="M15.8154 18.4806C15.8263 18.5838 15.8325 18.7025 15.8325 18.8227C15.8325 19.8184 15.4065 20.7155 14.7261 21.3474L14.7246 21.349C11.2681 24.5334 7.20468 27.1305 2.73238 28.9447L2.4671 29.0402C2.09727 29.1913 1.66502 29.3099 1.21717 29.3747L1.18752 29.3778C1.1251 29.3916 1.05332 29.3993 0.979974 29.3993C0.438492 29.3993 0 28.9662 0 28.4314C0 28.4114 0 28.3898 0.00156047 28.3697V28.3728C0.0187256 28.154 0.0639792 27.949 0.13264 27.7578L0.127958 27.7748C1.32952 24.3946 5.39922 17.0533 7.15475 14.0277C9.33784 10.2375 15.0632 1.11901 15.9168 0.118682C15.973 0.0462399 16.0588 0 16.1571 0C16.2055 0 16.2523 0.0107893 16.2929 0.0323679L16.2913 0.0308266C16.4333 0.0986452 16.5503 0.186501 16.4068 0.692058C15.6577 3.39401 14.5717 9.27881 15.6952 17.3246C15.7529 17.7407 15.8169 18.1214 15.8169 18.4806H15.8154Z"></path>
<path data-v-562b0aec="" d="M17.2182 22.3447C17.78 21.9501 18.4807 21.7143 19.2375 21.7143C19.6104 21.7143 19.9693 21.7713 20.3064 21.8776L20.2814 21.8715C25.2172 23.3851 29.5022 25.6493 33.2443 28.5639L33.16 28.5007C33.5126 28.7751 33.8216 29.0787 34.09 29.4163L34.0994 29.4271C34.257 29.5997 34.3537 29.8278 34.3537 30.0791C34.3537 30.4552 34.1368 30.7819 33.8201 30.9438L33.8138 30.9468C33.6437 31.0285 33.4455 31.0948 33.238 31.1318L33.224 31.1333C29.6661 31.7992 21.1771 31.9718 17.6567 31.998C13.2437 32.0289 2.39535 31.6913 1.08143 31.4771C0.939428 31.457 0.828635 31.343 0.817711 31.2027V31.2012C0.817711 31.0455 0.817711 30.9037 1.34515 30.7742C4.09157 30.0606 9.77948 28.0461 16.2851 23.0676C16.6175 22.787 16.9171 22.5466 17.2182 22.3431V22.3447Z"></path>
<path data-v-562b0aec="" d="M19.9178 19.2296C18.9394 18.7734 18.22 17.9134 17.9719 16.873L17.9672 16.8498C17.3212 14.1987 16.9514 11.1562 16.9514 8.02726C16.9514 6.0821 17.0949 4.17085 17.3711 2.30275L17.3446 2.51546C17.4117 2.04381 17.5319 1.61686 17.7004 1.21612L17.6879 1.25002C17.819 0.853902 18.1904 0.571839 18.6273 0.571839C18.827 0.571839 19.0127 0.630409 19.1672 0.730596L19.1641 0.729055C19.3373 0.85082 19.4871 0.986457 19.6198 1.13751L19.6229 1.14059C21.9854 3.85333 26.3813 11.0344 28.1633 14.023C30.3932 17.7823 35.5443 27.2338 35.9766 28.473C35.9906 28.5069 36 28.547 36 28.5886C36 28.6919 35.9469 28.7828 35.8674 28.8383H35.8658C35.7347 28.9262 35.6021 28.9786 35.2338 28.6086C33.2146 26.6188 28.6174 22.7454 21.0055 19.6828C20.6044 19.5271 20.2471 19.3853 19.9194 19.2296H19.9178Z"></path>
</svg>
</div>
<p data-v-562b0aec="">2024 ყველა უფლება დაცულია</p>
</div>
<div data-v-562b0aec="" class="footer_bottom-links">
<a data-v-562b0aec="" href="/ge/privacy-policy" class="footer_bottom-link">კონფიდენციალურობა</a>
<a data-v-562b0aec="" href="/ge/terms" class="footer_bottom-link">წესები და პირობები</a>
</div>
</div>
</div>
</div>
</div>
</div>
      `;
      header.appendChild(mobileMenu);
      setTimeout(() => {
        mobileMenu.classList.add('active');
        menuToggle.classList.add('active');
      }, 10);
    } else {
      // If the mobile menu exists, remove it
      closeMobileMenu();
    }
  });
});

//header mobile menu dropdown functionalities


document.addEventListener('DOMContentLoaded', function() {
  let currentlyOpenDropdown = null;

  function initDropdowns() {
    const headerDropdowns = document.querySelectorAll('.header_mobile-dropdown');
    const mobileMenuToggle = document.querySelector("#mobileMenuToggle");

    headerDropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector('.header_mobile-dropdown-toggle');
      const arrow = dropdown.querySelector('.header_mobile-dropdown-arr');
      const content = dropdown.querySelector('.thisoneplease');
      const actualcontent = dropdown.querySelector('.header_mobile-dropdown-list');

      if (toggle && content && !toggle.hasListener) {
        toggle.hasListener = true;
        toggle.addEventListener('click', function() {
          const isExpanded = content.getAttribute('aria-expanded') === 'true';

          if (!isExpanded && mobileMenuToggle.classList.contains("active")) {
            if (currentlyOpenDropdown && currentlyOpenDropdown !== content) {
              closeDropdown(currentlyOpenDropdown, currentlyOpenDropdown.previousElementSibling.querySelector('.header_mobile-dropdown-arr'));
            }
            openDropdown(content, arrow, actualcontent);
            currentlyOpenDropdown = content;
          } else {
            closeDropdown(content, arrow);
            if (currentlyOpenDropdown === content) {
              currentlyOpenDropdown = null;
            }
          }
        });
      }
    });
  }

  function openDropdown(content, arrow, actualcontent) {
    cancelPendingAnimations(content);
    setTransition(content);

    content.setAttribute('aria-expanded', 'true');
    content.removeAttribute('aria-hidden');
    content.removeAttribute('hidden');
    arrow.classList.add('active');
    content.style.height = `${actualcontent.offsetHeight}px`;
    content.addEventListener('transitionend', function onTransitionEnd() {
      content.removeEventListener('transitionend', onTransitionEnd);
    });
  }

  function closeDropdown(content, arrow) {
    cancelPendingAnimations(content);
    setTransition(content);
    content.style.height = '0px';
    arrow.classList.remove('active');

    content.addEventListener('transitionend', function onTransitionEnd() {
      content.removeEventListener('transitionend', onTransitionEnd);
      content.setAttribute('aria-hidden', 'true');
      content.setAttribute('hidden', '');
      content.removeAttribute('aria-expanded');
    });
  }

  function setTransition(element) {
    element.style.overflow = 'hidden';
    element.style.transitionProperty = 'height';
    element.style.transitionDuration = '1000ms';
  }

 

  function cancelPendingAnimations(element) {
    element.removeEventListener('transitionend', element.onTransitionEnd);
  }

  initDropdowns();

  const observer = new MutationObserver((mutations) => {
    if (mutations.some(mutation => mutation.type === 'childList')) {
      initDropdowns();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});







//some black button implementation

const menu = document.querySelector('.button-menu');
const buttonContent = `<div data-v-42e74cda="" class="buttons">
<span data-v-42e74cda="" class="button-menu_button w-inline-block">
<div data-v-42e74cda="" class="icon w-embed">
<svg data-v-42e74cda="" width="28" height="28" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path data-v-42e74cda="" d="M21.0007 4.66675H7.00065C4.42232 4.66675 2.33398 6.75508 2.33398 9.33342V18.6784C2.33398 21.2568 4.42232 23.3451 7.00065 23.3451H21.0007C23.579 23.3451 25.6673 21.2568 25.6673 18.6784V9.33342C25.6673 6.75508 23.579 4.66675 21.0007 4.66675ZM21.0007 7.00008C21.1407 7.00008 21.269 7.02342 21.409 7.03508L14.0007 11.4801L6.56898 7.04675C6.70898 7.02341 6.86065 7.00008 7.01232 7.00008H21.0123H21.0007ZM23.334 18.6784C23.334 19.9618 22.284 21.0117 21.0007 21.0117H7.00065C5.71732 21.0117 4.66732 19.9618 4.66732 18.6784V9.33342C4.66732 9.11175 4.71398 8.90175 4.77232 8.69175L13.4057 13.8484C13.5923 13.9534 13.7907 14.0117 14.0007 14.0117C14.2107 14.0117 14.4207 13.9534 14.5957 13.8484L23.2173 8.66841C23.2756 8.87842 23.3223 9.10008 23.3223 9.33342V18.6784H23.334Z"></path>
</svg>
</div>
<div data-v-42e74cda="" class="button-menu_tooltip">
<div data-v-42e74cda="">მოგვწერეთ</div>
<div data-v-42e74cda="" class="button-menu_tooltip-arrow w-embed">
<svg data-v-42e74cda="" width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path data-v-42e74cda="" d="M6.87662 14.8284L1.12339 20.8284C0.404095 21.5786 7.66111e-07 22.596 8.12483e-07 23.6569L2.04844e-07 0.343145C2.51216e-07 1.40401 0.404094 2.42143 1.12339 3.17157L6.87661 9.17157C8.37446 10.7337 8.37446 13.2663 6.87662 14.8284Z" fill="#424A4D"></path>
</svg>
</div>
</div>
</span>
<a data-v-42e74cda="" href="tel:+995 32 2 27 27 00" class="button-menu_button">
<div data-v-42e74cda="" class="icon w-embed">
<svg data-v-42e74cda="" width="28" height="28" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path data-v-42e74cda="" d="M14.0007 25.6666C7.58398 25.6666 2.33398 20.4166 2.33398 13.9999C2.33398 7.58325 7.58398 2.33325 14.0007 2.33325C20.4173 2.33325 25.6673 7.58325 25.6673 13.9999C25.6673 15.8666 25.3173 17.6166 24.5007 19.1333C24.2673 19.7166 23.5673 19.9499 22.984 19.7166C22.4007 19.4833 22.1673 18.7833 22.4007 18.1999C23.1007 16.9166 23.334 15.5166 23.334 13.9999C23.334 8.86658 19.134 4.66659 14.0007 4.66659C8.86732 4.66659 4.66732 8.86658 4.66732 13.9999C4.66732 18.7833 8.28398 22.6333 12.834 23.2166V22.1666C12.834 21.4666 13.3007 20.9999 14.0007 20.9999C14.7007 20.9999 15.1673 21.4666 15.1673 22.1666V24.4999C15.1673 25.1999 14.7007 25.6666 14.0007 25.6666ZM9.33398 18.6666C8.98398 18.6666 8.63398 18.5499 8.40065 18.1999C7.46732 16.9166 7.00065 15.5166 7.00065 13.9999C7.00065 12.4833 7.46732 10.9666 8.40065 9.79992C8.75065 9.33325 9.56732 9.21658 10.034 9.56658C10.5007 9.91658 10.6173 10.7333 10.2673 11.1999C9.68398 12.0166 9.33398 12.9499 9.33398 13.9999C9.33398 15.0499 9.68398 15.9833 10.2673 16.7999C10.6173 17.2666 10.5007 18.0833 10.034 18.4333C9.80065 18.5499 9.56732 18.6666 9.33398 18.6666ZM18.6673 18.6666C18.434 18.6666 18.2007 18.5499 17.9673 18.4333C17.5007 18.0833 17.384 17.2666 17.734 16.7999C18.3173 15.9833 18.6673 15.0499 18.6673 13.9999C18.6673 12.9499 18.3173 12.0166 17.734 11.1999C17.384 10.7333 17.5007 9.91658 17.9673 9.56658C18.434 9.21658 19.2506 9.33325 19.6006 9.79992C20.534 10.9666 21.0007 12.4833 21.0007 13.9999C21.0007 15.5166 20.534 17.0333 19.6006 18.1999C19.3673 18.4333 19.0173 18.6666 18.6673 18.6666Z"></path>
</svg>
</div>
<div data-v-42e74cda="" class="button-menu_tooltip">
<div data-v-42e74cda="">ქოლ ცენტრი</div>
<div data-v-42e74cda="" class="button-menu_tooltip-arrow w-embed">
<svg data-v-42e74cda="" width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path data-v-42e74cda="" d="M6.87662 14.8284L1.12339 20.8284C0.404095 21.5786 7.66111e-07 22.596 8.12483e-07 23.6569L2.04844e-07 0.343145C2.51216e-07 1.40401 0.404094 2.42143 1.12339 3.17157L6.87661 9.17157C8.37446 10.7337 8.37446 13.2663 6.87662 14.8284Z" fill="#424A4D"></path>
</svg>
</div>
</div>
</a>
<a data-v-42e74cda="" href="/ge/concept-space/concept-branches" class="button-menu_button">
<div data-v-42e74cda="" class="icon w-embed">
<svg data-v-42e74cda="" width="28" height="28" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path data-v-42e74cda="" d="M14 2.33334C9.49665 2.33334 5.83331 5.99668 5.83331 10.5C5.83331 17.115 11.9466 24.5117 12.2033 24.8267C12.6466 25.3633 13.3 25.6667 14 25.6667C14.6883 25.6667 15.3533 25.3517 15.7966 24.8267C16.0533 24.5117 22.1666 17.08 22.1666 10.5C22.1666 5.99668 18.5033 2.33334 14 2.33334ZM14 23.3333C14 23.3333 8.16665 16.345 8.16665 10.5C8.16665 7.28001 10.78 4.66668 14 4.66668C17.22 4.66668 19.8333 7.28001 19.8333 10.5C19.8333 16.31 14 23.3333 14 23.3333ZM14 7.00001C12.075 7.00001 10.5 8.57501 10.5 10.5C10.5 12.425 12.075 14 14 14C15.925 14 17.5 12.425 17.5 10.5C17.5 8.57501 15.925 7.00001 14 7.00001ZM14 11.6667C13.3583 11.6667 12.8333 11.1417 12.8333 10.5C12.8333 9.85834 13.3583 9.33334 14 9.33334C14.6416 9.33334 15.1666 9.85834 15.1666 10.5C15.1666 11.1417 14.6416 11.6667 14 11.6667Z"></path>
</svg>
</div>
<div data-v-42e74cda="" class="button-menu_tooltip">
<div data-v-42e74cda="">მისამართი</div>
<div data-v-42e74cda="" class="button-menu_tooltip-arrow w-embed">
<svg data-v-42e74cda="" width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path data-v-42e74cda="" d="M6.87662 14.8284L1.12339 20.8284C0.404095 21.5786 7.66111e-07 22.596 8.12483e-07 23.6569L2.04844e-07 0.343145C2.51216e-07 1.40401 0.404094 2.42143 1.12339 3.17157L6.87661 9.17157C8.37446 10.7337 8.37446 13.2663 6.87662 14.8284Z" fill="#424A4D"></path>
</svg>
</div>
</div>
</a>
</div>`;


function toggleMenu() {
  const iconDiv = menu.querySelector('.icon.w-embed');
  const svg = iconDiv.querySelector('svg');
  const existingButtons = menu.querySelector('.buttons');

  if (existingButtons) {
      // Close the menu
      iconDiv.classList.remove('is-absolute');
      existingButtons.classList.add('fade-leave-active');
      existingButtons.classList.remove('fade-enter-to');

      setTimeout(() => {
        existingButtons.classList.add('fade-leave-to');
      }, 10);
  
      setTimeout(() => {
          existingButtons.remove();
          // Revert SVG to original content
          svg.innerHTML = `<path data-v-42e74cda="" d="M12 8C13.65 8 15 6.65 15 5C15 3.35 13.65 2 12 2C10.35 2 9 3.35 9 5C9 6.65 10.35 8 12 8ZM12 9C10.35 9 9 10.35 9 12C9 13.65 10.35 15 12 15C13.65 15 15 13.65 15 12C15 10.35 13.65 9 12 9ZM12 16C10.35 16 9 17.35 9 19C9 20.65 10.35 22 12 22C13.65 22 15 20.65 15 19C15 17.35 13.65 16 12 16Z"></path>`;
      }, 300); // Adjust timing as needed
  } else {
      // Open the menu
      iconDiv.classList.add('is-absolute');
      const buttonsElement = document.createElement('div');
      buttonsElement.innerHTML = buttonContent;
      const buttons = buttonsElement.firstChild;
      buttons.classList.add('fade-enter')
      buttons.classList.add('fade-enter-active');
      menu.insertBefore(buttons, menu.lastElementChild);

      // Update SVG content
      svg.innerHTML = `
          <path data-v-42e74cda="" d="M13.4141 12L17.7071 7.70701C18.0981 7.31601 18.0981 6.68401 17.7071 6.29301C17.3161 5.90201 16.6841 5.90201 16.2931 6.29301L12.0001 10.586L7.70713 6.29301C7.31613 5.90201 6.68413 5.90201 6.29313 6.29301C5.90213 6.68401 5.90213 7.31601 6.29313 7.70701L10.5861 12L6.29313 16.293C5.90213 16.684 5.90213 17.316 6.29313 17.707C6.48813 17.902 6.74413 18 7.00013 18C7.25613 18 7.51213 17.902 7.70713 17.707L12.0001 13.414L16.2931 17.707C16.4881 17.902 16.7441 18 17.0001 18C17.2561 18 17.5121 17.902 17.7071 17.707C18.0981 17.316 18.0981 16.684 17.7071 16.293L13.4141 12Z"></path>
          <mask data-v-42e74cda="" id="mask0_907_111854" maskUnits="userSpaceOnUse" x="5" y="5" width="14" height="13" style="mask-type: luminance;">
              <path data-v-42e74cda="" d="M13.4141 12L17.7071 7.70701C18.0981 7.31601 18.0981 6.68401 17.7071 6.29301C17.3161 5.90201 16.6841 5.90201 16.2931 6.29301L12.0001 10.586L7.70713 6.29301C7.31613 5.90201 6.68413 5.90201 6.29313 6.29301C5.90213 6.68401 5.90213 7.31601 6.29313 7.70701L10.5861 12L6.29313 16.293C5.90213 16.684 5.90213 17.316 6.29313 17.707C6.48813 17.902 6.74413 18 7.00013 18C7.25613 18 7.51213 17.902 7.70713 17.707L12.0001 13.414L16.2931 17.707C16.4881 17.902 16.7441 18 17.0001 18C17.2561 18 17.5121 17.902 17.7071 17.707C18.0981 17.316 18.0981 16.684 17.7071 16.293L13.4141 12Z"></path>
          </mask>
          <g data-v-42e74cda="" mask="url(#mask0_907_111854)"></g>
      `;

      setTimeout(() => {
        buttons.classList.remove('fade-enter');
        buttons.classList.add('fade-enter-to');
      }, 10);
  }
}

// Use event delegation on the parent element
menu.addEventListener('click', (event) => {
  if (event.target.closest('.button-menu_trigger')) {
      toggleMenu();
  }
});
