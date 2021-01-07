import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons';
import styles from './CountriesTable.module.css';

const SortArrow = ({direction}) => {
  if (!direction) return '';
  if (direction === 'desc')
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color='inherit' />
      </div>
    );
  if (direction === 'asc')
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color='inherit' />
      </div>
    );
};

export default SortArrow;
