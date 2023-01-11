import styles from './DatePublish.module.scss'

const DatePublish = () => {
    return (
        <div className={styles.footer}>
            <button className={styles.button}>1 day</button>
            <button className={styles.button}>1 week</button>
            <button className={styles.button}>1 month</button>
        </div>
    )
}

export default DatePublish;