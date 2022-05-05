import axios from 'axios';
import { useState,useEffect,useContext } from 'react';
import { authContext } from '../App';
import { useNavigate } from 'react-router-dom';

const baseURL = "http://localhost:4000";

export default function useAxios(operation,body){
    const[dashData,setDashData] =useState('')
    const [data, setData] = useState('');
    const [error,setError] = useState(false);
    const [loading,setloading] = useState(true);
    const [serverErr,setServerErr] = useState('');
    const {getAuth} = useContext(authContext);
    const navigate = useNavigate();

    const getCountries = async() => {
        try{
            let {data: countries} = await axios.get("https://restcountries.com/v3.1/all?fields=name");
    
            countries.sort((a,b) => a.name.common.localeCompare(b.name.common));
            setData(countries);
            
        }catch(err){
            setError(true)
        }finally{
            setloading(false)
        }
    }
    
    const register = async () => {
        setloading(true);
        try{
            const {data:registerRes} = await axios.post(`${baseURL}/register`,body)
            if(registerRes === 'Username taken'){setServerErr(registerRes)}
        }catch(error){
            console.log(error, 'test');
            setError(true)
        }finally{
            setloading(false)
        }
    }

    const login = async () => {
        const{username,password} = body;

        try{
            await axios.post(`${baseURL}/login`,{username,password},
            {withCredentials:true});

            setError(false);
        }catch(error){
            setError(true);
        }finally{
            setloading(false);
        }
    }

    
    const auth = async () => {
      try {
        const { data:authRes } = await axios.get(`${baseURL}/auth`,{withCredentials:true});

        if(authRes === 'redirect'){
            navigate('/', {replace:true})
        }else{
            setData(authRes)
            getAuth(true)
        }
      } catch (err) {
          setError(true);
      } finally{
          setloading(false);
      }
    };

    const getModules = async () =>{
        try{

            const {data:moduleRes} =await axios.get(`${baseURL}/modules?user_id=${body}`,{withCredentials:true})
            setData(moduleRes[0])

        }catch(err){
            setError(true);
            navigate('/', {replace:true})
        }finally{
            setloading(false)
        }
    }

    const getLessonData = async () => {
        setloading(true);
        const {lesson} = operation;

        try{
            const {data:lessons} = await axios.post(`${baseURL}/retrievelessons`,{lesson:lesson},{withCredentials:true});

            setDashData(lessons);
        }catch(err){
            setError(true);
        }finally{
            setloading(false)
        }
    }


    const logOut = async() =>{
        try {
            const{status} = await axios.get(`${baseURL}/logout`,{withCredentials:true})
            if(status === 200){
                navigate('/', {replace:true})
            }
        } catch (error) {
            setError(true);
        } finally{
            setloading(false)
        }
    }

    const getQuiz = async() => {
        setData(state => '');
        setError(state => false);
        setloading(state => false);
        try {
            const {data:quiz} = await axios.get(`${baseURL}/retrieve-quiz/${body}`,{withCredentials:true});
            setData(quiz)

            
        } catch (error) {
            setError(true);
        } finally{
            setloading(false);
        }
    }
    

    useEffect(() => {
        if (operation === "countries"){
            getCountries();
        }else if(operation === 'register'){
            register();
        }
        else if (operation === 'reset'){
            setServerErr('');
        }
        else if (operation === 'login'){
            login();
        }
        else if (operation === 'auth'){
            auth();
        }
        else if (operation === 'getModules'){
            getModules();
        }
        else if (operation.operation === 'getLessonsData'){
            getLessonData();
        }
        else if(operation === 'logout'){
            logOut();
        }
        //eslint-disable-next-line
    },[operation])

    useEffect(()=> {
        if (operation === 'getQuiz'){
            getQuiz()
        }
        //eslint-disable-next-line
    },[body])
    
    
    return {data,dashData,error,loading,serverErr};
}

