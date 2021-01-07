import {useState} from 'react';
import Link from 'next/link';
import styles from './CountriesTable.module.css';
import SortArrow from './SortArrow';

const orderBy = (countries, value, direction) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === 'desc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  } else return [...countries];
};
const CountriesTable = ({countries}) => {
  const [direction, setDirection] = useState('');
  const [value, setValue] = useState('');

  const switchDirection = () => {
    if (!direction) setDirection('desc');
    else if (direction === 'desc') setDirection('asc');
    else setDirection(null);
  };

  const switchDirectionAndValue = (val) => {
    switchDirection();
    setValue(val);
  };

  const orderedCountries = orderBy(countries, value, direction);

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => switchDirectionAndValue('name')}>
          <div>Name</div>

          {value === 'name' && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_population}
          onClick={() => switchDirectionAndValue('population')}>
          <div>Population</div>
          {value === 'population' && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_area}
          onClick={() => switchDirectionAndValue('area')}>
          <div>
            Area (Km<sup style={{fontSize: '.6rem'}}>2</sup>)
          </div>
          {value === 'area' && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_gini}
          onClick={() => switchDirectionAndValue('gini')}>
          <div>Gini</div>
          {value === 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountries.map((country) => (
        <Link href={`country/${country.alpha3Code}`} key={country.alpha3Code}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>
              {country.population || '--'}
            </div>
            <div className={styles.area}>{country.area || '--'}</div>
            <div className={styles.gini}>{country.gini || '--'}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default CountriesTable;
