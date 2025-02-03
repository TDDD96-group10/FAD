import { useState, useEffect } from "react";

interface UseApiReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useApi<T> (fetchFunction: () => Promise<{ data: T }>): UseApiReturn<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchFunction();
                setData(response.data);
              } catch (err) {
                setError((err as Error).message);
              } finally {
                setLoading(false);
              }
        };
        fetchData();
    }, [fetchFunction]) 
    return { data, loading, error };
}