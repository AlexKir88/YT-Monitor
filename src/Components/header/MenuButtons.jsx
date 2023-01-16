import styles from './header.module.scss';
import { connect } from 'react-redux';
import { useRef } from 'react';

const MenuButtons = ({dispatch}) => {
    let currentButton = useRef(null);
    const setRef = (el) => {
        currentButton.tagName && ( currentButton.style = '');
        currentButton = el;
        currentButton.style.border = '1px solid red';
    }
    const onClick = (e) => {
        if(e.target.tagName === 'BUTTON') {
            setRef(e.target);
            dispatch({
                type: 'MENU',
                menu: e.target.name,
            });
        }
        e.preventDefault();
    }
    return(
        <form onClick={onClick}>
            <button className={styles.buttonMenu}  type='button' name='Videos'>Videos</button>
            <button className={styles.buttonMenu}  type='button' name='Subscribes'>Subscribes</button>
            <button className={styles.buttonMenu}  type='button' name='Profile'>Profile</button>
        </form>
    )
}

export default connect()(MenuButtons);