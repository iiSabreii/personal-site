'use client';

import {useState, useRef, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../images/nav_logo.png';
import styles from '../styles/navbar.module.css';

type DropdownItem = {
	href: string;
	label: string;
};

type NavLink = {
	label: string;
	href?: string;
	dropdown?: DropdownItem[];
};

const links: NavLink[] = [
	{label: 'Home', href: '/'},
	{label: 'About', href: '#'},
	{label: 'Skills', href: '#'},
	{label: 'Projects', href: '#'},
	{label: 'Resume', href: '#'},
	{label: 'Contact Me', href: '#'},
];

export default function Navbar() {
	const [openDropdown, setOpenDropdown] = useState<string | undefined>(undefined);
	const navRef = useRef<HTMLElement>(null);

	// Close when click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(event.target as Node)) { // eslint-disable-line @typescript-eslint/no-unsafe-type-assertion
				setOpenDropdown(undefined);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const toggleDropdown = (label: string) => {
		setOpenDropdown(openDropdown === label ? undefined : label);
	};

	return (
		<header>
			<nav className={styles.nav} ref={navRef}>
				<span className={styles.logo}>
					<Link href='/'>
						<Image className={styles.logoImage} src={logo} alt='Crismon Rowell'></Image>
					</Link>
				</span>

				<ul className={styles.links}>
					{links.map(link => (
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
										onClick={() => {
											toggleDropdown(link.label);
										}}
										aria-expanded={openDropdown === link.label}
									>
										{link.label}
										<span className={styles.arrow}>
											{openDropdown === link.label ? '▲' : '▼'}
										</span>
									</button>

									{/* Dropdown list */}
									{openDropdown === link.label && (
										<ul className={styles.dropdown}>
											{link.dropdown.map(item => (
												<li key={item.href}>
													<Link
														href={item.href}
														className={styles.dropdownLink}
														onClick={() => {
															setOpenDropdown(undefined);
														}}
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
		</header>
	);
}
