import React from 'react';
import styles from './index.module.scss';

type IconProps = {
    width: number;
    height: number;
    className?: string;
    children: React.ReactNode;

}
const Icon: React.FC<IconProps> = ({width=24, height=24, children, className}) => {
    return (
        <div style={{
            width: `${width}px`,
            height: `${height}px`
        }} className={styles.icon}>
            {children}
        </div>
    );
};

export default Icon;