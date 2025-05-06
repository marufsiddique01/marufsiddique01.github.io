document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: false,
    mirror: true,
    offset: 100,
    easing: "ease-out-cubic",
  });

  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section");
  const backToTopBtn = document.getElementById("back-to-top");
  const contactForm = document.getElementById("contact-form");
  const currentYearElement = document.getElementById("current-year");

  // Update footer year automatically
  function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    if (currentYearElement) {
      currentYearElement.textContent = currentYear;
    }
  }

  // Call once when the page loads
  updateFooterYear();

  // Toggle navigation
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    // Burger animation
    burger.classList.toggle("toggle");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("nav-active")) {
        nav.classList.remove("nav-active");
        burger.classList.remove("toggle");

        navLinks.forEach((link) => {
          link.style.animation = "";
        });
      }
    });
  });

  // Theme toggle functionality
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save preference to localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    // Add or remove 'scrolled' class based on scroll position
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
      backToTopBtn.classList.add("show");
    } else {
      navbar.classList.remove("scrolled");
      backToTopBtn.classList.remove("show");
    }

    // Update active link based on scroll position
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.querySelector("a").getAttribute("href").substring(1);
      if (href === current) {
        link.querySelector("a").classList.add("active");
      }
    });
  });

  // Mouse movement effect for hero section
  const hero = document.querySelector(".hero");
  hero.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    hero.style.setProperty("--x", x * 100 + "%");
    hero.style.setProperty("--y", y * 100 + "%");
  });

  // Back to top functionality
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Contact form handling
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Create form status elements if they don't exist
      let formStatus = document.querySelector(".form-status");
      if (!formStatus) {
        formStatus = document.createElement("div");
        formStatus.className = "form-status";
        contactForm.insertAdjacentElement("afterend", formStatus);
      }

      // Simple validation
      if (!formData.name || !formData.email || !formData.message) {
        formStatus.className = "form-status form-error";
        formStatus.style.display = "block";
        formStatus.textContent = "Please fill out all required fields.";
        return;
      }

      // In a real implementation, you would send the form data to a server
      // For this demo, we'll simulate a successful submission
      formStatus.className = "form-status form-success";
      formStatus.style.display = "block";
      formStatus.textContent =
        "Thank you! Your message has been sent successfully.";

      // Clear form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
    });
  }
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
