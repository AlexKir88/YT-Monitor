import styles from './DatePublish.module.scss';
import { connect } from 'react-redux';
import { useEffect, useRef } from 'react';

const DatePublish = ({filterPeriod, dispatch}) => {
    let currentButton = useRef(null); //because dispatch cleanup ref
    useEffect(() => {
        //there set date publish, currentButton = "filterPeriod"
        // return () => currentButton.style = '';
    })
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
            <button className={styles.button} val={1} > day</button>
            <button className={styles.button} val={7}> week</button>
            <button className={styles.button} val={30}> month</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        filterPeriod: state.filterPeriod
    }
}
export default connect(mapStateToProps)(DatePublish);