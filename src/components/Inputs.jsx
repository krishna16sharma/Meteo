import {BiSearch, BiCurrentLocation} from "react-icons/bi";
import {useState} from "react";

const Inputs = ({setQuery, setUnits}) => {
  const [city, setCity] = useState("");

  // handles searchbar when search button is clicked
  const handleSearchClick = () => {
    if (city !== '') setQuery({q: city});
  }

  // Handles searchbar when 'enter' is pressed
  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      if (city !== '') setQuery({q: city});
    }
  }

  const handleLocationClick = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) =>{
        const {latitude, longitude}= position.coords
        setQuery({lat: latitude, lon: longitude})
      })
    }
  }

  return (
    <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
            <input type="text" placeholder="Search by city..." 
            className="text-gray-500 text-xl font-medium p-2 w-4/5 shadow-xl capitalize focus:outline-none
            placeholder:lowercase rounded-2xl" value={city} onChange={(e)=> setCity(e.currentTarget.value)}
            onKeyDown={handleSearchKey}
            />
            <BiSearch size={30} className="cursor-pointer transition ease-out hover:scale-125"
            onClick={handleSearchClick}/>
            <BiCurrentLocation size={30} className="cursor-pointer transition ease-out hover:scale-125"
            onClick={handleLocationClick}/>
        </div>
        <div className="flex flex-row w-1/4 items-center justify-center">
            <button className="text-2xl font-medium transition ease-out hover:scale-125"
            onClick={() => setUnits("metric")}>°C</button>
            <p className="text-2xl font-medium mx-2">|</p>
            <button className="text-2xl font-medium transition ease-out hover:scale-125"
            onClick={() => setUnits("imperial")}>°F</button>
        </div>
    </div>
  )
}

export default Inputs