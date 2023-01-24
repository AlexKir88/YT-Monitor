import styles from './Videos.module.scss';
import  DatePablish from './DatePublish';
import { connect } from 'react-redux';

const Videos = ({videos, filterPeriod}) => {
    let videosList = videos?.filter((item) => {
        console.log(item.timeIndex + '/' + filterPeriod)
        return item.timeIndex <= filterPeriod
    })
    return (
        <div>
            <div className={styles.dates}>
                <DatePablish />
            </div>
            <div className={styles.videos}>
                    {videosList?.map(item => {
                        return (
                            <div className={styles.flexItem} key={item.videoId}>
                                <a  href={`https://www.youtube.com/watch?v=${item.videoId}`} target = '_blank'  className={styles.anchor}> 
                                    <img 
                                        className={styles.video} 
                                        src = {item.thumbnail}
                                        alt='name'
                                    />
                                    <div className={styles.nameVideo}>{item.title}</div>
                                    <div className={styles.channel}>{item.channelTitle}</div>
                                    <div className={styles.date}>{item.publishedAt}</div>
                                </a>
                                <div className={styles.duration}>{item.duration}</div>
                            </div>
                        )
                       
                    })}
            </div>
        </div>
        
    )
}

const mapStateProps = ({filterPeriod}) => {
    return {
        filterPeriod
    }
}

export default connect(mapStateProps)(Videos);