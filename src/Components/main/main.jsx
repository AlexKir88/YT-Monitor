import { useRef, useState, useEffect } from 'react';
import styles from './main.module.scss'
import Video from './Video';
import Profile from './Profile';
import {getChannels, findGetChannel, deleteChannel, createTheme, getThemes} from '../serviceFunction.jsx';
import Subscribes from './Subscribes';
import { connect } from 'react-redux';

const Main = ({currentMenu}) => {
    
    const [channels, setChannels] = useState(getChannels());

    const addChannel = async (nameChannel) => {
        await findGetChannel(nameChannel);
        const newChannels = getChannels();
        setChannels(newChannels);
    }
    const delChannel = async (id) => {
        deleteChannel(id) ;
        const newChannels = getChannels();
        setChannels(newChannels);
    }
    const addTheme = (nameTheme) => {
        createTheme(nameTheme);
    }
    
    return (
        <div className={styles.main}>
            {currentMenu === 'Videos' && <Video />}
            {currentMenu === 'Subscribes' && <Subscribes channels={channels}  addChannel={addChannel} delChannel={delChannel}/>}
            {currentMenu === 'Profile' && <Profile  addTheme={addTheme} />}
        </div>
    )
}

const mapStateFromProps = ({currentMenu}) => {
    return {
        currentMenu
    }
}

export default connect(mapStateFromProps)(Main);