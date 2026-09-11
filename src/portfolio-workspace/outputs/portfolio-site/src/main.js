import { profile, summary, experiences, projects, skillGroups, certifications, education } from "./data.js";

const icon = {
    arrow: "↗",
    mail: "✉",
    download: "↓",
    link: "↗",
    menu: "☰",
    close: "×",
};

const nav = [
    ["home", "Home"],
    ["about", "About"],
    ["experience", "Experience"],
    ["projects", "Projects"],
    ["skills", "Skills"],
    ["certifications", "Certifications"],
    ["contact", "Contact"],
];

const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    }[c]));

function navbar() {
    return `
    <header class="site-header">
      <div class="nav-shell">
        <a class="brand" href="#home" aria-label="Home">
          <span>BA</span>
          <b>Bodhisattwa Adak</b>
        </a>

        <button class="menu-btn" aria-label="Open menu" data-menu>${icon.menu}</button>

        <nav class="nav-pill" data-nav>
          ${nav
            .map(
                ([id, label]) =>
                    `<a href="#${id}" data-nav-link="${id}">${label}</a>`
            )
            .join("")}
        </nav>

        <div class="nav-actions">
          <a class="resume-mini" href="${profile.resume}" target="_blank" rel="noreferrer">
            Resume ${icon.download}
          </a>
          <button class="theme-btn" aria-label="Toggle theme" data-theme>◐</button>
        </div>
      </div>
    </header>
  `;
}

function hero() {
    const techIcon = (kind) => {
        const icons = {
            java: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
            spring: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/springboot.svg",
            react: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/react.svg",
            azure: "https://learn.microsoft.com/en-us/media/logos/logo_azure.svg",
            genai: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg",
            github: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
        };
        return icons[kind] || "";
    };

    const techBadges = [
        { label: "Java", kind: "java", className: "java" },
        { label: "Spring Boot", kind: "spring", className: "spring" },
        { label: "ReactJS", kind: "react", className: "react" },
        { label: "Azure", kind: "azure", className: "azure" },
        { label: "GenAI", kind: "genai", className: "genai" },
        { label: "GitHub", kind: "github", className: "github" }
    ];

    return `
    <section id="home" class="hero section">
      <div class="hero-copy">
        <div class="eyebrow"><i></i> Open to Java / Backend opportunities</div>
        <p class="kicker">JAVA FULL STACK ENGINEER WITH APPLIED GENAI</p>
        <h1>Bodhisattwa<br/><em>Adak</em></h1>
        <p class="hero-title">${esc(profile.headline)}</p>

        <div class="hero-actions">
          <a class="btn primary" href="#projects">View projects ${icon.arrow}</a>
          <a class="btn secondary" href="${profile.resume}" target="_blank" rel="noreferrer">View resume ${icon.download}</a>
        </div>

        <div class="socials">
          <a href="${profile.linkedin}" target="_blank" rel="noreferrer">LinkedIn ${icon.link}</a>
          <a href="${profile.github}" target="_blank" rel="noreferrer">GitHub ${icon.link}</a>
          <a href="mailto:${profile.email}">${profile.email}</a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="portrait-wrap">
          <div class="portrait-glow"></div>
          <div class="portrait-card">
            <img src="./assets/Image (2).png" alt="Professional portrait of Bodhisattwa Adak" decoding="async" fetchpriority="high" />
          </div>
        </div>

        <div class="metrics">
          ${techBadges
            .map(
                ({ label, kind, className }) => `
                <div class="tech-chip ${className}">
                  <span class="tech-icon"><img src="${techIcon(kind)}" alt="${label} logo" loading="lazy" decoding="async" /></span>
                  <span class="tech-label">${label}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function about() {
    return `
    <section id="about" class="section">
      <div class="section-head">
        <p class="kicker">01 / ABOUT</p>
        <h2>Engineering with a <em>backend-first</em> mindset.</h2>
      </div>

      <div class="about-grid">
        <div class="about-copy">
          ${summary.map((x) => `<p>${esc(x)}</p>`).join("")}
        </div>

        <div class="capabilities">
          ${[
            ["Java Full Stack Engineering", "Java · Spring Boot · REST APIs · Microservices · Spring Security/JWT · JPA/Hibernate · Kafka · Redis · ReactJS · JavaScript · frontend/API integration"],
            ["GenAI Engineering", "AutoGen · MCP · LangChain · RAG · Azure OpenAI · AI-agent/workflow development · backend integration"],
        ]
            .map(
                ([title, text], i) => `
                <article class="cap">
                  <span>0${i + 1}</span>
                  <h3>${title}</h3>
                  <p>${text}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function experience() {
    const eyLogo = certifications.find((c) => c.issuer === "EY")?.logo || "";

    return `
    <section id="experience" class="section">
      <div class="section-head row">
        <div class="experience-title">
          <p class="kicker">02 / EXPERIENCE</p>
          <h2>Recent work at <em>EY GDS.</em></h2>
        </div>
        <div class="experience-meta">
          <div class="experience-brand" aria-label="EY GDS">
            <img src="${esc(eyLogo)}" alt="EY logo" />
          </div>
          <span class="section-note">Jan 2024 — Present</span>
        </div>
      </div>

      <div class="timeline">
        ${experiences
            .map(
                (e, i) => `
              <details class="experience-card" ${i === 0 ? "open" : ""}>
                <summary>
                  <span class="exp-index">0${i + 1}</span>
                  <div>
                    <h3>${esc(e.title)}</h3>
                    <p>${esc(e.company)} · ${esc(e.context)}</p>
                  </div>
                  <time>${esc(e.period)}</time>
                  <b class="plus">+</b>
                </summary>
                <div class="exp-body">
                  <ul>
                    ${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}
                  </ul>
                </div>
              </details>
            `
            )
            .join("")}
      </div>
    </section>
  `;
}

function projectModal(p) {
    return `
    <div class="modal-backdrop" data-modal>
      <div class="modal">
        <button class="modal-close" data-close aria-label="Close project details">${icon.close}</button>
        <p class="kicker">${esc(p.category)}</p>
        <h2>${esc(p.name)}</h2>
        <p>${esc(p.description)}</p>

        <div class="modal-grid">
          <div>
            <h4>Problem</h4>
            <p>${esc(p.problem)}</p>
          </div>
          <div>
            <h4>Solution</h4>
            <p>${esc(p.solution)}</p>
          </div>
          <div>
            <h4>Architecture</h4>
            <p>${esc(p.architecture)}</p>
          </div>
          <div>
            <h4>Contribution</h4>
            <p>${esc(p.contribution)}</p>
          </div>
        </div>

        <div class="tags">
          ${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function projectsSection() {
    return `
    <section id="projects" class="section">
      <div class="section-head row">
        <div>
          <p class="kicker">03 / PROJECTS</p>
          <h2>Selected <em>engineering work.</em></h2>
        </div>
        <div class="filters">
          <button class="active" data-filter="All">All</button>
          <button data-filter="Java / Spring Boot">Java</button>
          <button data-filter="GenAI / AI">GenAI</button>
        </div>
      </div>

      <div class="project-grid" data-projects>
        ${projects
            .map(
                (p, i) => `
              <article class="project-card" data-category="${esc(p.category)}" data-project="${i}">
                <div class="project-top">
                  <span class="project-no">0${i + 1}</span>
                  <span class="project-arrow">${icon.arrow}</span>
                </div>
                <p class="kicker">${esc(p.category)}</p>
                <h3>${esc(p.name)}</h3>
                <p>${esc(p.description)}</p>
                <div class="tags">
                  ${p.tags.slice(0, 6).map((t) => `<span>${esc(t)}</span>`).join("")}
                </div>
                <button class="text-link">Explore project ${icon.arrow}</button>
              </article>
            `
            )
            .join("")}
      </div>
    </section>
  `;
}

function skills() {
    return `
    <section id="skills" class="section">
      <div class="section-head">
        <p class="kicker">04 / SKILLS</p>
        <h2>A practical <em>engineering stack.</em></h2>
      </div>

      <div class="skills-grid">
        ${skillGroups
            .map(
                (g, i) => `
              <article class="skill-card">
                <span>0${i + 1}</span>
                <h3>${esc(g.name)}</h3>
                <div>
                  ${g.skills.map((s) => `<b>${esc(s)}</b>`).join("")}
                </div>
              </article>
            `
            )
            .join("")}
      </div>
    </section>
  `;
}

function certs() {
    return `
    <section id="certifications" class="section">
      <div class="section-head row">
        <div>
          <p class="kicker">05 / CREDENTIALS</p>
          <h2>Certifications & <em>education.</em></h2>
        </div>
      </div>

      <div class="credentials">
        <div class="cert-grid">
          ${certifications
            .map(
                (c) => `
                <a class="cert" href="${esc(c.link)}" target="_blank" rel="noreferrer">
                  <div class="cert-badge ${esc(c.accent)}">
                    ${c.logo ? `<img src="${esc(c.logo)}" alt="${esc(c.issuer)} logo" loading="lazy" decoding="async" />` : `<span>${esc(c.issuer.slice(0, 2).toUpperCase())}</span>`}
                  </div>
                  <div class="cert-copy">
                    <h3>${esc(c.name)}</h3>
                    <p>${esc(c.issuer)}</p>
                  </div>
                </a>
              `
            )
            .join("")}
        </div>

        <article class="education">
          <p class="kicker">EDUCATION</p>
          <h3>${esc(education.degree)}</h3>
          <p>${esc(education.institution)}</p>
          <div>
            <b>${education.year}</b>
            <span>${education.detail}</span>
          </div>
        </article>
      </div>
    </section>
  `;
}

function contact() {
    return `
    <section id="contact" class="section contact-section">
      <div class="contact-card">
        <div>
          <p class="kicker">06 / CONTACT</p>
          <h2>Let's build something <em>useful.</em></h2>
          <p>For Java backend, full-stack, cloud, or applied GenAI opportunities, feel free to reach out.</p>
        </div>

        <div class="contact-links">
          <a href="mailto:${profile.email}">
            <span>${icon.mail}</span>
            <div><small>Email</small><b>${profile.email}</b></div>
            ${icon.arrow}
          </a>
          <a href="${profile.linkedin}" target="_blank" rel="noreferrer">
            <span>in</span>
            <div><small>LinkedIn</small><b>Connect professionally</b></div>
            ${icon.arrow}
          </a>
          <a href="${profile.github}" target="_blank" rel="noreferrer">
            <span>⌘</span>
            <div><small>GitHub</small><b>View code & projects</b></div>
            ${icon.arrow}
          </a>
        </div>
      </div>
    </section>
  `;
}

function render() {
    document.querySelector("#app").innerHTML =
        navbar() +
        `<main id="main">${hero()}${about()}${experience()}${projectsSection()}${skills()}${certs()}${contact()}</main>` +
        `<footer><span>© ${new Date().getFullYear()} Bodhisattwa Adak</span><span>Java · Spring Boot · GenAI</span></footer>` +
        `<button class="top-btn" data-top aria-label="Back to top">↑</button>`;

    attach();
}

function attach() {
    const body = document.body;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") body.classList.add("light");

    const themeBtn = document.querySelector("[data-theme]");
    const navEl = document.querySelector("[data-nav]");
    const menuBtn = document.querySelector("[data-menu]");
    const topBtn = document.querySelector("[data-top]");
    let scrollTicking = false;
    let activeSectionId = "home";

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("light");
            localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
        });
    }

    if (menuBtn && navEl) {
        menuBtn.addEventListener("click", () => {
            navEl.classList.toggle("open");
        });
    }

    if (navEl) {
        navEl.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => navEl.classList.remove("open"));
        });
    }

    document.querySelectorAll("[data-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const selected = btn.dataset.filter;
            document.querySelectorAll("[data-filter]").forEach((el) => el.classList.toggle("active", el === btn));

            document.querySelectorAll(".project-card").forEach((card) => {
                const visible = selected === "All" || card.dataset.category === selected;
                card.hidden = !visible;
            });
        });
    });

    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);

    document.querySelectorAll("[data-project]").forEach((card) => {
        card.addEventListener("click", (event) => {
            if (event.target.closest("button")) return;
            const index = Number(card.dataset.project);
            modalRoot.innerHTML = projectModal(projects[index]);
            document.body.classList.add("modal-open");

            const closeBtn = modalRoot.querySelector("[data-close]");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    modalRoot.innerHTML = "";
                    document.body.classList.remove("modal-open");
                });
            }
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modalRoot.innerHTML = "";
            document.body.classList.remove("modal-open");
        }
    });

    if (topBtn) {
        topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    const sections = Array.from(document.querySelectorAll("section[id]"));
    const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));

    const setActiveNav = () => {
        navLinks.forEach((link) => {
            const active = link.dataset.navLink === activeSectionId;
            link.classList.toggle("active", active);
        });
    };

    const navObserver = new IntersectionObserver(
        (entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibleEntries.length > 0) {
                activeSectionId = visibleEntries[0].target.id;
                setActiveNav();
            }
        },
        {
            threshold: [0.2, 0.35, 0.55],
            rootMargin: "-20% 0px -45% 0px",
        }
    );

    sections.forEach((section) => navObserver.observe(section));

    const updateScrollUi = () => {
        scrollTicking = false;
        if (topBtn) {
            topBtn.classList.toggle("show", window.scrollY > 700);
        }
    };

    const onScroll = () => {
        if (scrollTicking) return;
        scrollTicking = true;
        window.requestAnimationFrame(updateScrollUi);
    };

    updateScrollUi();
    window.addEventListener("scroll", onScroll, { passive: true });
}

render();

