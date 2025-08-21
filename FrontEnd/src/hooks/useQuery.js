
import { useQuery } from "react-query"
import api from "../api/api"

// 3 parameter
//useQuery("query Key",Async Funtion Where to make use of axios, make use to traform the data)


export const useFetchMyShortUrl =(token,onError)=>{
   return useQuery(['my-shortenurls', token],async()=>{
    return api.get(
        "/api/urls/myurls",
         {
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                Authorization:"Bearer "+token,
            }
         }
    
    )
   },{
    select:(data)=>{
     return data.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)); //sorting <3
  
    
    },
    onError,
    staleTime: 5000
   })
}


export const useFetchTotalClicks =(token,onError)=>{
   return useQuery("total-clicks",async()=>{
    return api.get(
        "/api/urls/totalClicks?startDate=2025-01-01&endDate=2025-12-29",
         {
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                Authorization:"Bearer " + token,
            }
         }
    
    )
   },{
    select:(data)=>{ //data is the response we get from api //select is funtion made by useQuery
        //data.data =>
            //{
            //     "2025-01-01":2,
            // }
        const convertToArray = Object.keys(data.data).map((key)=>({
            clickDate:key,
            count:data.data[key]
        }))

        // Object.keys(data.data) => [data.data]=>the keys [ "2025-01-01", "2025-01-01", "2025-01-01"]
        //key will be the date "2025-01-01"
        //data.data[keys]= they are the values of the keys : that will be : 2
        return convertToArray;
    },
    onError,
    staleTime: 5000
   })
}