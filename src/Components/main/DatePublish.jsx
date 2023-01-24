import styles from './DatePublish.module.scss';
import { connect } from 'react-redux';
import { objTimeIndex } from '../dateFunction';

const DatePublish = ({filterPeriod, language, dispatch}) => {
    const setStyle = (indexPeriod) => {
        if (indexPeriod == filterPeriod) {
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
            <button className={styles.button} val={objTimeIndex.day} style={{border : setStyle(objTimeIndex.day)}}> {language.buttonDay}</button>
            <button className={styles.button} val={objTimeIndex.wee} style={{border : setStyle(objTimeIndex.wee)}}> {language.buttonWeek}</button>
            <button className={styles.button} val={objTimeIndex.mon} style={{border : setStyle(objTimeIndex.mon)}}> {language.buttonMonth}</button>
            <button className={styles.button} val={objTimeIndex.yea} style={{border : setStyle(objTimeIndex.yea)}}> {language.buttonYear}</button>
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