import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";

export default function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="Product" element={<Product />} />
          <Route path="Pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />

          <Route path="app" element={<AppLayout />}>
            {/* Nexted Route or Children Routes of AppLayout component*/}
            <Route
              // using the Navigate to redirect and place cities in URL without clicking on it
              index
              element={<Navigate replace to="cities" />}
            />
            <Route path="cities" element={<CityList />} />

            {/* params route to capture city id to be stored in URL */}
            <Route path="cities/:id" element={<City />} />

            <Route path="countries" element={<CountryList />} />

            <Route path="form" element={<Form />} />
          </Route>

          {/* Implement page not found if all the about did not match URL typed */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}
