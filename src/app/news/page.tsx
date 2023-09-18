'use client';

import React, {FormEventHandler, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './page.module.scss';
import {News} from "@/utils/types";
import NewsPost from "@/app/news/NewsPost";
import api from "@/utils/api";
import {useForm} from "react-hook-form";
import CreateNewsPostForm from "@/app/news/CreateNewsPostForm";
import {useAppSelector} from "@/utils/hooks";
import Pagination from "@/app/components/Pagination";
import {getLastPublishedNewsPostDate, setLastPublishedNewsPostDate} from "@/utils/helpers";
import WebSocketClient from "@/app/components/WebSocketClient";
import useWebSocket from "react-use-websocket";

export type CreateNewsPostFormInputs = {
    title: string,
    text: string,
}

const Page = () => {
    const {user} = useAppSelector((state) => state.auth);
    const paginationLimit = 3;
    const {
        sendMessage,
        lastMessage,
        readyState
    } = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_API_URL || '', {
        onMessage: (event) => {
            const data = JSON.parse(event.data);
            if (data.author_id !== user.id) {
                alert(data.title);
            }
        }
    });

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
                setNews([response.data, ...news]);
                setLastPublishedNewsPostDate(response.data.datetime_created);
                sendMessage(JSON.stringify(
                    {title, author_id: user.id}
                ));
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

    const fetchNews = useCallback(() => {
        const config = {
            params: {
                limit: paginationLimit,
                offset: currentPageIndex * paginationLimit,
            }
        }
        api.get('/news/', config).then((response) => {
            setTotalCount(response.data.count);
            const news: News[] = response.data.results as News[];
            setNews(news);
            if (config.params.offset === 0 && news.length > 0) {
                const lastNewsPostDatetimeCreated = news[0].datetime_created;
                if (getLastPublishedNewsPostDate() != lastNewsPostDatetimeCreated) {
                    setLastPublishedNewsPostDate(lastNewsPostDatetimeCreated);
                    alert('Появились новые новости!');
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }, [currentPageIndex]);


    useEffect(() => {
        fetchNews();
    }, [currentPageIndex, fetchNews]);


    return (
        <section className={styles.news}>
            <h2 className={'title'}>Новости</h2>
            <CreateNewsPostForm onSubmit={onSubmit} handleSubmit={handleSubmit} isLoading={isLoading}
                                register={register} formState={formState}/>
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
            {/*<WebSocketClient onDataReceived={onNewsPostAdded}/>*/}
        </section>
    );
};

export default Page;