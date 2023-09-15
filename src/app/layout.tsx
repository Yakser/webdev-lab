import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '../scss/style.scss';
import styles from "@/app/layout.module.scss";

const inter = Inter({subsets: ['latin', 'cyrillic']})

import Header from "@/app/components/Header";
import React from "react";
import {Providers} from "@/utils/providers";

export const metadata: Metadata = {
    title: 'webdev-lab | Главная',
    description: 'Лабораторная работа по курсу "Серверная веб-разработка"',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
        <body className={inter.className}>
        <Providers>
            <Header/>
            <h1 className={'visually-hidden'}>webdev-lab - новостное приложение</h1>
            <main className={styles.main}>
                <div className={styles.main__wrapper}>
                    <div className={styles.main__backgroundWrapper}>
                    </div>
                    {children}
                </div>
            </main>
        </Providers>
        </body>
        </html>
    )
}
