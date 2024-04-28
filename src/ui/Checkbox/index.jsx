import styles from './styles.module.scss'

const Checkbox = ({ title, ...props }) => {
    return (
        <label className={styles.root}>
            <input
                type="checkbox"
                {...props}
            />
            {title}
        </label>
    )
}

export default Checkbox