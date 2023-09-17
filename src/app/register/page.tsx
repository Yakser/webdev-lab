import React from 'react';
import styles from './page.module.scss';
import RegisterForm from "@/app/components/RegisterForm";

const Page = () => {
    return (
        <section className={styles.register}>
            <h2 className={'title'}>Регистрация</h2>
            <RegisterForm/>
        </section>
    );
};

export default Page;