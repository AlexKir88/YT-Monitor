import styles from './header.module.scss';
import MenuButtons from './MenuButtons';

const Header = () => {
    return (
        <div className={styles.head}>
            <span className={styles.header}>YouTube video monitor</span>
            <MenuButtons />
        </div>
    )
}

export default Header;