import { useState, useEffect, useTransition } from 'react';
import styles from './main.module.scss'
import Videos from './Videos';
import {getChannels, findGetChannel, deleteChannel, createGroup, getGroups, deleteGroup} from '../../service functions/serviceFunctions';
import Subscribes from './Subscribes';
import { connect } from 'react-redux';
import Groups from './Groups';
import About from './About';

const Main = ({currentMenu, currentGroup, filterPeriod,  dispatch}) => {
    const [groups, setGroups] = useState(['---']);
    const [channels, setChannels] = useState(['---']);
    const [videos, setVideos] = useState();
    const dispathIsLoading = () => dispatch({
        type: 'LOADING',
        isLoadingVideo: false
    })
    useEffect(() => {
        getGroups(setGroups);
    },[] );

    useEffect(() => {
        getChannels(currentGroup, setChannels, setVideos, filterPeriod, dispathIsLoading);
    },[currentGroup, filterPeriod, currentMenu ])

    const addChannel = async (nameChannel) => {
        let founded = await findGetChannel(nameChannel, currentGroup);
        getChannels(currentGroup, setChannels, setVideos, filterPeriod, dispathIsLoading);
        return founded;
    }
    const delChannel = (id) => {
        deleteChannel(id, currentGroup) ;
        getChannels(currentGroup, setChannels, setVideos, filterPeriod, dispathIsLoading);
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
            {currentMenu === 'Videos' && <Videos videos={videos}  />}
            {currentMenu === 'Subscribes' && <Subscribes channels={channels}  addChannel={addChannel} delChannel={delChannel} currentGroup={currentGroup}/>}
            {currentMenu === 'Groups' && <Groups  addGroup={addGroup} groups={groups} delGroup={delGroup}/>}
            {currentMenu === 'About' && <About  />}
        </div>
    )
}

const mapStateFromProps = ({currentMenu, currentGroup, filterPeriod}) => {
    return {
        currentMenu,
        currentGroup,
        filterPeriod
    }
}

export default connect(mapStateFromProps)(Main);