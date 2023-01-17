import styles from './header.module.scss';
import MenuButtons from './MenuButtons';

const Header = () => {
    const onClick = (e) => {
        indexedDB.deleteDatabase('main');
        console.log('DB delete');
        e.preventDefault();
    }
    return (
        <div className={styles.head}>
            <span className={styles.header}>YouTube monitor</span>
            <MenuButtons />
            <button className={styles.clearDB} onClick={onClick}>clear DB</button>
        </div>
    )
}

export default Header;