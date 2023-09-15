import styles from './page.module.scss'



export default function Home() {
    return (
        <section className={styles.home}>
            <h2 className={`title ${styles.home__title}`}>
                webdev-lab
            </h2>
        </section>
    )
}
