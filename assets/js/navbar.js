// navbar.js
document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");

  if (!navbarContainer) {
    console.warn("Navbar container not found on this page.");
    return;
  }

  fetch("/components/navbar.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load navbar: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      navbarContainer.innerHTML = html;

      // ✅ Highlight active link after navbar is loaded
      const currentPage = window.location.pathname.split("/").pop();
      const navLinks = navbarContainer.querySelectorAll("a");

      navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href");

        // 🔹 Add base classes (always applied)
        link.classList.add(
          "px-6",
          "py-1",
          "rounded-full",
          "text-xl",
          "font-medium",
          "transition"
        );

        if (linkPage === currentPage) {
          link.classList.add(
            "bg-[#eceee0]",
            "text-[#376dac]",
            "border",
            "border-[#376dac]"
          );
        } else {
          link.classList.add(
            "text-[#eceee0]",
            "hover:bg-[#33629e]",
            "hover:text-white",
            "hover:border-[#33629e]"
          );
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
