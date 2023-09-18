import styles from './page.module.scss'



export default function Home() {
    return (
        <section className={styles.home}>
            <h2 className={`title ${styles.home__title}`}>
                webdev-lab - новостное веб-приложение
            </h2>
            {/*<p className={styles.home__text}>*/}
            {/*    Список фичей:*/}
            {/*</p>*/}
            {/*<ul className={styles.home__list}>*/}
            {/*    <li className={styles.home__listItem}>jwt auth</li>*/}
            {/*    <li className={styles.home__listItem}>email рассылка</li>*/}
            {/*    <li className={styles.home__listItem}>REST API на DRF</li>*/}
            {/*    <li className={styles.home__listItem}>роли пользователей</li>*/}
            {/*    <li className={styles.home__listItem}>websocket broadcasting, notifications</li>*/}
            {/*    <li className={styles.home__listItem}>caching</li>*/}
            {/*    <li className={styles.home__listItem}>task queues</li>*/}
            {/*    <li className={styles.home__listItem}>task scheduling</li>*/}
            {/*</ul>*/}

        </section>
    )
}
