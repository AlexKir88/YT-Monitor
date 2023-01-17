import styles from './header.module.scss';
import { connect } from 'react-redux';
import { useEffect, useRef } from 'react';

const MenuButtons = ({dispatch}) => {
    let currentButton = useRef(null);
    useEffect( (el) => {
        currentButton.style.border ='1px solid red';
    },[])
    const setRef = (el) => {
        // currentButton.current.style = '';
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
            <button className={styles.buttonMenu} ref={el => currentButton = el } type='button' name='Videos'>Videos</button>
            <button className={styles.buttonMenu}  type='button' name='Subscribes'>Subscribes</button>
            <button className={styles.buttonMenu}  type='button' name='Groups'>Groups</button>
        </form>
    )
}

export default connect()(MenuButtons);