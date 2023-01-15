import { useEffect } from 'react';
import styles from './Profile.module.scss';
import { connect } from 'react-redux';
import { getThemes} from '../serviceFunctions';
import { BsTrash } from 'react-icons/bs';

const Profile = ({dispatch, addTheme, themes, delTheme}) => {
    // let themes = getThemes();
    const pressEnter = (e) => {
        if (!(e.code === 'Enter' || e.code === 'NumpadEnter')) {
            return
        };
        if (!e.target.value) {
            console.log('error')
            return
        };
        addTheme(e.target.value);
      
        e.target.value = '';
    }

    const passAction = (e) => {
        if(e.target.toString() === '[object SVGSVGElement]') return;
        dispatch({
            type: 'THEME',
            theme: e.target.value
        })
        e.preventDefault();
    };
    const deleteTheme = (e, item) => {
        delTheme(item);
        e.preventDefault();
    }

    return (
        <div>
            <input className={styles.input} onKeyDown={pressEnter} placeholder='input name theme...'/>
            <div className={styles.press}>Press 'Enter' for add theme</div>
            <div onClick={passAction}>
                {themes.map((item) => {
                    let visibility = item === 'Default' ? 'hidden': 'visible';
                    return (<div key={item}> <input readOnly defaultValue={item}  className={styles.button} />
                    <BsTrash size={20} className={styles.trash} style={{visibility}} onClick={(e) => deleteTheme(e, item)} />
                    </div>)
                })}
            </div>
        </div>
    )
}

export default connect()(Profile)