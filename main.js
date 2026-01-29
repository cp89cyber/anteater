const funFacts = [
  "Anteaters can eat thousands of insects in a day.",
  "Some anteaters curl their tails like blankets.",
  "They close their nostrils to keep dust out.",
  "Their tongues can be longer than their heads.",
  "They rely on smell more than sight.",
  "Strong claws help open termite mounds.",
  "They visit hundreds of nests each day.",
  "Tree anteaters can sleep in leafy nests."
];

document.body.classList.add("js");

const factText = document.querySelector("[data-fact-text]");
const factButton = document.querySelector("[data-fact-button]");

if (factText && factButton) {
  let lastIndex = -1;
  const currentFact = factText.textContent.trim();
  const currentIndex = funFacts.indexOf(currentFact);
  if (currentIndex >= 0) {
    lastIndex = currentIndex;
  }

  const pickFact = () => {
    let index = Math.floor(Math.random() * funFacts.length);
    if (funFacts.length > 1 && index === lastIndex) {
      index = (index + 1) % funFacts.length;
    }
    lastIndex = index;
    factText.textContent = funFacts[index];
  };

  factButton.addEventListener("click", pickFact);
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
