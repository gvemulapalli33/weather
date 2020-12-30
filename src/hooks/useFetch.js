import  {useState, useEffect} from "react";

export default function useFetch(url) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState({});
    
    const getData = async (url) => {
        try {
            setLoading(true);
            let response = await fetch(url);
            let data = await response.json();
            console.log(data);
            localStorage.setItem("weather", JSON.stringify(data));
            setData(data);
        } catch(error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData(url);
    }, []);

    return [loading, error, data];
}