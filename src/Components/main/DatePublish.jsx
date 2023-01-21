import styles from './DatePublish.module.scss';
import { connect } from 'react-redux';
import { dayPreInMonth } from '../serviceFunctions';

const countDay = dayPreInMonth();
const DatePublish = ({filterPeriod, language, dispatch}) => {
    const setStyle = (num) => {
        if (num == filterPeriod) {
            return '5px solid rgb(141, 137, 130, 0.5)'
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
            <button className={styles.button} val={1} style={{border : setStyle(1)}}> {language.buttonDay}</button>
            <button className={styles.button} val={7} style={{border : setStyle(7)}}> {language.buttonWeek}</button>
            <button className={styles.button} val={countDay} style={{border : setStyle(countDay)}}> {language.buttonMonth}</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        filterPeriod: state.filterPeriod,
        language: state.language
    }
}
export default connect(mapStateToProps)(DatePublish);