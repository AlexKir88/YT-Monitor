import styles from './header.module.scss';
import MenuButtons from './MenuButtons';
import { connect } from 'react-redux';
import { RU, EN } from '../../service functions/languages'; 

const Header = ({language, dispatch}) => {
    const clearDB = (e) => {
        indexedDB.deleteDatabase('main');
        console.log('DB delete');
        e.preventDefault();
    }
    const toggleRus = () => {
        dispatch({
            type: 'LANGUAGE',
            language: RU
        })
    }
    const toggleEng = () => {
        dispatch({
            type: 'LANGUAGE',
            language: EN
        })
    }
    const mathLang = (el) => {
        if(el == null) return;
        if (el.name === language.id) {
            el.style.border = '5px solid rgb(141, 137, 130, 0.5)' 
        } else {
            el.style = '';
        }
    }

    return (
        <div className={styles.head}>
            <div className={styles.header}>YouTube monitor</div>
            <MenuButtons />
            <div className={styles.lang}>
                <button onClick={toggleRus} ref={mathLang} name="RU">RU</button>
                <button onClick={toggleEng} ref={mathLang} name="EN">EN</button>
            </div>
            <button className={styles.clearDB} onClick={clearDB}>{language.buttonClearDB}</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        language: state.language
    }
}
export default connect(mapStateToProps)(Header);