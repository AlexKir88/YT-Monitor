import styles from './header.module.scss';
import MenuButtons from './MenuButtons';
import {getThemes} from '../serviceFunction'

const Header = () => {
    const onClick = (e) => {
        indexedDB.deleteDatabase('main');
        console.log('DB delete');
        e.preventDefault();
    }
    const getThemesHeder = () => {
        getThemes(function(e) {
            console.log(e +'4');
        })
    }

    return (
        <div className={styles.head}>
            <span className={styles.header}>YouTube video monitor</span>
            <MenuButtons />
            <button onClick={onClick}>clear DB</button>
            <button onClick={getThemes}>get themes</button>
        </div>
    )
}

export default Header;