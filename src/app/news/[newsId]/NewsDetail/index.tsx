'use client';
import React, {useEffect} from 'react';
import {NewsDetail} from "@/utils/types";
import styles from './index.module.scss';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {formatDatetime, getAccessToken} from "@/utils/helpers";
import api from "@/utils/api";
import Comment from './Comment';

type NewsDetailProps = {
    newsDetailPost: NewsDetail;
}
const NewsDetail: React.FC<NewsDetailProps> = ({newsDetailPost}) => {
    const token = getAccessToken();

    useEffect(() => {
        api.post(`/news/${newsDetailPost.id}/set_viewed/`,
            {
                is_viewed: true
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
        });

    }, [newsDetailPost.id, token]);
    return (
        <section className={styles.newsDetail}>
            <time className={styles.newsDetail__datetimeCreated} dateTime={newsDetailPost.datetime_created}>
                {formatDatetime(newsDetailPost.datetime_created)}
            </time>
            <h2 className={`title ${styles.newsDetail__title}`}>
                {newsDetailPost.title}
            </h2>
            <ReactMarkdown
                className={`markdown ${styles.newsPost__content}`}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >
                {newsDetailPost.text}
            </ReactMarkdown>
            {
                newsDetailPost.comments.length > 0 && (
                    <>
                        <h3 className={styles.newsDetail__subtitle}>Комментарии</h3>
                        <ul className={styles.newsDetail__comments}>
                            {
                                newsDetailPost.comments.map(comment => <li key={comment.id}>
                                    <Comment comment={comment}/>
                                </li>)
                            }
                        </ul>
                    </>
                )
            }
        </section>
    );
};

export default NewsDetail;