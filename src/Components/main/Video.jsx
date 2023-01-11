import styles from './Video.module.scss'

const Video = () => {
    return (
        <img 
        className={styles.video} 
        width='200' 
        src='./download.jpg'
        alt='name'/>
    )
}

export default Video;