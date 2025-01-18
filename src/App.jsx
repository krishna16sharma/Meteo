import Inputs from "./components/Inputs";
import TempAndDetails from "./components/TempAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const capitalizeFirstLetter = (string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [query, setQuery] = useState({q: 'bengaluru'})
  const [coordinates, setCoordinates] = useState({ lat: 12.9716, lon: 77.5946 });
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  const getWeather = async() =>{
        const cityName = query.q ? query.q : 'current location';
        toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);

        try {
            await getFormattedWeatherData({...query, units}).then((data) =>{
              toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
              setWeather(data);
              console.log(data);

              setCoordinates({ lat: data.lat, lon: data.lon });
          });
        } catch (error) {
            toast.error(`Failed to fetch weather data. Please check the city name and try again.`);
            console.error("Weather data fetch error:", error);
        }
       
  }

  useEffect(() => { 
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-600 to-blue-800';
    const threshold = units === 'metric' ? 22 : 72;
    if (weather.temp <= threshold) return 'from-cyan-600 to-blue-800';
    return 'from-yellow-600 to-orange-700';
  }

  return (
    <div className={`mx-auto py-5 px-4 md:px-32 bg-gradient-to-br shadow-xl
    shadow-gray-400 ${formatBackground()}`}>
        <TopButtons setQuery={setQuery}/>
        <Inputs setQuery={setQuery} setUnits={setUnits} formatBackground={formatBackground} coordinates={coordinates} setCoordinates={setCoordinates}/>

        {weather && (
            <>
            <TimeAndLocation weather={weather}/>
            <TempAndDetails weather={weather} units={units}/>
            <Forecast title='3 hour step forecast' data={weather.hourly} units={units}/>
            <Forecast title='daily forecast' data={weather.daily} units={units}/>
            </>
        )}

        <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  )
}

export default App