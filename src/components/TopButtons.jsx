import React from 'react'

const TopButtons = ({setQuery}) => {
    const cities = [
        {
            id: 1,
            name: "London"          
        },
        {
            id: 2,
            name: "New Delhi"

        },
        {
            id: 3,
            name: "New York"
        },
        {
            id: 4,
            name: "Sydney"
        },
        {
            id: 5,
            name: "Tokyo"
        },
        {
            id: 6,
            name: "Toronto"
        }
    ]

  return (
    <div className='flex flex-wrap items-center justify-around gap-4 my-6'>
        {
            cities.map((city)=>(
                <button key={city.id} 
                className='text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-2xl transition ease-in' 
                onClick={() => setQuery({q: city.name})}>{city.name}</button>
            ))
        }
    </div>
  )
}

export default TopButtons