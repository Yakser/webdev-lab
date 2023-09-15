import React from 'react';
import styles from './index.module.scss';
import Link from "next/link";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`wrapper ${styles.header__wrapper}`}>
                <Link
                    href={'/'}
                    className={styles.header__logo}
                >
                    webdev-lab
                </Link>
                <ul className={styles.header__list}>
                    <li className={styles.header__item}>
                        <Link
                            href={'/'}
                            className={styles.header__link}
                        >
                            Главная
                        </Link>
                    </li>
                    <li className={styles.header__item}>
                        <Link
                            href={'/news'}
                            className={styles.header__link}
                        >
                            Новости
                        </Link>
                    </li>
                    <li className={styles.header__item}>
                        <Link
                            href={'/profile'}
                            className={styles.header__link}
                        >
                            Профиль
                        </Link>
                    </li>
                    <li className={styles.header__item}>
                        <Link
                            href={'/about'}
                            className={styles.header__link}
                        >
                            О приложении
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.header__line}></div>
        </header>
    );
};

export default Header;