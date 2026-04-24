"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/nav_logo.png";
import styles from '../styles/navbar.module.css';

interface DropdownItem {
    href: string;
    label: string;
}

interface NavLink {
    label: string;
    href?: string;
    dropdown?: DropdownItem[];
}

// reverse this so home always go last for some fucky css reason
const links: NavLink[] = [
    { label: "Home", href: "/"},
    { label: "About", href: "#"},
    { label: "Projects", href: "#" },
    { label: "Connections", href: "#"},
    { label: "Contact Me", href: "#"},
];

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLElement>(null);

    // close when click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (label: string) => {
        setOpenDropdown(openDropdown == label ? null : label);
    };

  return (
    <nav className={styles.nav} ref={navRef}>
        <span className={styles.logo}>
            <a href="/">
                <Image className={styles.logoImage} src={logo} alt="Crismon Rowell"></Image>
            </a>
      </span>

      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.label} className={styles.navItem}>

            {/* Regular link */}
            {link.href && !link.dropdown && (
              <Link href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            )}

            {/* Dropdown trigger */}
            {link.dropdown && (
              <>
                <button
                  className={styles.dropdownTrigger}
                  onClick={() => toggleDropdown(link.label)}
                  aria-expanded={openDropdown === link.label}
                >
                  {link.label}
                  <span className={styles.arrow}>
                    {openDropdown === link.label ? "▲" : "▼"}
                  </span>
                </button>

                {/* Dropdown list */}
                {openDropdown === link.label && (
                  <ul className={styles.dropdown}>
                    {link.dropdown.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={styles.dropdownLink}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

          </li>
        ))}
      </ul>
    </nav>
  )
}