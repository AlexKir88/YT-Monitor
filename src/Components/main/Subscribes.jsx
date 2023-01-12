import styles from './Subscribes.module.scss';
import DatePablish from './DatePublish';
import { BsTrash } from 'react-icons/bs';


const Subscribes = ({channels, addChannel, delChannel, currentTheme}) => {

    const pressEnter = (e) => {
        if (!(e.code === 'Enter' || e.code === 'NumpadEnter')) {
            return
        };
        if (!e.target.value) {
            console.log('error')
            return
        };
        addChannel(e.target.value);
      
        e.target.value = '';
    }
      
    const onClickCheck = (e) => console.log(e.target.checked);
  
    return (
        <div> 
            <DatePablish />
            <div className={styles.searchDiv}>
                <input type='text' placeholder="Search channel..." className={styles.search} onKeyDown={pressEnter} />
                <div>Press Enter</div>
                <div className={styles.theme}>{currentTheme}</div>
            </div>
            {channels.map((item) => {
                return (
                    <div className={styles.channels} key={item.id}>
                            <input type='checkbox' className={styles.input} defaultChecked={item.checked} onChange={onClickCheck}/> 
                            <BsTrash size={23} className={styles.trash} onClick={() => delChannel(item.id)} />
                            <div className={styles.channel}>{item.title} </div>  
                            <div className={styles.descript}>{item.description} </div>              
                    </div> 
                )
            })}
        </div>
    )
}

export default Subscribes;