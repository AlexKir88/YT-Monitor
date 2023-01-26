import styles from './About.module.scss'
import { connect } from 'react-redux';
import { sendInTlg } from '../privatData';

const About = ({language}) => {
    const send = (e) => {
        if (e.target.tagName == "BUTTON") {
            let name = e.currentTarget[0].value;
            let contacts = e.currentTarget[1].value;
            let contents = e.currentTarget[2].value;
            sendInTlg('/' + 'message' + '/' + name + '/' + contacts + '/' + contents + '/');
            e.currentTarget[0].value = '';
            e.currentTarget[1].value = '';
            e.currentTarget[2].value = '';
        }
    }
    return(
        <div>
            <div className={styles.textAbout}>
                {language.about}
            </div>
            <div className={styles.textFeedback}>
                {language.Feedback}
                <form onClick={send}>
                    <input name='name' type='text' placeholder={language.placeholderName} className={styles.input}/>
                    <input name='contact' type='text' placeholder={language.placeholderContact} className={styles.input}/>
                    <textarea name='content' placeholder={language.placeholderContent} className={styles.area}></textarea>
                    <button  type='button' className={styles.button} >{language.buttonSend}</button>
                </form>
            </div>
        </div>
       
    )
}

const mapStateToProps = ({language}) => {
    return {
        language
    }
}

export default connect(mapStateToProps)(About);