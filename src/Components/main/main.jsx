import { useState, useEffect, useTransition } from 'react';
import styles from './main.module.scss'
import Video from './Video';
import {getChannels, findGetChannel, deleteChannel, createGroup, getGroups, deleteGroup} from '../serviceFunctions';
import Subscribes from './Subscribes';
import { connect } from 'react-redux';
import Groups from './Groups';

const Main = ({currentMenu, currentGroup, filterPeriod,  dispatch}) => {
    const [groups, setGroups] = useState(['---']);
    const [channels, setChannels] = useState(['---']);
    const [videos, setVideos] = useState();
    
    useEffect(() => {
        getGroups(setGroups);
    },[] );

    useEffect(() => {
        getChannels(currentGroup, setChannels, setVideos, filterPeriod);
    },[currentGroup, filterPeriod])

    const addChannel = async (nameChannel) => {
        await findGetChannel(nameChannel, currentGroup);
        getChannels(currentGroup, setChannels, setVideos, filterPeriod);
    }
    const delChannel = (id) => {
        deleteChannel(id, currentGroup) ;
        getChannels(currentGroup, setChannels, setVideos, filterPeriod);
    }
    const addGroup = (nameGroup) => {
        createGroup(nameGroup);
        getGroups(setGroups);
    }
    const delGroup = (nameGroup) => {
        dispatch({
            type: "GROUP",
            group: "Default"
        });
        deleteGroup(nameGroup);
        getGroups(setGroups)
        
    }
    
    return (
        <div className={styles.main}>
            {currentMenu === 'Videos' && <Video videos={videos}  />}
            {currentMenu === 'Subscribes' && <Subscribes channels={channels}  addChannel={addChannel} delChannel={delChannel} currentTheme={currentGroup}/>}
            {currentMenu === 'Groups' && <Groups  addGroup={addGroup} groups={groups} delGroup={delGroup}/>}
        </div>
    )
}

const mapStateFromProps = ({currentMenu,currentGroup,filterPeriod}) => {
    return {
        currentMenu,
        currentGroup,
        filterPeriod
    }
}

export default connect(mapStateFromProps)(Main);