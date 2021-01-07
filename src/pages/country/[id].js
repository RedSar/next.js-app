import Layout from '../../components/Layout/Layout';
import styles from './Country.module.css';

const getCountyByAlphCode = async (alphaCode) => {
  try {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${alphaCode}`
    );
    const country = await res.json();
    return country;
  } catch (err) {
    console.error(err);
  }
};

const getNeighbours = async ({ borders }) => {
  return Promise.all(
    borders.map((alphaCode) => getCountyByAlphCode(alphaCode))
  );
};

const Country = ({ country, neighbours }) => {
  const {
    name,
    flag,
    region,
    population,
    area,
    capital,
    languages,
    subregion,
    currencies,
    nativeName,
    gini,
  } = country;
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.overview_column}>
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
        </div>
        <div className={styles.details_column}>
          <div className={styles.detail_panel}>
            <div className={styles.detail_heading}>Details</div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Capital</div>
              <div className={styles.detail_value}>{capital}</div>
            </div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Subregion</div>
              <div className={styles.detail_value}>{subregion}</div>
            </div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Languages</div>
              <div className={styles.detail_value}>
                {languages.map(({ name }) => name).join(', ')}
              </div>
            </div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Capital</div>
              <div className={styles.detail_value}>{capital}</div>
            </div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Currencies</div>
              <div className={styles.detail_value}>
                {currencies
                  .map(({ name, symbol }) => `${name} (${symbol})`)
                  .join(', ')}
              </div>
            </div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Native name</div>
              <div className={styles.detail_value}>{nativeName}</div>
            </div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Gini</div>
              <div className={styles.detail_value}>{gini} %</div>
            </div>
            <div className={styles.detail_borders}>
              <div className={styles.detail_label}>Neighbouring Countries</div>

              <div className={styles.detail_neighbours_container}>
                {neighbours.map((neighbour) => (
                  <div
                    className={styles.detail_neighbour}
                    key={neighbour.alpha3Code}
                  >
                    <img src={neighbour.flag} alt={neighbour.name} />
                    {/* <div
                  className={styles.detail_neighbour_flag}
                  style={{ backgroundImage: `url(${neighbour.flag})` }}
                /> */}
                    <div className={styles.detail_neighbour_name}>
                      {neighbour.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  try {
    const country = await getCountyByAlphCode(params.id);

    const neighbours = await getNeighbours(country);
    return {
      props: { country, neighbours },
    };
  } catch (error) {
    console.error(error);
  }
};
