'use client';
import React, {useEffect, useState} from 'react';
import styles from "./page.module.scss";
import UserCard from "@/app/components/UserCard";
import {News} from "@/utils/types";
import api from "@/utils/api";
import NewsPost from "@/app/news/NewsPost";

const Page = () => {
    const [news, setNews] = useState<News[]>([]);


    useEffect(() => {
        api.get('/news/current/').then((response) => {
            setNews(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <section className={styles.profile}>
            <h2 className={'title'}>Профиль</h2>
            <h3 className={styles.profile__subtitle}>Мои новости</h3>
            {/*    NewsPostWithControls: edit button and delete button */}
            {/*    news edit page/mode */}
            <div className={styles.profile__newsList}>
                {
                    news.map(newsPost => <NewsPost newsPost={newsPost} key={newsPost.id}/>)
                }
            </div>
        </section>
    );
}


export default Page;