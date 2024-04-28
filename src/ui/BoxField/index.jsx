import styles from './styles.module.scss'

const BoxField = ({ title, ...props }) => {
    return (
        <label className={`${styles.root} btn-border`}>
            <input
                type="checkbox"
                {...props}
            />
            {title}
        </label>
    )
}

export default BoxField