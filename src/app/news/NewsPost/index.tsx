import React from 'react';
import {News} from "@/utils/types";
import styles from './index.module.scss';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

type NewsPostProps = {
    newsPost: News;
}

const NewsPost: React.FC<NewsPostProps> = ({newsPost}) => {
    return (
        <section className={styles.newsPost}>
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