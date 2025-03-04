import axios from "axios";
import {  createContext, ReactNode, useEffect, useState,  } from "react";
import { Server } from "../../Server";

type FetchContext={
    categories: string[],
    servicesData: string[],
   
}

export const FetchContext = createContext<FetchContext|null>(null)



type FetchContextProviderProps={
  children:ReactNode
 
}

const FetchContextProvider: React.FC<FetchContextProviderProps> =({children})=>{
    const [categories ,setCategories] =useState([])
    const [servicesData, setServicesData] = useState([]);

    useEffect(() => {
        axios.get(`${Server}/get-category`).then((res) => {
          setCategories(res.data.categoryget || []); // Ensure it's an array
        }).catch((error) => {
          console.error("Error fetching categories:", error);
        });
      }, []);

      useEffect(() => {
        axios.get(`${Server}/get-service`).then((res) => {
          const services= res.data.serviceget
                  const underservice = services.filter((item:any)=>item.underService === null)
                 setServicesData(underservice) 
        }).catch((error) => {
          console.error("Error fetching services:", error);
        });
      },[])
  

   return(
    <FetchContext.Provider value={{categories , servicesData}}>
     {children}
   
    </FetchContext.Provider>
   )

}
export default  FetchContextProvider