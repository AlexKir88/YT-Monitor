import styles from './header.module.scss';
import MenuButtons from './MenuButtons';
import {getVideos} from '../serviceFunction'

const Header = () => {
    const onClick = (e) => {
        indexedDB.deleteDatabase('main');
        console.log('DB delete');
        e.preventDefault();
    }
    return (
        <div className={styles.head}>
             {/* <button onClick={getVideos}>get videos</button> */}
            <span className={styles.header}>YouTube video monitor</span>
            <MenuButtons />
            <button className={styles.clearDB} onClick={onClick}>clear DB</button>
        </div>
    )
}

export default Header;