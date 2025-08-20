import React, { useState } from 'react'
import { dummydata } from './DummyData'
import Graph from './Graph'
import { useStoreContext } from '../contextApi/ContextApi'
import { useFetchMyShortUrl, useFetchTotalClicks } from '../hooks/useQuery'
import ShortenPopUp from '../components/ShortenPopUp'
import ShortenUrlList from '../components/ShortenUrlList'
import { FaLink } from 'react-icons/fa'
import { useQueryClient } from 'react-query'

const DashBoardLayout = () => {
  const{token}= useStoreContext(); 
  function onError(){
    console.log("ERROR")
  }
  
  const queryClient = useQueryClient();

  const [shortPopUp, setShortPopUp] = useState(false)
  const{isLoading : loader,data:totalClicks}= useFetchTotalClicks(token,onError);
    const{isLoading ,data:myShortenUrl,refetch}= useFetchMyShortUrl(token,onError);
    
  // console.log(useFetchTotalClicks(token,onError))

  return (
    <div className='lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]'>
      {loader? (<p className="text-center text-blue-600 text-lg font-semibold animate-pulse">
  Loading...
</p>):(
       <div className="lg:w-[90%] w-full mx-auto py-16">
            <div className=" h-96 relative ">
                {totalClicks.length === 0 && (
                     <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                     <h1 className=" text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                       No Data For This Time Period
                     </h1>
                     <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-sm text-slate-600 ">
                       Share your short link to view where your engagements are
                       coming from
                     </h3>
                   </div>)}
                <Graph myUrlList={totalClicks}/>
            </div>
            <div className='py-5 sm:text-end text-center'>
              <button className='bg-blue-500 p-3 rounded-2xl text-white font-semibold' onClick={()=>setShortPopUp(true)}>Create a new Short Url</button>
            </div>
            <div className=''>
              {!isLoading && myShortenUrl.length===0?(
                     <div className="flex justify-center pt-16">
                  <div className="flex gap-2 items-center justify-center  py-6 sm:px-8 px-5 rounded-md   shadow-lg  bg-gray-50">
                    <h1 className="text-slate-800 font-montserrat   sm:text-[18px] text-[14px] font-semibold mb-1 ">
                      You haven't created any short link yet
                    </h1>
                    <FaLink className="text-blue-500 sm:text-xl text-sm " />
                  </div>
              </div>
              ):(
                 <ShortenUrlList data={myShortenUrl} />
              )}
            </div>
        </div>
      )}
      <ShortenPopUp refetch={refetch} open={shortPopUp} setOpen={setShortPopUp} />
    </div>
    
  )
}

export default DashBoardLayout