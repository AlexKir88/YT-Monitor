import styles from './Videos.module.scss';
import  DatePablish from './DatePublish';
import { connect } from 'react-redux';

const Videos = ({videos, filterPeriod, videosIsLoading, language}) => {
    let videosList = videos?.filter((item) => {
        return item.timeIndex <= filterPeriod
    })
    let loadedVideos = (<div className={styles.videos}>
                    {videosList?.map(item => {
                        return (
                            <div className={styles.flexItem} key={item.videoId}>
                                <a  href={`https://www.youtube.com/watch?v=${item.videoId}`} target = '_blank'  className={styles.anchor}> 
                                    <img 
                                        className={styles.video} 
                                        src = {item.thumbnail}
                                        alt='name'
                                    />
                                    <div className={styles.cont}>
                                        <div className={styles.duration}>{item.duration}</div>
                                        <div className={styles.nameVideo}>{item.title}</div>
                                        <div className={styles.channel}>{item.channelTitle}</div>
                                        <div className={styles.date}>{item.publishedAt}</div>
                                    </div>
                                    
                                </a>
                            </div>
                        )
                       
                    })}
            </div>)
    let Spinner = (
        <div className={styles.spinner}>
                <img src= {require('../../imgs/loading-gif.gif') }width='150' />
        </div>
    )
    return (
        <div>
            <div className={styles.dates}>
                <DatePablish />
            </div>
            {videosIsLoading ? Spinner: loadedVideos}
            {!videosIsLoading && !videosList?.length && language.noVideo }
        </div>
        
    )
}

const mapStateProps = ({filterPeriod, videosIsLoading, language}) => {
    return {
        filterPeriod,
        videosIsLoading,
        language
    }
}

export default connect(mapStateProps)(Videos);