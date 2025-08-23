import React from 'react'

const AnalyticData = ({info}) => {
  return (
    <>
      {info.map((item, index) => (
        <div key={index} className='shadow-md shadow-slate-400 flex flex-col px-4 py-8 gap-3 rounded-sm'>
          <h1 className='text-slate-900 text-xl font-bold'>
          Date :  {item.clickDate}
          </h1>
          <p className='text-slate-900 text-xl font-bold'>
          Count:  {item.count}
          </p>
        </div>
      ))}
    </>
  )
}

export default AnalyticData