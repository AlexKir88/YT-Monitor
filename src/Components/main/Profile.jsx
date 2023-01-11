import styles from './Profile.module.scss';
import { connect } from 'react-redux';

const Profile = ({dispatch, addIndexedDB}) => {

    const pressEnter = (e) => {
        if (!(e.code === 'Enter' || e.code === 'NumpadEnter')) {
            return
        };
        if (!e.target.value) {
            console.log('error')
            return
        };
        addIndexedDB(e.target.value);
      
        e.target.value = '';
    }

    const passAction = (e) => {
        dispatch({
            type: 'THEME',
            theme: e.target.value
        })
        e.preventDefault();
    }
    return (
        <div>
            <input className={styles.input} onKeyDown={pressEnter} placeholder='input name theme...'/>
            <div className={styles.press}>Press 'Enter' for add theme</div>
            <div onClick={passAction}>
                <input readOnly defaultValue='Default' className={styles.button} />
                <input readOnly defaultValue='Default2' className={styles.button} />
            </div>
        </div>
    )
}

export default connect()(Profile)