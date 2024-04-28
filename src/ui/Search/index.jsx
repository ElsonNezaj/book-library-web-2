import Magnifier from "../../icons/Magnifier";
import styles from './styles.module.scss';

export default function Search(props) {
    return (
        <label className={styles.root}>
            <input {...props} className="search" name="search" placeholder="Search" />
            <Magnifier />
        </label>
    )
}