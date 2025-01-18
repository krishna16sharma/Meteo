import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TempAndDetails = ({
    weather:{
        details,
        icon,
        temp,
        temp_min,
        temp_max,
        sunrise,
        sunset,
        speed,
        humidity,
        feels_like
    },
    units
}) => {
    const addtnlDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty, /* necessary to make Icon captial*/
            title: "Feels like",
            value: `${feels_like.toFixed()}°${units === "metric" ? 'C':'F'}`
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${humidity.toFixed()}%`
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind",
            value: `${speed.toFixed()} ${units === "metric" ? 'm/s':'mph'}`
        }
    ]

    const horizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: "Sunrise",
            value: sunrise
        },
        {
            id: 2,
            Icon: GiSunset,
            title: "Sunset",
            value: sunset
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: "High",
            value: `${temp_max.toFixed()}°${units === "metric" ? 'C':'F'}`
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: "Low",
            value: `${temp_min.toFixed()}°${units === "metric" ? 'C':'F'}`
        }
    ]

  return (
    <div className="px-2 md:px-4">
        <div className="flex items-center justify-center py-6 text-base md:text-xl text-cyan-200 font-medium">
            <p>{details}</p>
        </div>
        <div className="flex flex-row items-center justify-between py-3">
            <img src={icon} alt="weather icon"
            className="w-20 md:w-25"/>
            <p className="text-3xl md:text-5xl">{`${temp.toFixed()}°${units === "metric" ? 'C':'F'}`}</p>
            <div className="flex flex-col space-y-3 items-start md:items-center">
                {
                    addtnlDetails.map(({id, Icon, title, value}) => (
                        <div key={id} className="flex font-light text-sm items-center justify-center">
                            <Icon size={18} className="mr-1"/>
                            {`${title}: `} 
                            <span className="font-medium ml-1">{value}</span>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center space-x-6 space-y-3 md:space-y-0 md:space-x-10 text-sm py-3">
            {
                horizontalDetails.map(({id, Icon, title, value})=>(
                    <div key={id} className="flex flex-row items-center">
                            <Icon size={30} /> 
                            <p className="font-light ml-1">
                                {`${title}: `}
                                <span className="font-medium ml-1">{value}</span>
                            </p>
                        </div>
                ))
            }
        </div>
    </div>
  )
}

export default TempAndDetails