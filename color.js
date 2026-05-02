const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const heroBg = document.getElementById("heroBg");
const gradientPreview = document.getElementById("gradientPreview");
const colorOne = document.getElementById("colorOne");
const colorTwo = document.getElementById("colorTwo");
const colorThree = document.getElementById("colorThree");
const angleRange = document.getElementById("angleRange");
const angleValue = document.getElementById("angleValue");
const cssCode = document.getElementById("cssCode");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const animateBtn = document.getElementById("animateBtn");
const randomHero = document.getElementById("randomHero");
const paletteGrid = document.getElementById("paletteGrid");

const palettes = [
  { name: "Candy Sky", colors: ["#ff4d6d", "#00d4ff", "#ffe66d"] },
  { name: "Aurora Pop", colors: ["#7c3aed", "#14b8a6", "#f97316"] },
  { name: "Fresh Lime", colors: ["#0f766e", "#84cc16", "#facc15"] },
  { name: "Heat Wave", colors: ["#ef4444", "#f97316", "#f9a8d4"] },
  { name: "Ocean Mint", colors: ["#0369a1", "#06b6d4", "#a7f3d0"] },
  { name: "Night Bloom", colors: ["#111827", "#8b5cf6", "#22d3ee"] }
];

let isAnimating = true;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
}

function getGradient() {
  return `linear-gradient(${angleRange.value}deg, ${colorOne.value}, ${colorTwo.value}, ${colorThree.value})`;
}

function updateGradient() {
  const gradient = getGradient();
  const colors = [colorOne.value, colorTwo.value, colorThree.value];

  document.documentElement.style.setProperty("--color-one", colors[0]);
  document.documentElement.style.setProperty("--color-two", colors[1]);
  document.documentElement.style.setProperty("--color-three", colors[2]);
  heroBg.style.background = gradient;
  gradientPreview.style.background = gradient;
  angleValue.textContent = `${angleRange.value}deg`;
  cssCode.textContent = `background: ${gradient};`;
}

function randomizeGradient() {
  colorOne.value = randomColor();
  colorTwo.value = randomColor();
  colorThree.value = randomColor();
  angleRange.value = Math.floor(Math.random() * 361);
  updateGradient();
}

function applyPalette(colors) {
  [colorOne.value, colorTwo.value, colorThree.value] = colors;
  updateGradient();
  document.getElementById("generator").scrollIntoView({ behavior: "smooth" });
}

function renderPalettes() {
  paletteGrid.innerHTML = "";

  palettes.forEach((palette) => {
    const card = document.createElement("button");
    card.className = "palette-card";
    card.style.background = `linear-gradient(135deg, ${palette.colors.join(", ")})`;
    card.innerHTML = `
      <h3>${palette.name}</h3>
      <div class="swatches">
        ${palette.colors.map((color) => `<span style="background:${color}"></span>`).join("")}
      </div>
    `;
    card.addEventListener("click", () => applyPalette(palette.colors));
    paletteGrid.appendChild(card);
  });
}

function setAnimationState() {
  const playState = isAnimating ? "running" : "paused";
  heroBg.style.animationPlayState = playState;
  gradientPreview.style.animationPlayState = playState;
  animateBtn.textContent = isAnimating ? "Pause Animation" : "Play Animation";
  animateBtn.classList.toggle("is-active", isAnimating);
}

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navLinks.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navLinks.classList.remove("active");
  }
});

[colorOne, colorTwo, colorThree, angleRange].forEach((input) => {
  input.addEventListener("input", updateGradient);
});

generateBtn.addEventListener("click", randomizeGradient);
randomHero.addEventListener("click", randomizeGradient);

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(cssCode.textContent);
  copyBtn.textContent = "Copied";
  setTimeout(() => {
    copyBtn.textContent = "Copy CSS";
  }, 1200);
});

animateBtn.addEventListener("click", () => {
  isAnimating = !isAnimating;
  setAnimationState();
});

renderPalettes();
updateGradient();
setAnimationState();
