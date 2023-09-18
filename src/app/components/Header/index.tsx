import React from 'react';
import styles from './index.module.scss';
import Link from "next/link";
import UserCard from "@/app/components/UserCard";
import AdminOnly from "@/app/components/AdminOnly";
import CustomLink from "@/app/components/CustomLink";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`wrapper ${styles.header__wrapper}`}>
                <CustomLink
                    href={'/'}
                    className={styles.header__logo}
                >
                    webdev-lab
                </CustomLink>
                <ul className={styles.header__list}>
                    <li className={styles.header__item}>
                        <CustomLink
                            href={'/'}
                            className={styles.header__link}
                        >
                            Главная
                        </CustomLink>
                    </li>
                    <li className={styles.header__item}>
                        <CustomLink
                            href={'/news/'}
                            className={styles.header__link}
                        >
                            Новости
                        </CustomLink>
                    </li>
                    <AdminOnly>
                        <li className={styles.header__item}>
                            <CustomLink
                                href={'/admin/'}
                                className={styles.header__link}
                            >
                                Админ-панель
                            </CustomLink>
                        </li>
                    </AdminOnly>
                </ul>
                <div className={styles.header__userCard}>
                    <UserCard/>
                </div>
            </div>
            <div className={styles.header__line}></div>
        </header>
    );
};

export default Header;