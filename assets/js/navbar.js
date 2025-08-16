document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  fetch("/components/navbar.html")
    .then((r) => {
      if (!r.ok) throw new Error(`Failed to load navbar: ${r.status}`);
      return r.text();
    })
    .then((html) => {
      navbarContainer.innerHTML = html;

      // --- elements
      const navMenu = navbarContainer.querySelector("#nav-links");
      const hamburger = navbarContainer.querySelector("#hamburger");
      const links = navbarContainer.querySelectorAll("#nav-links a");

      // --- active link highlighting
      const currentPage = window.location.pathname.split("/").pop();
      links.forEach((link) => {
        const href = link.getAttribute("href");

        // base classes (shared)
        link.classList.add(
          "px-6",
          "py-1",
          "rounded-full",
          "text-xl",
          "font-medium",
          "transition"
        );

        if (href === currentPage) {
          // active
          link.classList.add(
            "bg-[#eceee0]",
            "text-[#376dac]",
            "border",
            "border-[#376dac]"
          );
        } else {
          // inactive
          link.classList.add(
            "text-[#eceee0]",
            "hover:bg-[#33629e]",
            "hover:text-white",
            "hover:border-[#33629e]"
          );
        }
      });

      // --- responsive behavior (950px breakpoint)
      const MOBILE_MAX = 950; // 950px in pixels

      const mobileMenuClasses = [
        "absolute",
        "left-0",
        "top-full",
        "w-full",
        "bg-[#376dac]",
        "flex",
        "flex-col",
        "gap-2",
        "px-5",
        "py-4",
        "shadow-lg",
      ];
      const desktopMenuClasses = [
        "flex",
        "flex-row",
        "gap-4",
        "static",
        "w-auto",
        "bg-transparent",
        "px-0",
        "py-0",
        "shadow-none",
      ];

      function setMenuMode(isMobile) {
        if (!navMenu || !hamburger) return;

        if (isMobile) {
          // show burger, hide menu by default, use dropdown layout
          hamburger.classList.remove("hidden");
          navMenu.classList.add("hidden");
          navMenu.classList.remove(...desktopMenuClasses);
          navMenu.classList.add(...mobileMenuClasses);
        } else {
          // show full menu, hide burger, use inline layout
          hamburger.classList.add("hidden");
          navMenu.classList.remove("hidden");
          navMenu.classList.remove(...mobileMenuClasses);
          navMenu.classList.add(...desktopMenuClasses);
        }
      }

      const isMobile = () => window.innerWidth <= MOBILE_MAX;

      // initial layout
      setMenuMode(isMobile());

      // on resize
      window.addEventListener("resize", () => setMenuMode(isMobile()));

      // toggle dropdown on burger click (mobile only)
      hamburger?.addEventListener("click", () => {
        if (isMobile()) navMenu.classList.toggle("hidden");
      });

      // close menu after clicking a link (mobile)
      links.forEach((a) =>
        a.addEventListener("click", () => {
          if (isMobile()) navMenu.classList.add("hidden");
        })
      );
    })
    .catch((err) => console.error(err));
});
