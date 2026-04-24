"use client";

import styles from '../styles/footer.module.css';
import Image from 'next/image';

import solarSystem from "../images/solar-system.png"

interface FooterItemLink {
    label: string;
    href: string;
    img?: typeof Image; 
}

const links: FooterItemLink[] = [
]

export default function Footer() {
    return (
        <footer>
            <nav className={styles.nav}>
                <span className={styles.solarEasterEgg}>
                    <a href="#">
                        <Image src={solarSystem} alt="Just a solar system, Nothing to see here" />
                    </a>
                </span>
            </nav>
        </footer>
    )
}