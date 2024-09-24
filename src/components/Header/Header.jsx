import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { BiCircle } from "react-icons/bi";

export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            document.body.className = savedTheme === 'dark' ? 'dark-mode' : 'light-mode';
        }
    }, []);

    const handleToggleTheme = () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        setIsDarkMode(!isDarkMode);
        document.body.className = newTheme === 'dark' ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', newTheme);
    };

    return (
        <header className={styles.header}>
            <Link style={{ textDecoration: 'none', color: "inherit" }} to={"/"}>
                <h1>Site de Hoteis</h1>
            </Link>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={handleToggleTheme}
                    placeholder='alterar cor'
                />
                <span className={styles.slider}></span>
            </label>
        </header>
    );
}
