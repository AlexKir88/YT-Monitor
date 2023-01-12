import styles from './DatePublish.module.scss';
import { connect } from 'react-redux';

const DatePublish = ({dispatch}) => {
    const onClick = (e) => {
        dispatch({
            type: 'PERIOD',
            filterPeriod: e.target.getAttribute('val')
        })
    }
    return (
        <div className={styles.footer} onClick={onClick}>
            <button className={styles.button} val={1} > day</button>
            <button className={styles.button} val={7}> week</button>
            <button className={styles.button} val={30}> month</button>
        </div>
    )
}

export default connect()(DatePublish);