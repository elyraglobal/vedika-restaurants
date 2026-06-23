# Website Scaffold Setup Skill

**Purpose:** Template and process for rapidly scaffolding new website projects with reusable structure, animations, and patterns.

**When to Use:** Starting any new web project (product landing, restaurant, portfolio, SaaS, etc.)

---

## The Process

### Phase 1: Project Setup
Create a clean, isolated project directory with all necessary infrastructure.

**Steps:**
1. Create new directory alongside existing projects
   - Location: `c:\Desktop\agenticworkflows\[project-name]/`
   - Keeps projects organized and independent

2. Copy foundational files from existing project
   ```
   .claude/        → Framework skills and config
   CLAUDE.md       → WAT architecture instructions
   ```
   - No need to recreate these each time
   - Ensures consistency across projects

3. Initialize git repository
   ```bash
   git init
   git config user.name "Claude"
   git config user.email "claude@anthropic.com"
   ```
   - Ready for initial commit and future pushes

4. Create directory structure
   ```
   project-name/
   ├── css/              (stylesheets)
   ├── js/               (scripts)
   ├── assets/
   │   └── images/       (photos, videos)
   ├── .claude/          (framework)
   ├── .git/             (version control)
   └── index.html        (starter template)
   ```

### Phase 2: Starter Template

Create minimal but complete HTML/CSS/JS that can be extended.

**HTML Template Structure:**
- Semantic sections: hero, menu/features, about, gallery, contact
- Standard meta tags (charset, viewport)
- External libraries loaded: GSAP, ScrollTrigger, Lenis
- Link to CSS and JS

**Why this matters:**
- Sections are reusable across different site types
- External libraries consistent with animated_websites project
- Minimal but functional starting point

**CSS Base:**
- CSS variables for theme (black, white, gold, gray)
- Reset styles (margin, padding, box-sizing)
- Navigation styles (fixed, responsive)
- Hero section (full viewport height, centered)
- Button styles (with hover states)
- Responsive grid layout helpers
- Mobile breakpoints (@media)

**Key pattern from animated_websites applied:**
- Gold accent color on black background
- Outfit (display) + DM Sans (body) font stack
- GSAP library for animations
- Lenis for smooth scroll

**JavaScript Base:**
- Lenis initialization with try/catch
- ScrollTrigger registration
- NAV animation (hide on scroll down, show on scroll up)
- Smooth scroll with easing

### Phase 3: Initial Commit

Clean git commit with all files organized.

```bash
git add .
git commit -m "Initial commit: [Project] landing page starter template"
```

**What gets tracked:**
- HTML, CSS, JS (core files)
- .gitignore (prevents secrets/temp files)
- CLAUDE.md, .claude/ (framework)

**What doesn't get tracked (.gitignore):**
- node_modules/
- .env, credentials.json, token.json
- .tmp/, *.log
- .DS_Store (macOS)

---

## Design Patterns Used

### From animated_websites (nutripro), Reused Here:

| Pattern | nutripro | restaurant | How to Apply |
|---------|----------|-----------|--------------|
| **Color Scheme** | Black + Gold + White | Black + Gold + White | Use CSS vars: `--black`, `--gold`, `--white` |
| **Typography** | Outfit + DM Sans | Outfit + DM Sans | Import from Google Fonts |
| **Animations** | GSAP + ScrollTrigger | GSAP + ScrollTrigger | Use `gsap.to()` and `ScrollTrigger.create()` |
| **Smooth Scroll** | Lenis | Lenis | Initialize in JS with duration + easing |
| **Nav Pattern** | Fixed nav, progress bar | Fixed nav, hide on scroll | Use `translateY(-100%)` on scroll |
| **Hero Section** | Full viewport, centered | Full viewport, centered | 100vh + flexbox center |
| **Buttons** | Gold bg + white hover | Gold bg + white hover | `.btn-primary` with transition |
| **Responsive** | Clamp + grid | Grid + @media | Mobile-first approach |

### How to Extend:

**Add Pinned Sections (from nutripro):**
```javascript
gsap.to('.pin-right', {
    scrollTrigger: {
        trigger: '.pin-section',
        pin: true,
        start: 'top top',
        end: 'bottom center',
    }
});
```

**Add Scroll Animations (from nutripro):**
```javascript
gsap.to('.section h2', {
    opacity: 1,
    y: 0,
    scrollTrigger: {
        trigger: '.section',
        start: 'top 80%',
    }
});
```

**Add Marquee Effect (from nutripro):**
```css
.marquee {
    display: flex;
    animation: scroll 20s linear infinite;
}
@keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
}
```

---

## Directory Structure Explained

```
project-name/
│
├── .claude/                    Framework config (skills, settings)
│   └── skills/                 Where custom skills live
│
├── .git/                        Version control
│
├── assets/
│   └── images/                 Product photos, backgrounds, videos
│
├── css/
│   └── style.css              Main stylesheet (all responsive rules here)
│
├── js/
│   └── app.js                 Main script (animations, interactions)
│
├── index.html                 Entry point (semantic structure)
│
├── .gitignore                 Exclude node_modules, .env, etc.
│
└── CLAUDE.md                  Project instructions (WAT framework)
```

**Why this structure:**
- Assets separate from code (easy to organize media)
- CSS/JS in separate files (maintainable)
- .claude at root (framework always accessible)
- .gitignore prevents secrets from being committed

---

## Common Extensions

### Add a Menu Grid
```html
<section class="menu" id="menu">
    <h2>Menu</h2>
    <div class="menu-grid">
        <div class="menu-item">
            <h3>Dish Name</h3>
            <p>Description</p>
            <span class="price">$XX</span>
        </div>
    </div>
</section>
```

```css
.menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
```

### Add Image Gallery with Lightbox
```html
<section class="gallery" id="gallery">
    <div class="gallery-grid">
        <img src="assets/images/img1.jpg" alt="Gallery image">
    </div>
</section>
```

Reference nutripro's gallery pattern

### Add Contact Form
```html
<section class="contact" id="contact">
    <form>
        <input type="text" placeholder="Name" required>
        <input type="email" placeholder="Email" required>
        <textarea placeholder="Message"></textarea>
        <button type="submit">Send</button>
    </form>
</section>
```

### Add Video Hero (from nutripro)
```html
<video class="hero-video" autoplay muted loop>
    <source src="assets/hero.mp4" type="video/mp4">
</video>
```

---

## Git Workflow for This Template

**Step 1: Create & Setup**
```bash
mkdir restaurant-website
cd restaurant-website
git init
```

**Step 2: Copy Boilerplate**
```bash
cp -r ../animated_websites/.claude .
cp ../animated_websites/CLAUDE.md .
mkdir -p css js assets/images
```

**Step 3: Create Files**
- index.html (HTML structure)
- css/style.css (styles)
- js/app.js (scripts)
- .gitignore

**Step 4: Initial Commit**
```bash
git add .
git commit -m "Initial commit: [Project Name] landing page"
```

**Step 5: Push to Remote (when ready)**
```bash
git remote add origin https://github.com/[user]/[repo].git
git push -u origin main
```

---

## Key Learnings from animated_websites → Applied Here

| Lesson | Issue in nutripro | Solution Applied | Code Example |
|--------|------------------|------------------|--------------|
| **Image Paths** | Used `../` references | Use `assets/` relative paths | `src="assets/blender.jpg"` |
| **Custom Elements** | Cursor effect added friction | Start minimal, add only needed | Removed cursor, kept base nav |
| **Animations** | Every effect needs a library | Use GSAP + ScrollTrigger + Lenis | Standardized in js/app.js |
| **Styling Consistency** | Colors hardcoded | Use CSS variables | `:root { --gold, --black }` |
| **Structure** | Files scattered | Organize: css/, js/, assets/ | Clear folder hierarchy |

---

## Quick Reference: When to Use This Skill

✅ **Use this process when:**
- Starting a new web project (any type)
- Need reproducible structure
- Want animations + smooth scroll baseline
- Building on pattern from animated_websites

❌ **Don't use when:**
- Building backend/API (this is frontend-only)
- Need framework-specific setup (React, Vue, Next.js)
- Working on existing project (use incremental updates)

---

## Next Steps After Scaffolding

1. **Customize CSS**
   - Change color scheme if needed
   - Adjust typography (keep font imports)
   - Add project-specific sections

2. **Add Content**
   - Copy hero pattern from nutripro
   - Add menu items, gallery images
   - Write copy and descriptions

3. **Enhance Animations**
   - Add GSAP animations to new sections
   - Use ScrollTrigger for scroll-based effects
   - Reference nutripro's pin section pattern

4. **Test & Deploy**
   - Test on mobile (responsive)
   - Deploy to Vercel (like nutripro)
   - Get feedback from stakeholders

---

## Summary

This skill documents the complete process of scaffolding a new website project:
1. **Setup** — Create directory, copy boilerplate, initialize git
2. **Template** — Minimal but complete HTML/CSS/JS
3. **Patterns** — Reuse animations and designs from nutripro
4. **Structure** — Organized folders for assets, styles, scripts
5. **Deployment** — Ready to push to GitHub and deploy to Vercel

Use this as your repeatable template for any future web projects.
