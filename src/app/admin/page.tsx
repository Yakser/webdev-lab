'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/utils/hooks";
import api from "@/utils/api";
import {Comment as CommentType} from "@/utils/types";
import CommentWithControls from "@/app/components/CommentWithConrols";
import styles from './page.module.scss';

const Page = () => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const router = useRouter();
    const {user} = useAppSelector((state) => state.auth);

    // if (!user.is_staff) {
    //     router.push('/');
    // }

    const removeComment = (commentId: number) => {
        setComments(comments.filter(comment => comment.id != commentId));
    }

    useEffect(() => {
        api.get('/comments/unmoderated/').then((response) => {
            const data = response.data;
            setComments(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <section className={styles.admin}>
            <h2 className={'title'}>Админ-панель</h2>
            <ul className={styles.admin__commentsList}>
                {
                    comments.map(comment => <li key={comment.id} className={styles.admin__commentsListItem}>
                        <CommentWithControls comment={comment} approveCallback={removeComment} deleteCallback={removeComment}/>
                    </li>)
                }
            </ul>
        </section>
    );
};

export default Page;