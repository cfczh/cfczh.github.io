const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const header = document.querySelector(".site-header");
const navScrim = document.querySelector(".nav-scrim");

if (toggle && nav) {
  const getFocusableNavItems = () => [toggle, ...nav.querySelectorAll('a[href]')];

  const setNavOpen = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    header?.toggleAttribute("data-nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");

    if (isOpen) {
      nav.querySelector("a")?.focus();
    }
  };

  toggle.addEventListener("click", () => setNavOpen(!nav.classList.contains("is-open")));

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setNavOpen(false);
    }
  });

  navScrim?.addEventListener("click", () => {
    setNavOpen(false);
    toggle.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setNavOpen(false);
      toggle.focus();
    }

    if (event.key === "Tab" && nav.classList.contains("is-open")) {
      const focusableItems = getFocusableNavItems();
      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (!firstItem || !lastItem) return;

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }
  });

  const mobileNavMedia = window.matchMedia("(max-width: 820px)");

  const closeNavAboveMobileBreakpoint = (event) => {
    if (!event.matches && nav.classList.contains("is-open")) {
      setNavOpen(false);
    }
  };

  if (typeof mobileNavMedia.addEventListener === "function") {
    mobileNavMedia.addEventListener("change", closeNavAboveMobileBreakpoint);
  } else {
    mobileNavMedia.addListener(closeNavAboveMobileBreakpoint);
  }
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const copyEmailButton = document.querySelector(".copy-email");
const copyStatus = document.querySelector(".copy-status");

if (copyEmailButton instanceof HTMLButtonElement && copyStatus) {
  const copyWithFallback = (value) => {
    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();

    let didCopy = false;
    try {
      didCopy = typeof document.execCommand === "function" && document.execCommand("copy");
    } catch {
      didCopy = false;
    }

    input.remove();
    return didCopy;
  };

  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;
    const copiedLabel = copyEmailButton.dataset.copiedLabel ?? "Email copied";

    if (!email) {
      copyStatus.textContent = "Copy is unavailable; please select the address above.";
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else if (!copyWithFallback(email)) {
        throw new Error("Clipboard access is unavailable");
      }
      copyStatus.textContent = copiedLabel;
    } catch {
      copyStatus.textContent = copyWithFallback(email)
        ? copiedLabel
        : "Copy failed; please select the address above.";
    }
  });
}

const scrollProgress = document.querySelector(".scroll-progress");
if (scrollProgress) {
  let progressFrame;

  const updateScrollProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    scrollProgress.style.setProperty("--scroll-progress", Math.min(1, Math.max(0, progress)));
    progressFrame = undefined;
  };

  const requestScrollProgressUpdate = () => {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(updateScrollProgress);
  };

  updateScrollProgress();
  window.addEventListener("scroll", requestScrollProgressUpdate, { passive: true });
  window.addEventListener("resize", requestScrollProgressUpdate);
}

const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && navLinks.length) {
  const setCurrentLink = (id) => {
    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${id}`;
      if (isCurrent) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) {
        setCurrentLink(visibleEntry.target.id);
      }
    },
    { rootMargin: "-28% 0px -58%", threshold: [0.05, 0.2, 0.5] },
  );

  sections.forEach((section) => observer.observe(section));
}
