'use client';

import React, {FormEventHandler, useEffect, useState} from 'react';
import styles from './page.module.scss';
import {News} from "@/utils/types";
import NewsPost from "@/app/news/NewsPost";
import api from "@/utils/api";
import {useForm} from "react-hook-form";
import CreateNewsPostForm from "@/app/news/CreateNewsPostForm";
import {useAppSelector} from "@/utils/hooks";
import Pagination from "@/app/components/Pagination";

export type CreateNewsPostFormInputs = {
    title: string,
    text: string,
}



const Page = () => {
    const paginationLimit = 3;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [news, setNews] = useState<News[]>([]);
    const [totalCount, setTotalCount] = React.useState<number>(0);
    const [currentPageIndex, setCurrentPageIndex] = React.useState<number>(0);

    const {
        register,
        handleSubmit,
        reset,
        formState,
        setError,
        formState: {isSubmitSuccessful, errors},

    } = useForm<CreateNewsPostFormInputs>();

    const onSubmit = async ({title, text}: CreateNewsPostFormInputs) => {
        setIsLoading(true);
        api.post('/news/', {title, text})
            .then(response => {
                setNews([response.data, ...news])
                reset();
            })
            .catch(error => {
                setError("root", {message: 'Произошла неизвестная ошибка!'});
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const fetchNews = () => {
        const config = {
            params: {
                limit: paginationLimit,
                offset: currentPageIndex * paginationLimit,
            }
        }
        api.get('/news/', config).then((response) => {
            setTotalCount(response.data.count);
            setNews(response.data.results);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchNews();
    }, []);

    useEffect(() => {
        fetchNews();
    }, [currentPageIndex]);

    return (
        <section className={styles.news}>
            <h2 className={'title'}>Новости</h2>
            <CreateNewsPostForm onSubmit={onSubmit} handleSubmit={handleSubmit} isLoading={isLoading} register={register} formState={formState}/>
            <div className={styles.news__list}>
                {
                    news.map(newsPost => <NewsPost newsPost={newsPost} key={newsPost.id}/>)
                }
            </div>
            {
                Math.ceil(totalCount / paginationLimit) > 1 && <Pagination limit={paginationLimit}
                                                                           totalCount={totalCount}
                                                                           currentPageIndex={currentPageIndex}
                                                                           showPage={setCurrentPageIndex}/>
            }
        </section>
    );
};

export default Page;