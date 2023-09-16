import React from 'react';
import LoginForm from "@/app/components/LoginForm";
import styles from './page.module.scss';

const Page = () => {
    return (
        <section className={styles.login}>
            <h2 className={'title'}>Вход</h2>
            <LoginForm/>
        </section>
    );
};

export default Page;