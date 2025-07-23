document.addEventListener('DOMContentLoaded', function() {
  // Animate elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.benefits, .index, .author, .testimonials, .faq, .price-container').forEach(el => {
    observer.observe(el);
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = question.classList.contains('active');
      
      // Close all other questions
      document.querySelectorAll('.faq-question').forEach(q => {
        if (q !== question) {
          q.classList.remove('active');
          q.nextElementSibling.classList.remove('show');
        }
      });
      
      // Toggle current question
      if (isOpen) {
        question.classList.remove('active');
        answer.classList.remove('show');
      } else {
        question.classList.add('active');
        answer.classList.add('show');
      }
    });
  });

  // Fixed CTA on scroll
  const showFixedCTA = () => {
    const scrollPosition = window.scrollY;
    const fixedCTA = document.querySelector('.fixed-cta');
    
    if (scrollPosition > 700) {
      fixedCTA.classList.add('show');
    } else {
      fixedCTA.classList.remove('show');
    }
  };
  
  window.addEventListener('scroll', showFixedCTA);

  // Countdown timer
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 3); // 3 days from now
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate.getTime() - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
    document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
  }
  
  if (document.getElementById('countdown-days')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Track link clicks (for analytics)
  document.querySelectorAll('a[href^="https"]').forEach(link => {
    link.addEventListener('click', function(e) {
      // You can add actual analytics tracking here
      console.log('Link clicked:', link.href);
      
      // If it's a CTA button, you could track it specifically
      if (link.classList.contains('cta-btn')) {
        console.log('CTA button clicked');
      }
    });
  });
});