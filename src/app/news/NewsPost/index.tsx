import React from 'react';
import {News} from "@/utils/types";
import styles from './index.module.scss';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import {formatDatetime} from "@/utils/helpers";
import NewsPostControls from "@/app/news/NewsPost/NewsPostControls";

type NewsPostProps = {
    newsPost: News;
}

const NewsPost: React.FC<NewsPostProps> = ({newsPost}) => {
    return (
        <section className={styles.newsPost}>
            <header className={styles.newsPost__header}>
                <time className={styles.newsPost__datetimeCreated} dateTime={newsPost.datetime_created}>
                    {formatDatetime(newsPost.datetime_created)}
                </time>
                <NewsPostControls authorId={newsPost.author.id || -1} newsId={newsPost.id}/>
            </header>
            <h3 className={styles.newsPost__title}>
                <Link href={`/news/${newsPost.id}/`}>
                    {newsPost.title}
                </Link>
            </h3>
            <ReactMarkdown
                className={`markdown ${styles.newsPost__content}`}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >
                {newsPost.text}
            </ReactMarkdown>
        </section>
    );
};

export default NewsPost;