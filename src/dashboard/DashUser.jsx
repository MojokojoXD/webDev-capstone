// @ts-nocheck
import Nav from "../navigation/Nav";
import { useParams, Link } from "react-router-dom";
import logo from "../landingPage/images/logo.png";
import ModuleBar from "../navigation/ModuleBar";
import ModuleBody from "./ModuleBody";
import useAxios from "../customHooks/useAxios";
import { useEffect,useState } from "react";

let titles;

export default function DashboardUser() {
  const [operation,setOperation] = useState('getModules')
  const [displayModule, setDisplayModule] = useState({title:'HOME',lesson:''});


//react-router-dom
  const { username, id } = useParams();

//custom hook
  const { data: moduleData,dashData, error, loading,loading2 } = useAxios(operation, id);


  
  if(operation === 'getModules')titles = deriveTitle(moduleData);
  const modulesNo = deriveModules(dashData,loading2);

  const getPageNo = (value) => {
    setDisplayModule(value);
  }

  useEffect(() => {
      if ( !loading && operation === 'getModules' ){
          setOperation(state => {
              return {
                  operation: 'getLessonsData',
                  lesson: titles 
              }
          })
        }  

  },[loading,operation])



  if (!dashData) return <h2>Loading...</h2>;
  if (error) return <h2>Something went wrong....Try again</h2>;

  
  return (
    dashData && <section id="dashboard-user">
    <div className="background"></div>
     <nav>
        <Link to="/">
            <img src={logo} alt="logo" className="logo" />
        </Link>
        <Nav option={"dashboard"} params={username} />
     </nav>
      <div className="dash-body">

            <ModuleBar lessons={titles} modules={modulesNo} getPageNo={getPageNo} displayModule={displayModule}/> 


            <ModuleBody dashData={dashData} displayModule={displayModule}/>

      
      </div>
    </section>
  );
}

const deriveTitle = (lessonObj) => {
  const titles = Object.keys(lessonObj).filter((key) => {
    return lessonObj[key] === true;
  });

  return titles;
};

const deriveModules = (dataArr) => {
    if(dataArr){
        return dataArr.map(el => {
            return{
                lesson: el.lesson_name,
                module: el.module_no
            }
        })
    }else return [];
}