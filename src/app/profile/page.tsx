import React from 'react';
import styles from "./page.module.scss";
import UserCard from "@/app/components/UserCard";

const Page = () => {
    return (
        <section className={styles.profile}>
            <h2 className={'title'}>Профиль</h2>
            <UserCard/>
            <h3 className={styles.profile__subtitle}>Мои новости</h3>
            {/*    NewsPostWithControls: edit button and delete button */}
            {/*    news edit page/mode */}
        </section>
    );
};

export default Page;