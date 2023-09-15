'use client';

import React from 'react';
import {useAppSelector} from '@/utils/hooks';
import styles from './index.module.scss'
    ;
import Link from "next/link";

const UserCard = () => {
    const {user} = useAppSelector((state) => state.auth);
    return (
        <div className={styles.userCard}>
            <Link className={styles.userCard__name} href={'/profile'}>
                {user.first_name} {user.last_name}
            </Link>
            <Link href={'/profile'}>
                <div className={styles.userCard__avatar}></div>
            </Link>
        </div>
    );
};

export default UserCard;