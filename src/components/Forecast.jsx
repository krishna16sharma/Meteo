import React from 'react'

const Forecast = ({title, data, units}) => {
  return (
    <div>
      <div className='flex item-center justify-start mt-6'>
        <p className='font-medium uppercase'>{title}</p>
      </div>
      <hr className='my-1'/>
      <div className='flex item-center justify-between'>
        {
          data.map((d, index)=>(
            <div key={index}
            className='flex flex-col items-center justify-center'>
              <p className='text-sm'>{d.title}</p>
              <img src={d.icon} alt="forecast icon" className='w-12 my-1'/>
              <p className='font-medium'>{`${d.temp.toFixed()}°${units === "metric" ? 'C':'F'}`}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Forecast