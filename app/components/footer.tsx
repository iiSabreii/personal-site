"use client";

import styles from '../styles/footer.module.css';
import Image from 'next/image';

import solarSystem from "../images/solar-system.png"
import rocket from "../images/rocket.png";

interface FooterItemLink {
    label: string;
    href: string;
    img?: typeof Image; 
}

const links: FooterItemLink[] = [
]

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.solarEasterEgg}>
                <a href="#">
                    <Image src={solarSystem} alt="Just a solar system, Nothing to see here" />
                </a>
            </div>
            <div className={styles.rocket}>
                <a href="#top">
                    <Image src={rocket} alt="Rocket Ship" />
                </a>
            </div>
        </footer>
    )
}