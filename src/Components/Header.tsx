import { useState } from "react";
import { NavLink } from "react-router";
import TangeloLogo from "../assets/Tangelo_Wordmark_FF6E31.webp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Order", href: "/order" },
    { label: "About", href: "/about" },
    { label: "Chart View", href: "/chart-view" },
    { label: "Contact", href: "/contact" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 font-medium transition-colors ${
      isActive ? "text-white-600" : "hover:opacity-70"
    }`;

  return (
    <header className="relative bg-[#272626] shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" onClick={closeMenu}>
          <img
            src={TangeloLogo}
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-4 text-white md:flex ">
          {menuItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={linkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <NavLink
          to="/contact"
          className="hidden rounded-lg bg-orange-600 px-5 py-2.5 font-medium text-white hover:bg-orange-700 md:inline-flex"
        >
          Get Started
        </NavLink>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="cursor-pointer rounded-lg p-2 text-white focus:outline-none ring-2 ring-orange-500 md:hidden"
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="absolute left-0 top-full z-50 w-full border-t border-gray-100 bg-white px-4 py-4 shadow-lg md:hidden"
        >
          <ul className="mx-auto max-w-7xl space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={item.href === "/"}
                  onClick={closeMenu}
                  className={linkClass}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            <li className="pt-2">
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className="block rounded-lg bg-orange-600 px-4 py-3 text-center font-medium text-white hover:bg-orange-700"
              >
                Get Started
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
