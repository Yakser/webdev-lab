'use client';
import React from 'react';
import Link from "next/link";

type CustomLinkProps = {
    className: string;
    href: string;
    children: React.ReactNode;
}
const CustomLink: React.FC<CustomLinkProps> = ({href, className, children}) => {

    return (
        <Link className={className} href={href} onClick={() => window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })}>
            {children}
        </Link>
    );
};

export default CustomLink;