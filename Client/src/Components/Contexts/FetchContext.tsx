import axios from "axios";
import { Children, createContext, ReactNode, useEffect, useState,  } from "react";
import { Server } from "../../Server";

type FetchContext={
    categories: string[],
   
}

export const FetchContext = createContext<FetchContext|null>(null)



type FetchContextProviderProps={
   
  children:ReactNode
}

const FetchContextProvider: React.FC<FetchContextProviderProps> =({children})=>{
    const [categories ,setCategories] =useState([])


    useEffect(() => {
        axios.get(`${Server}/get-category`).then((res) => {
          setCategories(res.data.categoryget || []); // Ensure it's an array
        }).catch((error) => {
          console.error("Error fetching categories:", error);
        });
      }, []);
      
  

   return(
    <FetchContext.Provider value={{categories ,}}>
     {children}
    </FetchContext.Provider>
   )

}
export default  FetchContextProvider