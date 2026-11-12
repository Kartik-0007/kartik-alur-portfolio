(function ($) {
  "use strict";

  const root = document.documentElement;
  const savedTheme = localStorage.getItem("kartik-portfolio-theme");
  root.setAttribute("data-theme", savedTheme || "dark");

  $(function () {
    const $themeToggle = $("#themeToggle");
    const $menuToggle = $("#menuToggle");
    const $navLinks = $("#navLinks");
    const $backTop = $("#backTop");

    function updateThemeButton() {
      const isLight = root.getAttribute("data-theme") === "light";
      $themeToggle.attr("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
      $themeToggle.text(isLight ? "☾" : "☼");
    }
    updateThemeButton();

    $themeToggle.on("click", function () {
      const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", nextTheme);
      localStorage.setItem("kartik-portfolio-theme", nextTheme);
      updateThemeButton();
    });

    $menuToggle.on("click", function () {
      const isOpen = $navLinks.toggleClass("open").hasClass("open");
      $(this).attr("aria-expanded", String(isOpen));
      $(this).text(isOpen ? "×" : "☰");
    });

    $navLinks.find("a").on("click", function () {
      $navLinks.removeClass("open");
      $menuToggle.attr("aria-expanded", "false").text("☰");
    });

    // Smooth scrolling for in-page links.
    $('a[href^="#"]').on("click", function (event) {
      const target = $(this.getAttribute("href"));
      if (target.length) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: target.offset().top - 82 }, 500);
      }
    });

    // Reveal elements as they enter the viewport.
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealItems.forEach(item => observer.observe(item));
    } else {
      revealItems.forEach(item => item.classList.add("is-visible"));
    }

    // Small typewriter animation on the homepage.
    const typeTarget = document.getElementById("typedRole");
    if (typeTarget) {
      const phrases = ["Aspiring AI Engineer", "Exploring Generative AI", "Interested in Agentic AI"];
      let phraseIndex = 0, charIndex = 0, deleting = false;
      function typeLoop() {
        const phrase = phrases[phraseIndex];
        typeTarget.textContent = phrase.substring(0, charIndex);
        if (!deleting && charIndex < phrase.length) {
          charIndex++;
          setTimeout(typeLoop, 78);
        } else if (!deleting) {
          deleting = true;
          setTimeout(typeLoop, 1350);
        } else if (charIndex > 0) {
          charIndex--;
          setTimeout(typeLoop, 34);
        } else {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeLoop, 350);
        }
      }
      typeLoop();
    }

    // Back-to-top control.
    $(window).on("scroll", function () {
      $backTop.toggleClass("visible", $(window).scrollTop() > 450);
    });
    $backTop.on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 450);
    });

    // Contact form: validates fields and opens the visitor's email app.
    $("#contactForm").on("submit", function (event) {
      event.preventDefault();
      const name = $("#visitorName").val().trim();
      const email = $("#visitorEmail").val().trim();
      const subject = $("#visitorSubject").val().trim();
      const message = $("#visitorMessage").val().trim();
      const status = $("#formStatus");

      if (!name || !email || !subject || !message) {
        status.text("Please complete all fields before continuing.");
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.text("Please enter a valid email address.");
        return;
      }
      const mailSubject = encodeURIComponent(subject);
      const mailBody = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\n\n" + message
      );
      status.text("Opening your email application. Review the message and press Send there.");
      window.location.href = "mailto:kartikalur595@gmail.com?subject=" + mailSubject + "&body=" + mailBody;
    });

    const year = new Date().getFullYear();
    $(".current-year").text(year);
  });
})(window.jQuery);
