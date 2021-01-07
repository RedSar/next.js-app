import {useState} from 'react';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css';

export default function Home({countries}) {
  const [keyword, setKeyword] = useState('');

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );
  const fetchSearchResults = ({length}) => {
    if (length > 1) {
      return `Found ${length} countries`;
    } else if (length === 1) {
      return `One country found !`;
    } else {
      return 'No country found, try again!';
    }
  };
  const OnInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.count}>
          {fetchSearchResults(filteredCountries)}
        </div>
        <div className={styles.input}>
          <SearchInput
            placeholder='Filter by Name, Region or SubRegion'
            onChange={OnInputChange}
          />
        </div>
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  try {
    const res = await fetch('https://restcountries.eu/rest/v2/all');

    const countries = await res.json();

    return {
      props: {
        countries,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
