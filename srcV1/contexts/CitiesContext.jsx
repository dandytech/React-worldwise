import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  //fetch cities function
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch (err) {
        //console.error(err.message);
        alert("There was an error fetching data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  //to get the current city using the id
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      //console.error(err.message);
      alert("There was an error fetching data...");
    } finally {
      setIsLoading(false);
    }
  }

  //to add to city API
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error creating city.");
    } finally {
      setIsLoading(false);
    }
  }

  //to delete city in API
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      //console.error(err.message);
      alert("There was an error deleting city.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

//to consume the context
function useCities() {
  const context = useContext(CitiesContext);
  //check if context is used outside the provider
  if (context === undefined)
    throw new Error("citiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
