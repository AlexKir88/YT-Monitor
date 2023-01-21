import styles from './header.module.scss';
import { connect } from 'react-redux';

const MenuButtons = ({dispatch, currentMenu, language}) => {

    const matchName = (el) => {
        if(el == null) return;
        if (el.name === currentMenu ) {
            el.style.border = '5px solid rgb(141, 137, 130, 0.5)' 
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
            <button className={styles.buttonMenu} ref={matchName} type='button' name='Videos'>{language.buttonVideo}</button>
            <button className={styles.buttonMenu} ref={matchName} type='button' name='Subscribes'>{language.buttonSubscribes}</button>
            <button className={styles.buttonMenu} ref={matchName} type='button' name='Groups'>{language.buttonGroups}</button>
            <button className={styles.buttonMenu} ref={matchName} type='button' name='About'>{language.buttonAbout}</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        currentMenu: state.currentMenu, 
        language: state.language
    }
}

export default connect(mapStateToProps)(MenuButtons);