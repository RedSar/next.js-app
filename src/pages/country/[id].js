import {StylesProvider} from '@material-ui/core';
import Layout from '../../components/Layout/Layout';
import styles from './country.module.css';
const Country = ({country}) => {
  const {name, flag, region, population, area} = country;
  return (
    <Layout>
      <div className={styles.overview_panel}>
        <img src={flag} alt={name} />
        <h1 className={styles.overview_name}>{name}</h1>
        <div className={styles.overview_region}>{region}</div>
        <div className={styles.overview_numbers}>
          <div className={styles.overview_population}>
            <div className={styles.overview_value}>{population}</div>
            <div className={styles.overview_label}>Population</div>
          </div>
          <div className={styles.overview_area}>
            <div className={styles.overview_value}>{area}</div>
            <div className={styles.overview_label}>Area</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({params}) => {
  try {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${params.id}`
    );
    const country = await res.json();

    return {
      props: {country},
    };
  } catch (error) {
    console.error(error);
  }
};
