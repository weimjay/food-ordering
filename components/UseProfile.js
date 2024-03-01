import {useEffect, useState} from "react";

export default function useProfile() {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data);
                setLoading(false);
            })
        })
    }, []);

    return {loading, data};
}