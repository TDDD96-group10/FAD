import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { HttpResponse } from "../api/Api";

interface UseApiReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface CallApiReturn<T> {
  data: T |null 
  loading: boolean;
  error: string | null;
  callApi: () => Promise<void>;
}



export  function callApi<T> (
  fetchFunction: () => Promise<{ data: T }>,
  navigateTo?: string
  ): CallApiReturn<T>  {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); 
  
    const callApi = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetchFunction();
        setData(response.data);
        if (navigateTo) {
          navigate(navigateTo);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
        
    
    return { data, loading, error,callApi };
}


export function useApi<T> (
  fetchFunction: () => Promise<{ data: T ,status: number}>,
  navigateTo?: string
  ): UseApiReturn<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); 
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchFunction();
               
                setData(response.data);
                if (navigateTo) {
                    navigate(navigateTo);
                }
              } catch (err ) {
                
                if (err instanceof Error) {
                  setError(err.message);
                } else if (typeof err === "object" && err !== null && "status" in err) {
                  const errorWithStatus = err as { status: number };

                  setError(`Error ${errorWithStatus.status}: `);
                  if (errorWithStatus.status == 401){
                    navigate("/login");
                  }
                } else {
                  setError("An unknown error occurred");
                }
                
               
              } finally {
                setLoading(false);
              }
        };
        fetchData();
    }, []) 
    return { data, loading, error };
}