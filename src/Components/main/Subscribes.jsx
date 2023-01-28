import { useRef, useState } from 'react';
import styles from './Subscribes.module.scss';
import { BsTrash } from 'react-icons/bs';
import { connect } from 'react-redux';


const Subscribes = ({channels, addChannel, delChannel, currentGroup, language}) => {
    const notFound =useRef();
    const pressEnter = (e) => {
        if (!(e.code === 'Enter' || e.code === 'NumpadEnter' || e.keyCode === 13)) {
            return
        };
        if (!e.target.value) {
            console.log('error')
            return
        };
        addChannel(e.target.value);
      
        e.target.value = '';
    }
    const checkDefaultGroup = (group) => {
        if(group === 'Default') return language.defaultGroup;
        return group;
    }
    return (
        <div> 
            <div className={styles.searchDiv}>
                <input type='text' placeholder={language.placeholderSearch} className={styles.search} onKeyDown={pressEnter} />
                <div className={styles.notFound} ref={notFound}>not found channel</div>
                <div>{language.pressEnter}</div>
                <div className={styles.theme}>{checkDefaultGroup(currentGroup)}</div>
            </div>
            {channels.map((item) => {
                return (
                    <div className={styles.channels} key={item.id}>
                        <div>
                            <img className={styles.thumbnails} src={item.thumbnails} alt={item.title}/>
                            <div className={styles.channel}>{item.title} </div> 
                            <div className={styles.descript}>{item.description} </div> 
                            <BsTrash size={23} className={styles.trash} onClick={() => delChannel(item.id)} />
                        </div>
                    </div> 
                )
            })}
        </div>
    )
}
const mapStateFromProps = ({language}) => {
    return {
        language
    }
}
export default connect(mapStateFromProps)(Subscribes);