
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// Close sidebar on link click
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });
});

// Handle active nav link switching
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(navLink => {
      navLink.classList.remove('active');
    });
    
    // Add active class to clicked link
    link.classList.add('active');
    
    // Get the target section
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    // Smooth scroll to target section
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Handle sidebar nav link switching
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(navLink => {
      navLink.classList.remove('active');
    });
    
    // Add active class to corresponding desktop nav link
    const targetId = link.getAttribute('href');
    const correspondingNavLink = document.querySelector(`.nav-link[href="${targetId}"]`);
    if (correspondingNavLink) {
      correspondingNavLink.classList.add('active');
    }
    
    // Get the target section
    const targetSection = document.querySelector(targetId);
    
    // Smooth scroll to target section
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Logo name animation with random numbers
document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector('.logo');
    const originalName = 'KAVIN';
    const numbers = '0123456789';
    
    if (logo) {
        // Lock scroll during animation
        document.body.style.overflow = 'hidden';
        
        // Scroll to about section
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Start with random numbers
        let currentText = '';
        for (let i = 0; i < originalName.length; i++) {
            currentText += numbers[Math.floor(Math.random() * numbers.length)];
        }
        logo.textContent = currentText;
        
        // Animate to actual name
        let charIndex = 0;
        const animateToName = () => {
            if (charIndex < originalName.length) {
                // Randomize remaining characters
                let newText = '';
                for (let i = 0; i < originalName.length; i++) {
                    if (i < charIndex) {
                        newText += originalName[i];
                    } else {
                        newText += numbers[Math.floor(Math.random() * numbers.length)];
                    }
                }
                logo.textContent = newText;
                charIndex++;
                setTimeout(animateToName, 100);
            } else {
                logo.textContent = originalName;
                // Re-enable scroll after animation completes
                setTimeout(() => {
                    document.body.style.overflow = 'auto';
                }, 500);
            }
        };
        
        // Start animation after a short delay
        setTimeout(animateToName, 500);
    }
});

// Experience counter with hover effect
document.addEventListener("DOMContentLoaded", () => {
    const experienceStat = document.getElementById("experienceStat");
    
    if (experienceStat) {
        // Start date: July 19, 2023
        const startDate = new Date('2023-07-19');
        const currentDate = new Date();
        
        // Calculate years and months
        const years = currentDate.getFullYear() - startDate.getFullYear();
        const months = currentDate.getMonth() - startDate.getMonth();
        const totalMonths = years * 12 + months;
        const displayYears = Math.floor(totalMonths / 12);
        const displayMonths = totalMonths % 12;
        
        // Calculate total days
        const timeDiff = currentDate.getTime() - startDate.getTime();
        const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        // Set default display
        let displayText = `${displayYears} year${displayYears !== 1 ? 's' : ''} ${displayMonths} month${displayMonths !== 1 ? 's' : ''}`;
        experienceStat.textContent = displayText;
        
        // Hover effect - animate days counter with blue effect
        let animationInterval;
        let currentDays = 0;
        
        experienceStat.addEventListener('mouseenter', () => {
            currentDays = 0;
            experienceStat.classList.add('experience-animating');
            const increment = Math.ceil(totalDays / 100); // Animate over ~100 steps
            
            animationInterval = setInterval(() => {
                if (currentDays < totalDays) {
                    currentDays += increment;
                    if (currentDays > totalDays) currentDays = totalDays;
                    experienceStat.textContent = `${currentDays} days`;
                } else {
                    clearInterval(animationInterval);
                }
            }, 20);
        });
        
        experienceStat.addEventListener('mouseleave', () => {
            clearInterval(animationInterval);
            experienceStat.classList.remove('experience-animating');
            experienceStat.textContent = displayText;
        });
    }
});
  

// Accessibility & keyboard interactions for flipping cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.exp-card');
  
    // Allow Enter/Space to toggle flip for keyboard users
    cards.forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          card.classList.toggle('flip');
        }
        // Escape removes flip (helpful if user toggled)
        if (e.key === 'Escape') {
          card.classList.remove('flip');
          card.blur();
        }
      });
  
      // also remove .flip when focus lost (optional)
      card.addEventListener('focusout', () => {
        card.classList.remove('flip');
      });
  
      // For touch users: flip on tap (toggle)
      card.addEventListener('click', (e) => {
        // If click target is a link later, you may want to guard
        card.classList.toggle('flip');
      });
    });
  
    // Improve focus order: when user tabs into section, focus first card
    const section = document.getElementById('experience');
    if (section) {
      section.addEventListener('keydown', (e) => {
        // Pressing 'Home' focuses the first card, 'End' focuses the last
        if (e.key === 'Home') {
          e.preventDefault();
          cards[cards.length - 1].focus(); // since layout is row-reverse, last is left-most
        }
        if (e.key === 'End') {
          e.preventDefault();
          cards[0].focus();
        }
      });
    }
  });

  // Skills: canvas matrix + accordion + visibility control
document.addEventListener('DOMContentLoaded', function () {
    // ---------- Canvas Matrix ----------
    const canvas = document.getElementById('skillsMatrix');
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    let rafId = null;
    let columns = [];
    let width = 0;
    let height = 0;
    let fontSize = 14;
    const chars = '01'; // binary style; could mix in letters if desired
  
    function resizeCanvas() {
      if (!canvas) return;
      // size to section height (content-driven)
      const section = document.querySelector('.skills-section');
      width = section.clientWidth;
      height = Math.max(section.clientHeight, window.innerHeight);
      const DPR = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  
      // adjust fontSize by width
      fontSize = Math.max(12, Math.floor(width / 120));
      ctx.font = `${fontSize}px monospace`;
  
      // columns based on char width
      const cols = Math.floor(width / fontSize);
      columns = new Array(cols).fill(0).map(() => Math.floor(Math.random() * height));
    }
  
    function drawMatrix() {
      if (!ctx) return;
      // semi-clear (slight trail)
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, width, height);
  
      ctx.fillStyle = '#00ff66'; // neon green
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00ff66';
  
      for (let i = 0; i < columns.length; i++) {
        const x = i * fontSize;
        const y = columns[i] * fontSize;
  
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, x, y);
  
        if (y > height && Math.random() > 0.975) {
          columns[i] = 0;
        } else {
          columns[i]++;
        }
      }
      rafId = requestAnimationFrame(drawMatrix);
    }
  
    // Start / Stop matrix
    function startMatrix() {
      if (!ctx) return;
      cancelAnimationFrame(rafId);
      resizeCanvas();
      drawMatrix();
      // listen for resize
      window.addEventListener('resize', resizeCanvas);
      window.addEventListener('orientationchange', resizeCanvas);
    }
    function stopMatrix() {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
      // clear canvas
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
    // ---------- Intersection Observer : start/stop when visible ----------
    const section = document.querySelector('.skills-section');
    if (section && canvas && ctx && !prefersReduced) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startMatrix();
          } else {
            stopMatrix();
          }
        });
      }, { threshold: 0.2 });
      io.observe(section);
    } else {
      // if reduced motion or canvas not supported, hide canvas
      if (canvas) canvas.style.display = 'none';
    }
  
    // ---------- Accordion for mobile/tab ----------
    const toggles = Array.from(document.querySelectorAll('.cat-toggle'));
    const bodies = Array.from(document.querySelectorAll('.cat-body'));
  
    function closeAllExcept(indexToKeep) {
      bodies.forEach((b, i) => {
        if (i !== indexToKeep) {
          b.classList.remove('open');
          b.style.maxHeight = null;
          toggles[i].setAttribute('aria-expanded', 'false');
        }
      });
    }
  
    function openBody(idx) {
      const b = bodies[idx];
      if (!b) return;
      b.classList.add('open');
      // set maxHeight to enable smooth expanding
      b.style.maxHeight = b.scrollHeight + 'px';
      toggles[idx].setAttribute('aria-expanded', 'true');
    }
  
    function toggleHandler(i) {
      return (e) => {
        // On desktop, headings not collapsible; respect CSS but guard here
        if (window.innerWidth >= 1200) return;
        const b = bodies[i];
        const expanded = toggles[i].getAttribute('aria-expanded') === 'true';
        if (expanded) {
          b.classList.remove('open');
          b.style.maxHeight = null;
          toggles[i].setAttribute('aria-expanded', 'false');
        } else {
          closeAllExcept(i);
          openBody(i);
        }
      };
    }
  
    // Attach listeners
    toggles.forEach((t, idx) => {
      t.addEventListener('click', toggleHandler(idx));
      // keyboard (Enter/Space)
      t.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleHandler(idx)();
        }
      });
    });
  
    // Ensure initial state: mobile -> all collapsed; desktop -> all open
    function setInitialAccordionState() {
      if (window.innerWidth >= 1200) {
        // open all
        bodies.forEach(b => {
          b.classList.add('open');
          b.style.maxHeight = b.scrollHeight + 'px';
        });
        toggles.forEach(t => t.setAttribute('aria-expanded', 'true'));
      } else {
        // collapse all
        bodies.forEach(b => {
          b.classList.remove('open');
          b.style.maxHeight = null;
        });
        toggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
      }
    }
  
    setInitialAccordionState();
    window.addEventListener('resize', () => {
      setInitialAccordionState();
      // adjust canvas too
      if (canvas && ctx && !prefersReduced) resizeCanvas();
    });
  
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      stopMatrix();
    });
  
  });
  
  // Accordion Toggle - Close others when one is opened
document.querySelectorAll(".feature-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const content = button.nextElementSibling;
    
    // Close all other features first
    document.querySelectorAll(".feature-toggle").forEach(btn => {
      if (btn !== button) {
        btn.setAttribute("aria-expanded", "false");
        btn.nextElementSibling.hidden = true;
      }
    });
    
    // Toggle the clicked feature
    if (expanded) {
      button.setAttribute("aria-expanded", "false");
      content.hidden = true;
    } else {
      button.setAttribute("aria-expanded", "true");
      content.hidden = false;
    }
  });
});

// Scroll Animation (Fade-in one by one)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 200); // stagger animation
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".feature-item").forEach(item => {
  observer.observe(item);
});

  
document.addEventListener("DOMContentLoaded", () => {
  const dataElems = document.querySelectorAll("#achievementsData .achievement-data");
  const imgElem = document.getElementById("achvImg");
  const textElem = document.getElementById("achvNews");
  const prevBtn = document.querySelector(".achv-prev");
  const nextBtn = document.querySelector(".achv-next");

  let currentIndex = 0;
  let typingTimeout;

  function showAchievement(index) {
    const { img, text } = dataElems[index].dataset;
    imgElem.src = img;
    typeText(text);
  }

  function typeText(text) {
    clearTimeout(typingTimeout);
    textElem.textContent = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        textElem.textContent += text.charAt(i);
        i++;
        typingTimeout = setTimeout(type, 40);
      }
    }
    type();
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + dataElems.length) % dataElems.length;
    showAchievement(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % dataElems.length;
    showAchievement(currentIndex);
  });

  // Initial load
  showAchievement(currentIndex);

  /* === Binary Stream Effect === */
  const canvas = document.getElementById("achievementsStream");
  const ctx = canvas.getContext("2d");
  let width, height, columns, drops;
  const fontSize = 16;
  const chars = "01";

  function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#00ff66";
    ctx.font = `${fontSize}px Courier New`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  initCanvas();
  setInterval(draw, 50);
  window.addEventListener("resize", initCanvas);
});
