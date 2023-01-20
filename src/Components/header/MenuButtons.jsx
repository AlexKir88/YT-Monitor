import styles from './header.module.scss';
import { connect } from 'react-redux';

const MenuButtons = ({dispatch, currentMenu}) => {

    const matchName = (el) => {
        if(el == null) return;
        if (el.name === currentMenu ) {
            el.style.border = '1px solid red' 
        } else {
            el.style = '';
        }
    }

    const onClick = (e) => {
        if(e.target.tagName === 'BUTTON') {
            dispatch({
                type: 'MENU',
                menu: e.target.name,
            });
        }
        e.preventDefault();
    }
    return(
        <form onClick={onClick} >
            <button className={styles.buttonMenu} ref={matchName} type='button' name='Videos'>Videos</button>
            <button className={styles.buttonMenu} ref={matchName} type='button' name='Subscribes'>Subscribes</button>
            <button className={styles.buttonMenu} ref={matchName} type='button' name='Groups'>Groups</button>
            <button className={styles.buttonMenu} ref={matchName} type='button' name='About'>About</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        currentMenu: state.currentMenu, 
    }
}

export default connect(mapStateToProps)(MenuButtons);