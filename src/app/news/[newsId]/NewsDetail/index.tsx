'use client';
import React, {useEffect, useState} from 'react';
import {News, NewsDetail} from "@/utils/types";
import styles from './index.module.scss';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {formatDatetime, getAccessToken} from "@/utils/helpers";
import api from "@/utils/api";
import Comment from './Comment';
import {useForm} from "react-hook-form";

type FormInputs = {
    text: string,
}

type NewsDetailProps = {
    newsDetailPost: NewsDetail;
}
const NewsDetail: React.FC<NewsDetailProps> = ({newsDetailPost}) => {
    const token = getAccessToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        formState,
        setError,
        formState: {isSubmitSuccessful, errors},

    } = useForm<FormInputs>();

    const onSubmit = async ({text}: FormInputs) => {
        setIsLoading(true);
        api.post('/comments/', {text, news: newsDetailPost.id})
            .then(response => {
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
            <h3 className={styles.newsDetail__subtitle}>
                Добавить комментарий
            </h3>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label className="form__label">
                    <span className="form__labelText">Текст</span>
                    <textarea
                        {...register("text", {
                            required: true
                        })}
                        cols={30}
                        rows={10}
                        placeholder={'Текст'}
                        className="form__textarea"></textarea>
                </label>
                {errors.root && (
                    <p className={styles.form__error}>
                        {errors.root.message}
                    </p>
                )}
                <span className={'form__labelText'}>Комментарий проверяется модератором</span>
                <button
                    className={'form__submit'}
                    type={"submit"}
                    disabled={isLoading}
                >
                    {isLoading ? "Загрузка..." : "Прокомментировать"}
                </button>
            </form>
            <h3 className={styles.newsDetail__subtitle}>
                Комментарии
            </h3>
            <ul className={styles.newsDetail__comments}>
                {
                    newsDetailPost.comments.map(comment => <li key={comment.id}>
                        <Comment comment={comment}/>
                    </li>)
                }
            </ul>

        </section>
    );
};

export default NewsDetail;