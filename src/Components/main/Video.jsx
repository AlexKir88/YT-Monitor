import styles from './Video.module.scss'
import  DatePablish from './DatePublish'
import { useEffect, useState } from 'react'

const Video = ({videos}) => {
    return (
        <div>
            <div className={styles.dates}>
                <DatePablish />
            </div>
            {/* {panding && <img src='https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-25.jpg' alt="loading..."  width="200" />} */}
            <div className={styles.videos}>
                    {videos?.map(item => {
                        return (
                            <div className={styles.flexItem} key={item.videoId}>
                                 <a  href={`https://www.youtube.com/watch?v=${item.videoId}`} target = '_blank'  className={styles.anchor}> 
                                <img 
                                    className={styles.video} 
                                    src = {item.thumbnails}
                                    alt='name'
                                />
                                <div className={styles.nameVideo}>{item.title}</div>
                                <div className={styles.channel}>{item.channelTitle}</div>
                                <div className={styles.date}>{new Date(item.publishedAt).toLocaleDateString('ru')}</div>
                                </a>
                            </div>
                        )
                       
                    })}
            </div>
        </div>
        
    )
}

export default Video;