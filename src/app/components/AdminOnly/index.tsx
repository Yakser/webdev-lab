'use client';

import React from 'react';
import {useAppSelector} from "@/utils/hooks";
import styles from "@/app/components/UserCard/index.module.scss";
import Link from "next/link";

type AdminPanelLinkProps = {
    children: React.ReactNode;
}

const AdminOnly: React.FC<AdminPanelLinkProps> = ({children}) => {
    const {user} = useAppSelector((state) => state.auth);
    return (
        <>
            {
                user.is_staff && (
                    children
                )
            }

        </>
    );
};

export default AdminOnly;