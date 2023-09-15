'use client';

import React, {useEffect, useState} from 'react';
import styles from './page.module.scss';
import {News} from "@/utils/types";
import NewsPost from "@/app/news/NewsPost";
import api from "@/utils/api";
import loginForm from "@/app/components/LoginForm";

const Page = () => {
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        api.get('/news/').then((response) => {
            const data = response.data;
            setNews(response.data.results);
        }).catch(error => {
            console.log(error);
        })
    }, []);
    return (
        <section className={styles.news}>
            <h2 className={'title'}>Новости</h2>
            <div className={styles.news__list}>
                {
                    news.map(newsPost => <NewsPost newsPost={newsPost} key={newsPost.id}/>)
                }
            </div>
        </section>
    );
};

export default Page;