'use client';
import React, {useEffect} from 'react';
import {NewsDetail} from "@/utils/types";
import styles from './index.module.scss';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {getAccessToken} from "@/utils/helpers";
import api from "@/utils/api";

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
            console.log(response);
        });

    }, [newsDetailPost.id, token]);
    return (
        <section className={styles.newsDetail}>
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
        </section>
    );
};

export default NewsDetail;