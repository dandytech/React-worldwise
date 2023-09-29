import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
// import PropTypes from "prop-types";

// CityList.propTypes = {
//   cities: PropTypes.array.isRequired, // Assuming cities is an array
//   isLoading: PropTypes.bool.isRequired,
// };

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  console.log(cities);

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities && cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
