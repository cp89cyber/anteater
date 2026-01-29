# Anteater Static Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a five-page, playful static anteater site with shared styling and a small fun-fact interaction.

**Architecture:** Plain HTML pages with shared `styles.css` and `main.js`. A lightweight bash smoke-test script validates required structure and assets. No build tooling.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, bash.

---

### Task 1: Site skeleton + smoke test harness

**Files:**
- Create: `scripts/site-smoke-test.sh`
- Create: `index.html`
- Create: `species.html`
- Create: `habitat.html`
- Create: `diet.html`
- Create: `conservation.html`
- Create: `styles.css`
- Create: `main.js`
- Test: `scripts/site-smoke-test.sh`

**Step 1: Write the failing test**

Create `scripts/site-smoke-test.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

if command -v rg >/dev/null 2>&1; then
  SEARCH="rg -n"
else
  SEARCH="grep -n"
fi

files=(
  index.html
  species.html
  habitat.html
  diet.html
  conservation.html
  styles.css
  main.js
)

for f in "${files[@]}"; do
  if [ ! -f "$f" ]; then
    echo "Missing $f"
    exit 1
  fi
done

require() {
  local file="$1"
  local pattern="$2"
  if ! eval $SEARCH "$pattern" "$file" >/dev/null; then
    echo "Missing pattern '$pattern' in $file"
    exit 1
  fi
}

for page in index.html species.html habitat.html diet.html conservation.html; do
  require "$page" '<link[^>]+href="styles.css"'
  require "$page" '<script[^>]+src="main.js"'
  require "$page" '<nav'
  require "$page" 'id="main-content"'
  require "$page" 'class="site-header"'
  require "$page" 'class="site-footer"'
  require "$page" 'class="hero"'
  require "$page" 'class="section"'
  require "$page" 'data-page="'
  require "$page" 'aria-current="page"'
  require "$page" 'Skip to main content'
  require "$page" 'class="facts-widget"'
  require "$page" 'data-fact-text'
  require "$page" 'data-fact-button'
  require "$page" 'class="fact-list"'
done

echo "Smoke test passed."
```

Make it executable:

```bash
chmod +x scripts/site-smoke-test.sh
```

**Step 2: Run test to verify it fails**

Run: `./scripts/site-smoke-test.sh`

Expected: FAIL with "Missing index.html" (and exit code 1).

**Step 3: Write minimal implementation (site skeleton + stub assets)**

Create `styles.css` (stub):

```css
/* Filled in later */
```

Create `main.js` (stub):

```js
// Filled in later
```

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Anteater Alley | Home</title>
    <meta name="description" content="A playful guide to the world of anteaters." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="page" data-page="home">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header">
      <a class="logo" href="index.html" aria-label="Anteater Alley">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 64 48" role="presentation">
            <circle cx="24" cy="24" r="16" />
            <ellipse cx="48" cy="26" rx="14" ry="8" />
            <circle cx="20" cy="22" r="2" />
          </svg>
        </span>
        <span class="logo-text">Anteater Alley</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a class="nav-link is-active" href="index.html" aria-current="page">Home</a>
        <a class="nav-link" href="species.html">Species</a>
        <a class="nav-link" href="habitat.html">Habitat</a>
        <a class="nav-link" href="diet.html">Diet</a>
        <a class="nav-link" href="conservation.html">Conservation</a>
      </nav>
      <a class="btn btn-small" href="conservation.html">Adopt (Pretend)</a>
    </header>

    <main id="main-content">
      <section class="hero section">
        <div class="hero-content">
          <p class="eyebrow">Welcome!</p>
          <h1>Meet the gentle ant snackers.</h1>
          <p>Anteaters are curious, calm, and totally fascinating. Let’s explore their world.</p>
          <div class="hero-actions">
            <a class="btn" href="species.html">Meet the species</a>
            <a class="btn btn-ghost" href="habitat.html">Where they live</a>
          </div>
        </div>
        <div class="hero-illustration" aria-hidden="true"></div>
      </section>

      <section class="section">
        <h2>Meet the species</h2>
        <p class="lead">Four living species, each with its own style.</p>
      </section>

      <section class="section">
        <h2>Why we love them</h2>
        <p class="lead">Quiet, clever, and wonderfully weird.</p>
      </section>
    </main>

    <footer class="site-footer">
      <div class="facts-widget">
        <p class="fact-text" data-fact-text>Anteaters can eat thousands of insects in a single day.</p>
        <ul class="fact-list">
          <li>Anteaters have no teeth and use sticky tongues.</li>
          <li>They have strong claws for opening termite mounds.</li>
          <li>They rely on smell more than sight.</li>
        </ul>
        <button class="btn btn-small" type="button" data-fact-button>Shuffle fact</button>
      </div>
      <p class="footer-note">Made for curious explorers.</p>
    </footer>

    <script src="main.js" defer></script>
  </body>
</html>
```

Create `species.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Anteater Alley | Species</title>
    <meta name="description" content="Meet the four living species of anteaters." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="page" data-page="species">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header">
      <a class="logo" href="index.html" aria-label="Anteater Alley">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 64 48" role="presentation">
            <circle cx="24" cy="24" r="16" />
            <ellipse cx="48" cy="26" rx="14" ry="8" />
            <circle cx="20" cy="22" r="2" />
          </svg>
        </span>
        <span class="logo-text">Anteater Alley</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link is-active" href="species.html" aria-current="page">Species</a>
        <a class="nav-link" href="habitat.html">Habitat</a>
        <a class="nav-link" href="diet.html">Diet</a>
        <a class="nav-link" href="conservation.html">Conservation</a>
      </nav>
      <a class="btn btn-small" href="conservation.html">Adopt (Pretend)</a>
    </header>

    <main id="main-content">
      <section class="hero section">
        <div class="hero-content">
          <p class="eyebrow">Species</p>
          <h1>Four ways to be an anteater.</h1>
          <p>From tree-dwelling fluffballs to grassland giants.</p>
        </div>
        <div class="hero-illustration" aria-hidden="true"></div>
      </section>

      <section class="section">
        <h2>Meet the four</h2>
        <p class="lead">Each species has its own habitat and style.</p>
      </section>
    </main>

    <footer class="site-footer">
      <div class="facts-widget">
        <p class="fact-text" data-fact-text>Anteaters can close their nostrils to keep dust out.</p>
        <ul class="fact-list">
          <li>They curl their tails around themselves for warmth.</li>
          <li>Some species climb trees with ease.</li>
          <li>Giant anteaters can be over 6 feet long.</li>
        </ul>
        <button class="btn btn-small" type="button" data-fact-button>Shuffle fact</button>
      </div>
      <p class="footer-note">Made for curious explorers.</p>
    </footer>

    <script src="main.js" defer></script>
  </body>
</html>
```

Create `habitat.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Anteater Alley | Habitat</title>
    <meta name="description" content="Discover where anteaters live and roam." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="page" data-page="habitat">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header">
      <a class="logo" href="index.html" aria-label="Anteater Alley">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 64 48" role="presentation">
            <circle cx="24" cy="24" r="16" />
            <ellipse cx="48" cy="26" rx="14" ry="8" />
            <circle cx="20" cy="22" r="2" />
          </svg>
        </span>
        <span class="logo-text">Anteater Alley</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="species.html">Species</a>
        <a class="nav-link is-active" href="habitat.html" aria-current="page">Habitat</a>
        <a class="nav-link" href="diet.html">Diet</a>
        <a class="nav-link" href="conservation.html">Conservation</a>
      </nav>
      <a class="btn btn-small" href="conservation.html">Adopt (Pretend)</a>
    </header>

    <main id="main-content">
      <section class="hero section">
        <div class="hero-content">
          <p class="eyebrow">Habitat</p>
          <h1>Where anteaters roam.</h1>
          <p>Forests, grasslands, and wetlands across the Americas.</p>
        </div>
        <div class="hero-illustration" aria-hidden="true"></div>
      </section>

      <section class="section">
        <h2>Home zones</h2>
        <p class="lead">They follow the insect trails wherever they go.</p>
      </section>
    </main>

    <footer class="site-footer">
      <div class="facts-widget">
        <p class="fact-text" data-fact-text>Anteaters can stand on their hind legs to sniff the air.</p>
        <ul class="fact-list">
          <li>They like warm, humid climates.</li>
          <li>Tree anteaters sleep in leafy nests.</li>
          <li>Ground anteaters wander long distances.</li>
        </ul>
        <button class="btn btn-small" type="button" data-fact-button>Shuffle fact</button>
      </div>
      <p class="footer-note">Made for curious explorers.</p>
    </footer>

    <script src="main.js" defer></script>
  </body>
</html>
```

Create `diet.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Anteater Alley | Diet</title>
    <meta name="description" content="What anteaters eat and how they do it." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="page" data-page="diet">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header">
      <a class="logo" href="index.html" aria-label="Anteater Alley">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 64 48" role="presentation">
            <circle cx="24" cy="24" r="16" />
            <ellipse cx="48" cy="26" rx="14" ry="8" />
            <circle cx="20" cy="22" r="2" />
          </svg>
        </span>
        <span class="logo-text">Anteater Alley</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="species.html">Species</a>
        <a class="nav-link" href="habitat.html">Habitat</a>
        <a class="nav-link is-active" href="diet.html" aria-current="page">Diet</a>
        <a class="nav-link" href="conservation.html">Conservation</a>
      </nav>
      <a class="btn btn-small" href="conservation.html">Adopt (Pretend)</a>
    </header>

    <main id="main-content">
      <section class="hero section">
        <div class="hero-content">
          <p class="eyebrow">Diet</p>
          <h1>Snack time, all the time.</h1>
          <p>Ants and termites make a perfect, crunchy menu.</p>
        </div>
        <div class="hero-illustration" aria-hidden="true"></div>
      </section>

      <section class="section">
        <h2>The menu</h2>
        <p class="lead">Sticky tongues do all the work.</p>
      </section>
    </main>

    <footer class="site-footer">
      <div class="facts-widget">
        <p class="fact-text" data-fact-text>Anteater tongues can be longer than their heads.</p>
        <ul class="fact-list">
          <li>They visit hundreds of nests each day.</li>
          <li>Strong saliva helps catch tiny insects.</li>
          <li>They eat fast and move on quickly.</li>
        </ul>
        <button class="btn btn-small" type="button" data-fact-button>Shuffle fact</button>
      </div>
      <p class="footer-note">Made for curious explorers.</p>
    </footer>

    <script src="main.js" defer></script>
  </body>
</html>
```

Create `conservation.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Anteater Alley | Conservation</title>
    <meta name="description" content="How to help protect anteaters." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="page" data-page="conservation">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header">
      <a class="logo" href="index.html" aria-label="Anteater Alley">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 64 48" role="presentation">
            <circle cx="24" cy="24" r="16" />
            <ellipse cx="48" cy="26" rx="14" ry="8" />
            <circle cx="20" cy="22" r="2" />
          </svg>
        </span>
        <span class="logo-text">Anteater Alley</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="species.html">Species</a>
        <a class="nav-link" href="habitat.html">Habitat</a>
        <a class="nav-link" href="diet.html">Diet</a>
        <a class="nav-link is-active" href="conservation.html" aria-current="page">Conservation</a>
      </nav>
      <a class="btn btn-small" href="conservation.html">Adopt (Pretend)</a>
    </header>

    <main id="main-content">
      <section class="hero section">
        <div class="hero-content">
          <p class="eyebrow">Conservation</p>
          <h1>Small steps, big help.</h1>
          <p>Protecting habitats keeps anteaters safe and thriving.</p>
        </div>
        <div class="hero-illustration" aria-hidden="true"></div>
      </section>

      <section class="section">
        <h2>How you can help</h2>
        <p class="lead">Every small action adds up.</p>
      </section>
    </main>

    <footer class="site-footer">
      <div class="facts-widget">
        <p class="fact-text" data-fact-text>Habitat protection helps many species, not just anteaters.</p>
        <ul class="fact-list">
          <li>Wildlife crossings reduce road accidents.</li>
          <li>Reforestation brings insects back.</li>
          <li>Education changes future choices.</li>
        </ul>
        <button class="btn btn-small" type="button" data-fact-button>Shuffle fact</button>
      </div>
      <p class="footer-note">Made for curious explorers.</p>
    </footer>

    <script src="main.js" defer></script>
  </body>
</html>
```

**Step 4: Run test to verify it passes**

Run: `./scripts/site-smoke-test.sh`

Expected: PASS with "Smoke test passed."

**Step 5: Commit**

```bash
git add scripts/site-smoke-test.sh index.html species.html habitat.html diet.html conservation.html styles.css main.js
git commit -m "feat: add site skeleton and smoke test"
```

---

### Task 2: Final HTML content for all pages

**Files:**
- Modify: `index.html`
- Modify: `species.html`
- Modify: `habitat.html`
- Modify: `diet.html`
- Modify: `conservation.html`
- Test: `scripts/site-smoke-test.sh`

**Step 1: Write the failing test**

Update `scripts/site-smoke-test.sh` to assert page-specific sections (replace the file with this full version):

```bash
#!/usr/bin/env bash
set -euo pipefail

if command -v rg >/dev/null 2>&1; then
  SEARCH="rg -n"
else
  SEARCH="grep -n"
fi

files=(
  index.html
  species.html
  habitat.html
  diet.html
  conservation.html
  styles.css
  main.js
)

for f in "${files[@]}"; do
  if [ ! -f "$f" ]; then
    echo "Missing $f"
    exit 1
  fi
done

require() {
  local file="$1"
  local pattern="$2"
  if ! eval $SEARCH "$pattern" "$file" >/dev/null; then
    echo "Missing pattern '$pattern' in $file"
    exit 1
  fi
}

for page in index.html species.html habitat.html diet.html conservation.html; do
  require "$page" '<link[^>]+href="styles.css"'
  require "$page" '<script[^>]+src="main.js"'
  require "$page" '<nav'
  require "$page" 'id="main-content"'
  require "$page" 'class="site-header"'
  require "$page" 'class="site-footer"'
  require "$page" 'class="hero"'
  require "$page" 'data-page="'
  require "$page" 'aria-current="page"'
  require "$page" 'Skip to main content'
  require "$page" 'class="facts-widget"'
  require "$page" 'data-fact-text'
  require "$page" 'data-fact-button'
  require "$page" 'class="fact-list"'
done

require index.html 'id="species-preview"'
require index.html 'id="love-list"'
require species.html 'id="species-cards"'
require habitat.html 'id="habitat-zones"'
require diet.html 'id="diet-menu"'
require conservation.html 'id="help-actions"'

require index.html 'data-page="home"'
require species.html 'data-page="species"'
require habitat.html 'data-page="habitat"'
require diet.html 'data-page="diet"'
require conservation.html 'data-page="conservation"'

echo "Smoke test passed."
```

**Step 2: Run test to verify it fails**

Run: `./scripts/site-smoke-test.sh`

Expected: FAIL with "Missing pattern 'id=\"species-preview\"' in index.html".

**Step 3: Write minimal implementation (final page content)**

Replace each HTML file with the full content below.

Update `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Anteater Alley | Home</title>
    <meta name="description" content="A playful guide to the world of anteaters." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="page" data-page="home">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header">
      <a class="logo" href="index.html" aria-label="Anteater Alley">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 64 48" role="presentation">
            <circle cx="24" cy="24" r="16" />
            <ellipse cx="48" cy="26" rx="14" ry="8" />
            <circle cx="20" cy="22" r="2" />
          </svg>
        </span>
        <span class="logo-text">Anteater Alley</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a class="nav-link is-active" href="index.html" aria-current="page">Home</a>
        <a class="nav-link" href="species.html">Species</a>
        <a class="nav-link" href="habitat.html">Habitat</a>
        <a class="nav-link" href="diet.html">Diet</a>
        <a class="nav-link" href="conservation.html">Conservation</a>
      </nav>
      <a class="btn btn-small" href="conservation.html">Adopt (Pretend)</a>
    </header>

    <main id="main-content">
      <section class="hero section reveal">
        <div class="hero-content">
          <p class="eyebrow">Welcome to the burrow!</p>
          <h1>Meet the gentle ant snackers.</h1>
          <p>Anteaters are curious, calm, and totally fascinating. Let’s explore their world together.</p>
          <div class="hero-actions">
            <a class="btn" href="species.html">Meet the species</a>
            <a class="btn btn-ghost" href="habitat.html">Where they live</a>
          </div>
        </div>
        <div class="hero-illustration" aria-hidden="true">
          <div class="anteater-shape">
            <span class="anteater-snout"></span>
          </div>
        </div>
      </section>

      <section class="section reveal" id="species-preview">
        <div class="section-header">
          <h2>Meet the species</h2>
          <p class="lead">Four living species, each with its own style.</p>
        </div>
        <div class="card-grid">
          <article class="card">
            <h3>Giant anteater</h3>
            <p>The largest of them all, strolling grasslands with a big fluffy tail.</p>
            <span class="tag">Ground explorer</span>
          </article>
          <article class="card">
            <h3>Northern tamandua</h3>
            <p>A tree-loving climber with a curved snout and a bold attitude.</p>
            <span class="tag">Tree climber</span>
          </article>
          <article class="card">
            <h3>Southern tamandua</h3>
            <p>Spotted and nimble, often found in forests and savannas.</p>
            <span class="tag">Forest friend</span>
          </article>
          <article class="card">
            <h3>Silky anteater</h3>
            <p>The smallest and fluffiest, sleeping high in the canopy.</p>
            <span class="tag">Tiny treehugger</span>
          </article>
        </div>
      </section>

      <section class="section reveal" id="love-list">
        <div class="section-header">
          <h2>Why we love them</h2>
          <p class="lead">Quiet, clever, and wonderfully weird.</p>
        </div>
        <ul class="highlight-list">
          <li>Sticky tongues that work like insect vacuum cleaners.</li>
          <li>Strong claws that open termite mounds with ease.</li>
          <li>Cozy fur patterns that look like warm sweaters.</li>
          <li>Super snouts that can smell dinner from far away.</li>
        </ul>
      </section>

      <section class="section reveal callout">
        <div>
          <h2>Want to help?</h2>
          <p class="lead">Protecting habitats helps anteaters and their insect neighbors.</p>
        </div>
        <a class="btn" href="conservation.html">Learn how</a>
      </section>
    </main>

    <footer class="site-footer">
      <div class="facts-widget">
        <p class="fact-text" data-fact-text>Anteaters can eat thousands of insects in a single day.</p>
        <ul class="fact-list">
          <li>Anteaters have no teeth and use sticky tongues.</li>
          <li>They have strong claws for opening termite mounds.</li>
          <li>They rely on smell more than sight.</li>
          <li>Some species curl their tails like cozy blankets.</li>
        </ul>
        <button class="btn btn-small" type="button" data-fact-button>Shuffle fact</button>
      </div>
      <p class="footer-note">Made for curious explorers.</p>
    </footer>

    <script src="main.js" defer></script>
  </body>
</html>
```

Update `species.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Anteater Alley | Species</title>
    <meta name="description" content="Meet the four living species of anteaters." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="page" data-page="species">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header">
      <a class="logo" href="index.html" aria-label="Anteater Alley">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 64 48" role="presentation">
            <circle cx="24" cy="24" r="16" />
            <ellipse cx="48" cy="26" rx="14" ry="8" />
            <circle cx="20" cy="22" r="2" />
          </svg>
        </span>
        <span class="logo-text">Anteater Alley</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link is-active" href="species.html" aria-current="page">Species</a>
        <a class="nav-link" href="habitat.html">Habitat</a>
        <a class="nav-link" href="diet.html">Diet</a>
        <a class="nav-link" href="conservation.html">Conservation</a>
      </nav>
      <a class="btn btn-small" href="conservation.html">Adopt (Pretend)</a>
    </header>

    <main id="main-content">
      <section class="hero section reveal">
        <div class="hero-content">
          <p class="eyebrow">Species</p>
          <h1>Four ways to be an anteater.</h1>
          <p>From tree-dwelling fluffballs to grassland giants.</p>
        </div>
        <div class="hero-illustration" aria-hidden="true">
          <div class="anteater-shape">
            <span class="anteater-snout"></span>
          </div>
        </div>
      </section>

      <section class="section reveal" id="species-cards">
        <div class="section-header">
          <h2>The four living species</h2>
          <p class="lead">Different sizes, different homes, same love of insects.</p>
        </div>
        <div class="card-grid">
          <article class="card card-feature">
            <h3>Giant anteater</h3>
            <p>The biggest of the bunch, roaming open grasslands and savannas.</p>
            <ul class="mini-list">
              <li>Nickname: the gentle giant</li>
              <li>Favorite snack: termites</li>
              <li>Special skill: powerful claws</li>
            </ul>
          </article>
          <article class="card">
            <h3>Northern tamandua</h3>
            <p>Climbs trees with a strong tail and bold personality.</p>
            <ul class="mini-list">
              <li>Tree explorer</li>
              <li>Lives in forests</li>
              <li>Spots for style</li>
            </ul>
          </article>
          <article class="card">
            <h3>Southern tamandua</h3>
            <p>Spotted and nimble, found in forests and grasslands.</p>
            <ul class="mini-list">
              <li>Sun-loving wanderer</li>
              <li>Great climber</li>
              <li>Lightweight build</li>
            </ul>
          </article>
          <article class="card">
            <h3>Silky anteater</h3>
            <p>The smallest, fluffiest, and most tree-focused of all.</p>
            <ul class="mini-list">
              <li>Cloud-soft fur</li>
              <li>Nests in tree branches</li>
              <li>Night-time snacker</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="section reveal callout">
        <div>
          <h2>Want to meet them all?</h2>
          <p class="lead">Explore their habitats and favorite foods next.</p>
        </div>
        <a class="btn" href="habitat.html">See habitats</a>
      </section>
    </main>

    <footer class="site-footer">
      <div class="facts-widget">
        <p class="fact-text" data-fact-text>Anteaters can close their nostrils to keep dust out.</p>
        <ul class="fact-list">
          <li>They curl their tails around themselves for warmth.</li>
          <li>Some species climb trees with ease.</li>
          <li>Giant anteaters can be over 6 feet long.</li>
          <li>Each species has its own preferred habitat.</li>
        </ul>
        <button class="btn btn-small" type="button" data-fact-button>Shuffle fact</button>
      </div>
      <p class="footer-note">Made for curious explorers.</p>
    </footer>

    <script src="main.js" defer></script>
  </body>
</html>
```

Update `habitat.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Anteater Alley | Habitat</title>
    <meta name="description" content="Discover where anteaters live and roam." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="page" data-page="habitat">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header">
      <a class="logo" href="index.html" aria-label="Anteater Alley">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 64 48" role="presentation">
            <circle cx="24" cy="24" r="16" />
            <ellipse cx="48" cy="26" rx="14" ry="8" />
            <circle cx="20" cy="22" r="2" />
          </svg>
        </span>
        <span class="logo-text">Anteater Alley</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="species.html">Species</a>
        <a class="nav-link is-active" href="habitat.html" aria-current="page">Habitat</a>
        <a class="nav-link" href="diet.html">Diet</a>
        <a class="nav-link" href="conservation.html">Conservation</a>
      </nav>
      <a class="btn btn-small" href="conservation.html">Adopt (Pretend)</a>
    </header>

    <main id="main-content">
      <section class="hero section reveal">
        <div class="hero-content">
          <p class="eyebrow">Habitat</p>
          <h1>Where anteaters roam.</h1>
          <p>Forests, grasslands, and wetlands across the Americas.</p>
        </div>
        <div class="hero-illustration" aria-hidden="true">
          <div class="anteater-shape">
            <span class="anteater-snout"></span>
          </div>
        </div>
      </section>

      <section class="section reveal" id="habitat-zones">
        <div class="section-header">
          <h2>Home zones</h2>
          <p class="lead">They follow the insect trails wherever they go.</p>
        </div>
        <div class="card-grid">
          <article class="card">
            <h3>Tropical forests</h3>
            <p>Warm and leafy, perfect for tree-climbing tamanduas and silky anteaters.</p>
          </article>
          <article class="card">
            <h3>Savannas and grasslands</h3>
            <p>Open spaces where giant anteaters roam and sniff out mounds.</p>
          </article>
          <article class="card">
            <h3>Wetlands</h3>
            <p>Moist, marshy areas with plenty of insects and soft ground.</p>
          </article>
        </div>
      </section>

      <section class="section reveal">
        <div class="section-header">
          <h2>Climate ladder</h2>
          <p class="lead">Anteaters like warm places with lots of bugs.</p>
        </div>
        <div class="climate-bar" aria-hidden="true"></div>
        <div class="climate-labels">
          <span>Cool</span>
          <span>Warm</span>
          <span>Tropical</span>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="facts-widget">
        <p class="fact-text" data-fact-text>Anteaters can stand on their hind legs to sniff the air.</p>
        <ul class="fact-list">
          <li>They like warm, humid climates.</li>
          <li>Tree anteaters sleep in leafy nests.</li>
          <li>Ground anteaters wander long distances.</li>
          <li>Habitats full of insects are their favorites.</li>
        </ul>
        <button class="btn btn-small" type="button" data-fact-button>Shuffle fact</button>
      </div>
      <p class="footer-note">Made for curious explorers.</p>
    </footer>

    <script src="main.js" defer></script>
  </body>
</html>
```

Update `diet.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Anteater Alley | Diet</title>
    <meta name="description" content="What anteaters eat and how they do it." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="page" data-page="diet">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header">
      <a class="logo" href="index.html" aria-label="Anteater Alley">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 64 48" role="presentation">
            <circle cx="24" cy="24" r="16" />
            <ellipse cx="48" cy="26" rx="14" ry="8" />
            <circle cx="20" cy="22" r="2" />
          </svg>
        </span>
        <span class="logo-text">Anteater Alley</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="species.html">Species</a>
        <a class="nav-link" href="habitat.html">Habitat</a>
        <a class="nav-link is-active" href="diet.html" aria-current="page">Diet</a>
        <a class="nav-link" href="conservation.html">Conservation</a>
      </nav>
      <a class="btn btn-small" href="conservation.html">Adopt (Pretend)</a>
    </header>

    <main id="main-content">
      <section class="hero section reveal">
        <div class="hero-content">
          <p class="eyebrow">Diet</p>
          <h1>Snack time, all the time.</h1>
          <p>Ants and termites make a perfect, crunchy menu.</p>
        </div>
        <div class="hero-illustration" aria-hidden="true">
          <div class="anteater-shape">
            <span class="anteater-snout"></span>
          </div>
        </div>
      </section>

      <section class="section reveal" id="diet-menu">
        <div class="section-header">
          <h2>The menu</h2>
          <p class="lead">Sticky tongues do all the work.</p>
        </div>
        <div class="card-grid">
          <article class="card">
            <h3>Ant buffet</h3>
            <p>Small bites, lots of them. Perfect for quick energy.</p>
          </article>
          <article class="card">
            <h3>Termite towers</h3>
            <p>Crunchy snacks tucked inside tall mounds.</p>
          </article>
          <article class="card">
            <h3>Water breaks</h3>
            <p>Hydration time between nest visits.</p>
          </article>
        </div>
      </section>

      <section class="section reveal">
        <div class="section-header">
          <h2>Tongue power</h2>
          <p class="lead">Long, sticky, and super fast.</p>
        </div>
        <div class="tongue-meter" aria-hidden="true">
          <span>Head</span>
          <span>Super long tongue</span>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="facts-widget">
        <p class="fact-text" data-fact-text>Anteater tongues can be longer than their heads.</p>
        <ul class="fact-list">
          <li>They visit hundreds of nests each day.</li>
          <li>Strong saliva helps catch tiny insects.</li>
          <li>They eat fast and move on quickly.</li>
          <li>Meals are short but frequent.</li>
        </ul>
        <button class="btn btn-small" type="button" data-fact-button>Shuffle fact</button>
      </div>
      <p class="footer-note">Made for curious explorers.</p>
    </footer>

    <script src="main.js" defer></script>
  </body>
</html>
```

Update `conservation.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Anteater Alley | Conservation</title>
    <meta name="description" content="How to help protect anteaters." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="page" data-page="conservation">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-header">
      <a class="logo" href="index.html" aria-label="Anteater Alley">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 64 48" role="presentation">
            <circle cx="24" cy="24" r="16" />
            <ellipse cx="48" cy="26" rx="14" ry="8" />
            <circle cx="20" cy="22" r="2" />
          </svg>
        </span>
        <span class="logo-text">Anteater Alley</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="species.html">Species</a>
        <a class="nav-link" href="habitat.html">Habitat</a>
        <a class="nav-link" href="diet.html">Diet</a>
        <a class="nav-link is-active" href="conservation.html" aria-current="page">Conservation</a>
      </nav>
      <a class="btn btn-small" href="conservation.html">Adopt (Pretend)</a>
    </header>

    <main id="main-content">
      <section class="hero section reveal">
        <div class="hero-content">
          <p class="eyebrow">Conservation</p>
          <h1>Small steps, big help.</h1>
          <p>Protecting habitats keeps anteaters safe and thriving.</p>
        </div>
        <div class="hero-illustration" aria-hidden="true">
          <div class="anteater-shape">
            <span class="anteater-snout"></span>
          </div>
        </div>
      </section>

      <section class="section reveal" id="help-actions">
        <div class="section-header">
          <h2>How you can help</h2>
          <p class="lead">Every small action adds up.</p>
        </div>
        <div class="card-grid">
          <article class="card">
            <h3>Protect habitats</h3>
            <p>Support parks and forests that keep ecosystems healthy.</p>
          </article>
          <article class="card">
            <h3>Drive safely</h3>
            <p>Slow down in wildlife areas to prevent road accidents.</p>
          </article>
          <article class="card">
            <h3>Share knowledge</h3>
            <p>Teach friends how amazing anteaters are.</p>
          </article>
        </div>
      </section>

      <section class="section reveal">
        <div class="section-header">
          <h2>Threats to watch</h2>
          <p class="lead">Habitat loss and wildfires are the biggest challenges.</p>
        </div>
        <ul class="highlight-list">
          <li>Forest clearing removes food sources.</li>
          <li>Roads split up long foraging routes.</li>
          <li>Extreme heat dries up insect nests.</li>
        </ul>
      </section>
    </main>

    <footer class="site-footer">
      <div class="facts-widget">
        <p class="fact-text" data-fact-text>Habitat protection helps many species, not just anteaters.</p>
        <ul class="fact-list">
          <li>Wildlife crossings reduce road accidents.</li>
          <li>Reforestation brings insects back.</li>
          <li>Education changes future choices.</li>
          <li>Community action protects long-term habitats.</li>
        </ul>
        <button class="btn btn-small" type="button" data-fact-button>Shuffle fact</button>
      </div>
      <p class="footer-note">Made for curious explorers.</p>
    </footer>

    <script src="main.js" defer></script>
  </body>
</html>
```

**Step 4: Run test to verify it passes**

Run: `./scripts/site-smoke-test.sh`

Expected: PASS with "Smoke test passed."

**Step 5: Commit**

```bash
git add index.html species.html habitat.html diet.html conservation.html scripts/site-smoke-test.sh
git commit -m "feat: add final page content"
```

---

### Task 3: Global styling

**Files:**
- Modify: `styles.css`
- Test: `scripts/site-smoke-test.sh`

**Step 1: Write the failing test**

Update `scripts/site-smoke-test.sh` to require key CSS selectors (replace the file with this full version):

```bash
#!/usr/bin/env bash
set -euo pipefail

if command -v rg >/dev/null 2>&1; then
  SEARCH="rg -n"
else
  SEARCH="grep -n"
fi

files=(
  index.html
  species.html
  habitat.html
  diet.html
  conservation.html
  styles.css
  main.js
)

for f in "${files[@]}"; do
  if [ ! -f "$f" ]; then
    echo "Missing $f"
    exit 1
  fi
done

require() {
  local file="$1"
  local pattern="$2"
  if ! eval $SEARCH "$pattern" "$file" >/dev/null; then
    echo "Missing pattern '$pattern' in $file"
    exit 1
  fi
}

for page in index.html species.html habitat.html diet.html conservation.html; do
  require "$page" '<link[^>]+href="styles.css"'
  require "$page" '<script[^>]+src="main.js"'
  require "$page" '<nav'
  require "$page" 'id="main-content"'
  require "$page" 'class="site-header"'
  require "$page" 'class="site-footer"'
  require "$page" 'class="hero"'
  require "$page" 'data-page="'
  require "$page" 'aria-current="page"'
  require "$page" 'Skip to main content'
  require "$page" 'class="facts-widget"'
  require "$page" 'data-fact-text'
  require "$page" 'data-fact-button'
  require "$page" 'class="fact-list"'
done

require index.html 'id="species-preview"'
require index.html 'id="love-list"'
require species.html 'id="species-cards"'
require habitat.html 'id="habitat-zones"'
require diet.html 'id="diet-menu"'
require conservation.html 'id="help-actions"'

require styles.css ':root'
require styles.css '\.site-header'
require styles.css '\.site-footer'
require styles.css '\.hero'
require styles.css '\.card-grid'
require styles.css '@media'
require styles.css 'prefers-reduced-motion'

echo "Smoke test passed."
```

**Step 2: Run test to verify it fails**

Run: `./scripts/site-smoke-test.sh`

Expected: FAIL with "Missing pattern ':root' in styles.css".

**Step 3: Write minimal implementation (full styles)**

Replace `styles.css` with:

```css
:root {
  --cream: #fff6e5;
  --sand: #f8d9a0;
  --sky: #7ec8e3;
  --leaf: #2e7d32;
  --coral: #f46f5d;
  --amber: #f5b642;
  --ink: #3b2f2a;
  --shadow: 0 18px 30px rgba(59, 47, 42, 0.15);
  --radius: 24px;
  --radius-sm: 16px;
  --max-width: 1100px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Nunito", "Trebuchet MS", sans-serif;
  color: var(--ink);
  background: linear-gradient(180deg, var(--sky) 0%, #dff2f9 35%, var(--cream) 70%, #fef1d4 100%);
  line-height: 1.6;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: radial-gradient(circle at 20% 20%, rgba(245, 182, 66, 0.2), transparent 45%),
    radial-gradient(circle at 80% 15%, rgba(46, 125, 50, 0.18), transparent 40%),
    radial-gradient(circle at 70% 75%, rgba(244, 111, 93, 0.16), transparent 45%);
  pointer-events: none;
  z-index: -1;
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

.skip-link {
  position: absolute;
  left: -999px;
  top: 1rem;
  background: var(--coral);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  z-index: 10;
}

.skip-link:focus {
  left: 1rem;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 4vw 0.5rem;
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: "Baloo 2", "Comic Sans MS", cursive;
  font-size: 1.35rem;
  letter-spacing: 0.5px;
}

.logo-mark {
  width: 46px;
  height: 34px;
  background: white;
  border-radius: 999px;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow);
}

.logo-mark svg {
  width: 38px;
  height: 30px;
  fill: var(--ink);
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-weight: 700;
}

.nav-link {
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  transition: transform 0.2s ease, background 0.2s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  transform: translateY(-2px) rotate(-1deg);
  background: white;
  outline: none;
}

.nav-link.is-active {
  background: var(--amber);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  background: var(--coral);
  color: white;
  font-weight: 700;
  border: none;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover,
.btn:focus-visible {
  transform: translateY(-2px) rotate(-1deg);
  box-shadow: 0 20px 32px rgba(59, 47, 42, 0.22);
  outline: none;
}

.btn-small {
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
}

.btn-ghost {
  background: white;
  color: var(--ink);
}

.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  padding: 3rem 4vw;
  max-width: var(--max-width);
  margin: 0 auto;
  align-items: center;
}

.hero-content h1 {
  font-family: "Baloo 2", "Comic Sans MS", cursive;
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  margin: 0.3rem 0 1rem;
}

.hero-content p {
  margin: 0 0 1.5rem;
  font-size: 1.1rem;
}

.eyebrow {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-illustration {
  min-height: 220px;
  position: relative;
}

.anteater-shape {
  width: 100%;
  height: 220px;
  background: radial-gradient(circle at 25% 50%, var(--amber), var(--sand));
  border-radius: 140px 160px 120px 180px;
  position: relative;
  box-shadow: var(--shadow);
}

.anteater-snout {
  position: absolute;
  right: 8%;
  top: 45%;
  width: 80px;
  height: 30px;
  background: var(--ink);
  border-radius: 999px;
  transform-origin: left center;
  animation: wiggle 3s ease-in-out infinite;
}

.section {
  padding: 2rem 4vw;
  max-width: var(--max-width);
  margin: 0 auto;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section h2 {
  font-family: "Baloo 2", "Comic Sans MS", cursive;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  margin: 0 0 0.5rem;
}

.lead {
  font-size: 1.1rem;
  margin: 0;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.card-feature {
  background: linear-gradient(120deg, rgba(244, 111, 93, 0.18), rgba(245, 182, 66, 0.18));
}

.tag {
  display: inline-flex;
  align-items: center;
  margin-top: 0.75rem;
  padding: 0.3rem 0.8rem;
  background: rgba(46, 125, 50, 0.15);
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
}

.highlight-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}

.highlight-list li {
  background: white;
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
}

.mini-list {
  list-style: none;
  padding: 0;
  margin: 0.8rem 0 0;
  display: grid;
  gap: 0.5rem;
}

.callout {
  background: white;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  box-shadow: var(--shadow);
}

.climate-bar {
  height: 20px;
  border-radius: 999px;
  background: linear-gradient(90deg, #a2d2ff, #ffd166, #ef476f);
  margin: 1rem 0 0.5rem;
}

.climate-labels {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
}

.tongue-meter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: white;
  border-radius: var(--radius);
  padding: 1rem 1.5rem;
  box-shadow: var(--shadow);
}

.site-footer {
  margin-top: auto;
  padding: 2rem 4vw 3rem;
  background: rgba(255, 255, 255, 0.8);
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
}

.facts-widget {
  display: grid;
  gap: 1rem;
  max-width: 620px;
  margin: 0 auto 1.5rem;
  text-align: center;
}

.fact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
}

.footer-note {
  text-align: center;
  font-weight: 700;
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes wiggle {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(6deg);
  }
}

@media (max-width: 900px) {
  .site-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero {
    padding-top: 1.5rem;
  }

  .callout {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .site-nav {
    width: 100%;
    justify-content: flex-start;
  }

  .btn {
    width: 100%;
  }

  .hero-illustration {
    min-height: 180px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .anteater-snout {
    animation: none;
  }
}
```

**Step 4: Run test to verify it passes**

Run: `./scripts/site-smoke-test.sh`

Expected: PASS with "Smoke test passed."

**Step 5: Commit**

```bash
git add styles.css scripts/site-smoke-test.sh
git commit -m "feat: add global styling"
```

---

### Task 4: Interactions (fun facts + reveal)

**Files:**
- Modify: `main.js`
- Modify: `styles.css`
- Test: `scripts/site-smoke-test.sh`

**Step 1: Write the failing test**

Update `scripts/site-smoke-test.sh` to require JS hooks (replace the file with this full version):

```bash
#!/usr/bin/env bash
set -euo pipefail

if command -v rg >/dev/null 2>&1; then
  SEARCH="rg -n"
else
  SEARCH="grep -n"
fi

files=(
  index.html
  species.html
  habitat.html
  diet.html
  conservation.html
  styles.css
  main.js
)

for f in "${files[@]}"; do
  if [ ! -f "$f" ]; then
    echo "Missing $f"
    exit 1
  fi
done

require() {
  local file="$1"
  local pattern="$2"
  if ! eval $SEARCH "$pattern" "$file" >/dev/null; then
    echo "Missing pattern '$pattern' in $file"
    exit 1
  fi
}

for page in index.html species.html habitat.html diet.html conservation.html; do
  require "$page" '<link[^>]+href="styles.css"'
  require "$page" '<script[^>]+src="main.js"'
  require "$page" '<nav'
  require "$page" 'id="main-content"'
  require "$page" 'class="site-header"'
  require "$page" 'class="site-footer"'
  require "$page" 'class="hero"'
  require "$page" 'data-page="'
  require "$page" 'aria-current="page"'
  require "$page" 'Skip to main content'
  require "$page" 'class="facts-widget"'
  require "$page" 'data-fact-text'
  require "$page" 'data-fact-button'
  require "$page" 'class="fact-list"'
done

require index.html 'id="species-preview"'
require index.html 'id="love-list"'
require species.html 'id="species-cards"'
require habitat.html 'id="habitat-zones"'
require diet.html 'id="diet-menu"'
require conservation.html 'id="help-actions"'

require styles.css ':root'
require styles.css '\.reveal'
require styles.css '\.reveal\.is-visible'
require styles.css '\.js'

require main.js 'funFacts'
require main.js 'IntersectionObserver'
require main.js 'data-fact-text'
require main.js 'data-fact-button'

echo "Smoke test passed."
```

**Step 2: Run test to verify it fails**

Run: `./scripts/site-smoke-test.sh`

Expected: FAIL with "Missing pattern 'funFacts' in main.js".

**Step 3: Write minimal implementation (full JS + CSS tweak)**

Update `styles.css` by adding the JS helper class (append near the footer styles):

```css
.js .fact-list {
  display: none;
}
```

Replace `main.js` with:

```js
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
  let lastIndex = 0;
  const pickFact = () => {
    let index = Math.floor(Math.random() * funFacts.length);
    if (index === lastIndex) {
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
```

**Step 4: Run test to verify it passes**

Run: `./scripts/site-smoke-test.sh`

Expected: PASS with "Smoke test passed."

**Step 5: Commit**

```bash
git add main.js styles.css scripts/site-smoke-test.sh
git commit -m "feat: add fun facts and reveal animations"
```

---

## Manual verification checklist
- Open `index.html` in a browser and click through all nav links.
- Resize to mobile width and confirm layout stacks cleanly.
- Click “Shuffle fact” and confirm the fact changes.
- Toggle reduced motion in OS settings and confirm no animations.
