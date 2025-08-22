import dayjs from 'dayjs';
import { div } from 'motion/react-client';
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { CheckmarkIcon } from 'react-hot-toast';
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa'
import { IoIosCopy, IoMdAnalytics, IoMdRemoveCircleOutline, IoMdStarOutline } from 'react-icons/io';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../contextApi/ContextApi';
import { ThreeCircles } from 'react-loader-spinner';
import Graph from '../DashBoard/Graph';
import AnalyticData from './AnalyticData';
import { useQueryClient } from 'react-query';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {

  const navigate = useNavigate()

  const { token } = useStoreContext();

  const [isCopied, setIsCopied] = useState(false)
  const [loader, setLoader] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState("")
  const [analyticsToggle, setAnalyticsToggle] = useState(false)
  const [analyticsData, setAnalyticsData] = useState([])
  const [deleted, setDeleted] = useState(null)
  const [urls, setUrls] = useState([]);

  const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(/^https?:\/\//, "");
  const queryClient = useQueryClient();

  const fetchUrls = async () => {
  const response = await api.get("/api/urls/myurls", { headers: { Authorization: `Bearer ${token}` } });
  setUrls(response.data);
};

useEffect(() => {
  fetchUrls();
}, []);

  const analyticHandler = async (shortUrl) => {
    if (!analyticsToggle) {
      setSelectedUrl(shortUrl)

    }
    setAnalyticsToggle(!analyticsToggle)
  }
  

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrl()
    }
  }, [selectedUrl])

const deleteHandler = async () => {
    try {
      await api.delete(`/api/urls/${shortUrl}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      queryClient.invalidateQueries(['my-shortenurls', token]);
    } catch (error) {
      console.error("Failed to delete URL", error);
    }
  };




  const fetchMyShortUrl = async () => {
    setLoader(true)
    try {
      const { data } = await api.get(`/api/urls/analytics/${selectedUrl}?startDate=2025-01-01T00:00:00&&endDate=2025-12-29T23:59:59`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      })
      setAnalyticsData(data)
    } catch (error) {
      navigate("/error")
      console.log(error)
    } finally {
      setLoader(false)

    }
  }
  return (
    <div className='bg-slate-100 shadow-lg border border-dotted  border-slate-500 px-6 sm:py-1 py-3 rounded-md  transition-all duration-100'>
      <div className='flex sm:flex-row flex-col  sm:justify-between w-full sm:gap-0 gap-5 py-5 '>
        <div className='flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden '>
          <div className='text-slate-900 pb-1 sm:pb-0   flex items-center gap-2 '>
            <a href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
              target="_blank"
              className=" text-[17px]  font-montserrat font-[600] text-linkColor ">
              {subDomain + "/" + `${shortUrl}`}
            </a>
            <FaExternalLinkAlt className='text-blue-600' />
          </div>
          <div className="flex items-center gap-1 ">
            <h3 className=" text-slate-700 font-[400] text-[17px] ">
              {originalUrl}
            </h3>
          </div>
          <div className="flex   items-center gap-8 pt-6 ">
            <div className="flex gap-1  items-center font-semibold  text-green-800">
              <span>
                <IoMdStarOutline className="text-[22px] me-1" />
              </span>
              <span className="text-[16px]">{clickCount}</span>
              <span className="text-[15px] ">
                {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
              </span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-lg text-slate-800">
              <span>
                <FaRegCalendarAlt />
              </span>
              <span className="text-[17px]">
                {dayjs(createdDate).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex  flex-1  sm:justify-end items-center gap-4">
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
          >
            <div className='flex cursor-pointer gap-1 items-center bg-purple-500 py-2  font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white'>
              <button className=''>{isCopied ? "Copied" : "Copy"}</button>
              {isCopied ? (
                <CheckmarkIcon className="text-md" />
              ) : (
                <IoIosCopy className="text-md" />
              )}
            </div>

          </CopyToClipboard>
          <div
            onClick={() => analyticHandler(shortUrl)}
            className='flex cursor-pointer gap-1 items-center bg-blue-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white'
          >
            <button>Analytics</button>
            <IoMdAnalytics className='text-md' />

          </div>
          <div
  onClick={() => deleteHandler(shortUrl)}
  className="flex cursor-pointer gap-1 items-center bg-rose-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white"
>
  <button>Delete</button>
  <IoMdRemoveCircleOutline className="text-md" />
</div>
        </div>
      </div>
      <React.Fragment>
        <div className={`${analyticsToggle ? "flex" : "hidden"} max-h-100 sm:mt-0 mt-5 min-h-96 relative border-t-2 w-[100%] overflow-hidden`}>
          {loader ? (
            <div className='min-h-[calc(450px-140px)] flex justify-center items-center w-full'>
              <div className='flex flex-col items-center gap-1'>

                <ThreeCircles
                  visible={true}
                  height="100"
                  width="100"
                  color="#4fa94d"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
          
                />
                <p >Please wait...</p>

              </div>

            </div>
          ) : (<>
          { analyticsData.length===0 && (
            <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                            <h1 className=" text-slate-800 font-serif sm:text-2xl text-[15px] font-bold mb-1">
                                No Data For This Time Period
                            </h1>
                            <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-slate-600 ">
                                Share your short link to view where your engagements are
                                coming fromccc
                            </h3>
                        </div>)
                        }
                        <Graph myUrlList  ={analyticsData}/>
                        {/* <AnalyticData info={analyticsData}/> */}
                        </>
          )}
        </div>
      </React.Fragment>
    </div>
  )
}

export default ShortenItem