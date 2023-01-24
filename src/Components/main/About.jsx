import styles from './About.module.scss'
import { connect } from 'react-redux';

const About = ({language}) => {
    return(
        <div className={styles.textAbout}>
            {language.about}
        </div>
    )
}

const mapStateToProps = ({language}) => {
    return {
        language
    }
}

export default connect(mapStateToProps)(About);