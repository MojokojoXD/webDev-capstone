import {useState,useEffect} from 'react';


export default function useLoading(){
    const [loading,setloading] = useState(true);

    useEffect(() => {
        setTimeout(() => setloading(false),500)
    },[setloading])

    return loading;
}