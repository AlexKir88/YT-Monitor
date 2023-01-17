import styles from './DatePublish.module.scss';
import { connect } from 'react-redux';
import { dayPreInMonth } from '../serviceFunctions';

const countDay = dayPreInMonth();
const DatePublish = ({filterPeriod, dispatch}) => {
    const setStyle = (num) => {
        if (num == filterPeriod) {
            return '1px solid red'
        }
        return '';
    }
    const onClick = (e) => {
        if(e.target.className) {
            dispatch({
                type: 'PERIOD',
                filterPeriod: e.target.getAttribute('val')
            })
        }
        e.preventDefault();
    }
    return (
        <div className={styles.footer} onClick={onClick}>
            <button className={styles.button} val={1} style={{border : setStyle(1)}}> day</button>
            <button className={styles.button} val={7} style={{border : setStyle(7)}}> week</button>
            <button className={styles.button} val={countDay} style={{border : setStyle(countDay)}}> month</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        filterPeriod: state.filterPeriod
    }
}
export default connect(mapStateToProps)(DatePublish);