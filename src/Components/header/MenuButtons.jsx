import styles from './header.module.scss';
import { connect } from 'react-redux';


const MenuButtons = ({dispatch}) => {
    return(
        <form onClick={(e) => {
            dispatch({
                type: 'MENU',
                menu: e.target.name,
            });
            e.preventDefault();
        }}>
            <button className={styles.buttonMenu} type='button' name='Videos'>Videos</button>
            <button className={styles.buttonMenu} type='button' name='Subscribes'>Subscribes</button>
            <button className={styles.buttonMenu} type='button' name='Profile'>Profile</button>
        </form>
    )
}

export default connect()(MenuButtons);