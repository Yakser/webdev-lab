import React from 'react';
import LoginForm from "@/app/components/LoginForm";
import styles from './page.module.scss';
import Head from "next/head";

const Page = () => {
    return (
        <section className={styles.login}>
            <Head>
                <title>webdev-lab | Вход</title>
            </Head>
            <h2 className={'title'}>Вход</h2>
            <LoginForm/>
        </section>
    );
};

export default Page;