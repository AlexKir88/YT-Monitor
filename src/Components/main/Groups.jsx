import styles from './Groups.module.scss';
import { connect } from 'react-redux';
import { BsTrash } from 'react-icons/bs';

const Groups = ({dispatch, addGroup, groups, delGroup, language}) => {

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
            group: e.target.name || 'Default'
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
            <input className={styles.input} onKeyDown={pressEnter} placeholder={language.inputName}/>
            <div className={styles.press}>{language.pressEnterGroup}</div>
            <div onClick={passAction} className={styles.groupList}>
                {groups.map((item) => {
                    let visibility = item === 'Default' ? 'hidden': 'visible';
                    let chechDefaultGroup = (item) => {
                        if(item === 'Default') return language.defaultGroup;
                        return item;
                    }
                    return (
                        <div key={item}>
                            <button  className={styles.button} name={item}>{chechDefaultGroup(item)} 
                                <BsTrash size={20} className={styles.trash} style={{visibility}} onClick={(e) => deleteGroup(e, item)} />
                            </button>
                        </div>)
                })}
            </div>
        </div>
    )
}
const mapStateFromProps = ({language}) => {
    return {
        language
    }
}
export default connect(mapStateFromProps)(Groups)