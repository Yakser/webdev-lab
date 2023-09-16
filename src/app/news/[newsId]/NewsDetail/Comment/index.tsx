import React from 'react';
import {Comment as CommentType} from '@/utils/types';
import styles from './index.module.scss';
import {formatDatetime} from "@/utils/helpers";

type CommentProps = {
    comment: CommentType;
}
const Comment: React.FC<CommentProps> = ({comment}) => {
    return (
        <div className={styles.comment}>
            <time className={styles.comment__datetimeCreated} dateTime={comment.datetime_created}>
                {formatDatetime(comment.datetime_created)}
            </time>
            <div className={styles.comment__header}>
                <div className={styles.comment__avatar}></div>
                <p>{comment.author.first_name} {comment.author.last_name}</p>
            </div>
            <p className={styles.comment__text}>{comment.text}</p>
        </div>
    );
};

export default Comment;