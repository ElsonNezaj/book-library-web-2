import { Fragment } from "react";
import styles from './rating.module.scss';

const Ratings = ({ ratings }) => {
    const totalRatings = Object.values(ratings).reduce((sum, count) => sum + count, 0);
    const ratingSum = Object.entries(ratings).reduce((sum, [rating, count]) => sum + (rating * count), 0);
    console.log(ratingSum)
    return (
        <div className={styles.root}>
            {Object.keys(ratings).map(rating => (
                <Fragment key={rating}>
                    <p>{rating}</p>
                    <div>
                        {totalRatings > 0 && <div style={{ width: `${(ratings[rating] * 100 / totalRatings).toFixed(2)}%` }}></div>}
                    </div>
                    <p>{ratings[rating]}</p>
                </Fragment>
            ))}
        </div>
    )
}

export default Ratings;