import { useRef, useState, useEffect } from 'react';
import styles from './main.module.scss'
import Video from './Video';
import Profile from './Profile';
import {getChannels, findGetChannel, deleteChannel, createTheme, getThemes, deleteTheme, getVideos, GetCurrentKeyAPI} from '../serviceFunctions';
import Subscribes from './Subscribes';
import { connect } from 'react-redux';

const Main = ({currentMenu, currentTheme, filterPeriod,  dispatch}) => {
    const [themes, setThemes] = useState(['---']);
    const [channels, setChannels] = useState(['---']);
    const [videos, setVideos] = useState();

    useEffect(() => {
        getThemes(setThemes);
    },[] );
    
    useEffect(() => {
       getChannels(currentTheme, setChannels, setVideos, filterPeriod);
    },[currentTheme, filterPeriod ])

    const addChannel = async (nameChannel) => {
        await findGetChannel(nameChannel, currentTheme);
        getChannels(currentTheme, setChannels, setVideos, filterPeriod);
    }
    const delChannel = async (id) => {
        deleteChannel(id, currentTheme) ;
        getChannels(currentTheme, setChannels, setVideos, filterPeriod);
    }
    const addTheme = (nameTheme) => {
        createTheme(nameTheme);
        getThemes(setThemes);
    }
    const delTheme = (nameTheme) => {
        deleteTheme(nameTheme);
        getThemes(setThemes)
        dispatch({
            type: "THEME",
            theme: "Default"
        });
    }
    
    return (
        <div className={styles.main}>
            {currentMenu === 'Videos' && <Video videos={videos} />}
            {currentMenu === 'Subscribes' && <Subscribes channels={channels}  addChannel={addChannel} delChannel={delChannel} currentTheme={currentTheme}/>}
            {currentMenu === 'Profile' && <Profile  addTheme={addTheme} themes={themes} delTheme={delTheme}/>}
        </div>
    )
}

const mapStateFromProps = ({currentMenu,currentTheme,filterPeriod}) => {
    return {
        currentMenu,
        currentTheme,
        filterPeriod
    }
}

export default connect(mapStateFromProps)(Main);