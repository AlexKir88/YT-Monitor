import styles from './Groups.module.scss';
import { connect } from 'react-redux';
import { BsTrash } from 'react-icons/bs';

const Groups = ({dispatch, addGroup, groups, delGroup}) => {

    const pressEnter = (e) => {
        if (!(e.code === 'Enter' || e.code === 'NumpadEnter')) {
            return
        };
        if (!e.target.value) {
            console.log('error')
            return
        };
        addGroup(e.target.value);
        e.target.value = '';
    }

    const passAction = (e) => {
        if(e.target.toString() === '[object SVGSVGElement]') return;
        dispatch({
            type: 'GROUP',
            group: e.target.name
        })
         dispatch({
            type: 'MENU',
            menu: 'Subscribes'
        })
        e.preventDefault();
    };
    const deleteGroup = (e, item) => {
        delGroup(item);
        e.preventDefault();
    }

    return (
        <div>
            <input className={styles.input} onKeyDown={pressEnter} placeholder='  input name group...'/>
            <div className={styles.press}>Press 'Enter' for add group</div>
            <div onClick={passAction} className={styles.groupList}>
                {groups.map((item) => {
                    let visibility = item === 'Default' ? 'hidden': 'visible';
                    return (
                        <div key={item}>
                            <button  className={styles.button} name={item}>{item} 
                                <BsTrash size={20} className={styles.trash} style={{visibility}} onClick={(e) => deleteGroup(e, item)} />
                            </button>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default connect()(Groups)