'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/utils/hooks";
import api from "@/utils/api";
import {Comment as CommentType} from "@/utils/types";
import CommentWithControls from "@/app/components/CommentWithConrols";
import styles from './page.module.scss';
import Head from "next/head";

const Page = () => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const router = useRouter();
    const {user} = useAppSelector((state) => state.auth);


    const removeComment = (commentId: number) => {
        setComments(comments.filter(comment => comment.id != commentId));
    }

    useEffect(() => {
        if (!user.is_staff) {
            return;
        }
        api.get('/comments/unmoderated/').then((response) => {
            const data = response.data;
            setComments(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [user.is_staff]);

    if (!user.is_staff) {
        return router.push('/');
    }

    return (
        <section className={styles.admin}>
            <Head>
                <title>webdev-lab | Админ-панель</title>
            </Head>
            <h2 className={'title'}>Админ-панель</h2>
            <ul className={styles.admin__commentsList}>
                {
                    comments.map(comment => <li key={comment.id} className={styles.admin__commentsListItem}>
                        <CommentWithControls comment={comment} approveCallback={removeComment}
                                             deleteCallback={removeComment}/>
                    </li>)
                }
            </ul>
        </section>
    );
};

export default Page;