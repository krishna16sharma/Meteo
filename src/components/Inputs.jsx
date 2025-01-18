  import {BiSearch, BiCurrentLocation, BiWorld} from "react-icons/bi";
  import Tooltip from "./Tooltip";
  import {useState} from "react";
  import { ToastContainer, toast } from 'react-toastify';
  import ReactModal from "react-modal";
  import Map from "./Map";

  const Inputs = ({query, setQuery, units, setUnits, formatBackground, coordinates, setCoordinates}) => {
    const [city, setCity] = useState("");
    const [isMapOpen, setIsMapOpen] = useState(false);


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
          setCoordinates({ lat: latitude, lon: longitude });
          setQuery({ q: "" });
        },
        (error) => {
          toast.error("Unable to retrieve location. Please check your browser settings.");
        }
      );
      } else {
        toast.error("Geolocation is not supported by your browser.")
      }
    }

    return (
      <div className="flex flex-row flex-wrap justify-center my-6">
          <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
              <Tooltip text="Optional: Enter in 'City, Countrycode' format for better results">
                <input type="text" placeholder="Search by city..." 
                className="text-gray-500 text-sm md:text-xl font-medium p-2 w-full shadow-xl capitalize focus:outline-none
                placeholder:lowercase rounded-2xl" value={city} onChange={(e)=> setCity(e.currentTarget.value)}
                onKeyDown={handleSearchKey}
                />
              </Tooltip>
              <div>
                <Tooltip text="Search">
                  <BiSearch size={30} className="cursor-pointer transition ease-out hover:scale-125"
                  onClick={handleSearchClick}/>
                </Tooltip>
              </div>
              <div>
                <Tooltip text="Current location weather">
                  <BiCurrentLocation size={30} className="cursor-pointer transition ease-out hover:scale-125"
                  onClick={handleLocationClick}/>
                </Tooltip>
              </div>
              <div>
                <Tooltip text="Interactive Map">
                  <BiWorld
                    size={30}
                    className="cursor-pointer transition ease-out hover:scale-125"
                    onClick={() => setIsMapOpen(true)}
                  />
                </Tooltip>
            </div>
          </div>
          <div className="flex flex-row w-1/4 items-center justify-center">
              <div>
                <Tooltip text="Celsius">
                  <button className="text-2xl font-medium transition ease-out hover:scale-125"
                  onClick={() => setUnits("metric")}>°C</button>
                </Tooltip>
              </div>
              <p className="text-2xl font-medium mx-2">|</p>
              <div>
                <Tooltip text="Farhenheit">
                  <button className="text-2xl font-medium transition ease-out hover:scale-125"
                  onClick={() => setUnits("imperial")}>°F</button>
                </Tooltip>
              </div>
          </div>

          <ReactModal
            isOpen={isMapOpen}
            onRequestClose={() => setIsMapOpen(false)}
            className={`relative w-4/5 h-4/5 mx-auto my-12 rounded-2xl shadow-lg p-4 bg-gradient-to-br ${formatBackground()}`}
            overlayClassName="fixed inset-0 bg-black bg-opacity-70"
          >
            <button
              className="absolute z-[450] top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition ease-out"
              onClick={() => setIsMapOpen(false)}
            >
              <b>X</b>
            </button>
            <Map coordinates={coordinates} setQuery={setQuery} setCoordinates={setCoordinates}/>
        </ReactModal>
      </div>
    )
  }

  export default Inputs