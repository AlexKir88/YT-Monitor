import styles from './Video.module.scss'
import  DatePablish from './DatePublish'


const Video = ({videos}) => {
    console.log(videos);
    return (
        <div>
            <div className={styles.dates}>
                <DatePablish />
            </div>
            <div className={styles.videos}>
                
                {/* {videos.map(item => console(item.videoId))} */}
                <a href='https://www.youtube.com/watch?v=JXoZ95ko7H8' target = '_blank'> 
                    <img 
                    className={styles.video} 
                    width='200' 
                    src = 'https://i.ytimg.com/vi/JXoZ95ko7H8/default.jpg'
                    alt='name'
                    />
                    <span>{}</span>
                 </a>
            </div>
            
        </div>
        
    )
}

export default Video;