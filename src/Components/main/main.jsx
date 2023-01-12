import { useRef, useState, useEffect } from 'react';
import styles from './main.module.scss'
import Video from './Video';
import Profile from './Profile';
import {getChannels, findGetChannel, deleteChannel, createTheme, getThemes, deleteTheme} from '../serviceFunction.jsx';
import Subscribes from './Subscribes';
import { connect } from 'react-redux';

const Main = ({currentMenu, currentTheme, dispatch}) => {
    const [themes, setThemes] = useState(['---']);
    const [channels, setChannels] = useState(['---']);
    useEffect(() => {
        getThemes(setThemes);
    },[] );
    useEffect(() => {
        getChannels(currentTheme,setChannels);
    },[currentTheme])

    const addChannel = async (nameChannel) => {
        await findGetChannel(nameChannel, currentTheme);
        getChannels(currentTheme, setChannels);
    }
    const delChannel = async (id) => {
        deleteChannel(id, currentTheme) ;
        getChannels(currentTheme,setChannels);
    }
    const addTheme = (nameTheme) => {
        createTheme(nameTheme);
        getThemes(setThemes)
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
            {currentMenu === 'Videos' && <Video />}
            {currentMenu === 'Subscribes' && <Subscribes channels={channels}  addChannel={addChannel} delChannel={delChannel} currentTheme={currentTheme}/>}
            {currentMenu === 'Profile' && <Profile  addTheme={addTheme} themes={themes} delTheme={delTheme}/>}
        </div>
    )
}

const mapStateFromProps = ({currentMenu,currentTheme}) => {
    return {
        currentMenu,
        currentTheme
    }
}

export default connect(mapStateFromProps)(Main);