import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

//context + useReducer
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

//Note: reducers need to be pure functions hence API request can not be made in reducer function
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        //make it active state on created
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        //return its active state on deleted
        currentCity: {},
      };

    case "cities/rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unkown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  //fetch cities function
  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching cities...",
        });
      }
    }
    fetchCities();
  }, []);

  //optimising getCity to avoid rerendering
  const getCity = useCallback(
    //to get the current city using the id
    async function getCity(id) {
      //prevent loading city if it's already active
      if (Number(id) === currentCity.id) return;
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching city...",
        });
      }
    },
    [currentCity.id]
  );

  //to add to city API
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  //to delete city in API
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
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
