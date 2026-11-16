const particleBox = document.getElementById("particles");

// GOLD PARTICLES
for (let i = 0; i < 65; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";

  const size = Math.random() * 3 + 1;
  particle.style.width = size + "px";
  particle.style.height = size + "px";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = (9 + Math.random() * 14) + "s";
  particle.style.animationDelay = (Math.random() * 15) + "s";

  particleBox.appendChild(particle);
}

// REVEAL
const revealTargets = document.querySelectorAll(
  ".scene-content, .photo-one, .about-image, .impact-photo, .floating-word, .data-card, .guideline-card"
);

revealTargets.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 120 + "ms";
  revealObserver.observe(el);
});

// SCROLL PROGRESS
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.getElementById("progress").style.width =
    (max > 0 ? scrollY / max * 100 : 0) + "%";
});

// ACTIVE NAV
const sections = document.querySelectorAll(".scene");
const links = document.querySelectorAll("nav a");

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.55 });

sections.forEach(section => navObserver.observe(section));

// 3D MOUSE DEPTH
document.querySelectorAll("[data-depth]").forEach(element => {
  element.addEventListener("mousemove", event => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.transform =
      `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.04)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "";
  });
});

// CINEMATIC PARALLAX
window.addEventListener("scroll", () => {
  const y = scrollY;
  document.querySelectorAll("[data-depth]").forEach(element => {
    const speed = Number(element.dataset.depth);
    const rect = element.parentElement.getBoundingClientRect();

    if (rect.bottom > 0 && rect.top < innerHeight) {
      element.style.setProperty("--scroll-depth", `${y * speed}px`);
    }
  });
});