// js/script.js
document.addEventListener("DOMContentLoaded", function () {
  // Функция для замены изображений на мобильных устройствах
  function replaceMobileImages() {
    if (window.innerWidth <= 768) {
      const projectImages = document.querySelectorAll(".project-image img");
      projectImages.forEach((img) => {
        // Сохраняем оригинальный src в data-атрибут
        if (!img.dataset.originalSrc) {
          img.dataset.originalSrc = img.src;
        }
        // Заменяем на кита
        img.src = "images/kit.png";
      });
    } else {
      // Восстанавливаем оригинальные изображения на десктопе
      const projectImages = document.querySelectorAll(".project-image img");
      projectImages.forEach((img) => {
        if (img.dataset.originalSrc) {
          img.src = img.dataset.originalSrc;
        }
      });
    }
  }

  // Запускаем при загрузке
  replaceMobileImages();

  // И при изменении размера окна
  window.addEventListener("resize", replaceMobileImages);

  // Остальной существующий код...
  // Бургер-меню - сдвигает контент вниз
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    // Закрытие меню при клике вне его области
    document.addEventListener("click", function (event) {
      const isClickInsideNav =
        navToggle.contains(event.target) || navMenu.contains(event.target);
      if (!isClickInsideNav && navMenu.classList.contains("active")) {
        closeMobileMenu();
      }
    });

    // Закрытие меню при изменении размера окна (если перешли на десктоп)
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });

    function closeMobileMenu() {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  }

  // Обработка формы контактов
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (name && email && message) {
        alert("Сообщение отправлено! Спасибо за ваше сообщение.");
        contactForm.reset();
      } else {
        alert("Пожалуйста, заполните все поля формы.");
      }
    });
  }

  // Плавная прокрутка для якорей
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Анимация появления элементов при скролле
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".card, .project-card, .skill-item"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Установка начальных стилей для анимации
  const cards = document.querySelectorAll(".card, .project-card, .skill-item");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Запуск анимации при загрузке и скролле
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

  // Гарантия отображения текста в прогресс-барах дневника
  function updateProgressBarText() {
    const progressFills = document.querySelectorAll(".progress-fill");

    progressFills.forEach((fill) => {
      const width = fill.style.width;
      if (width && !fill.textContent) {
        fill.textContent = width;
      }
    });
  }

  updateProgressBarText();
  window.addEventListener("resize", updateProgressBarText);
  setTimeout(updateProgressBarText, 100);
});
