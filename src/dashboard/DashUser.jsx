// @ts-nocheck
import Nav from "../navigation/Nav";
import { useParams } from "react-router-dom";
import ModuleBar from "../navigation/ModuleBar";
import ModuleBody from "./ModuleBody";
import useAxios from "../customHooks/useAxios";
import { useEffect,useState } from "react";
import Spinner from '../misc/Spinner'

let titles;

export default function DashboardUser() {
  const [operation,setOperation] = useState('getModules')
  const [displayModule, setDisplayModule] = useState({title:'HOME',lesson:''});


//react-router-dom
  const { username, id } = useParams();

//custom hook
  const { data: moduleData,dashData, error, loading } = useAxios(operation, id);


  
  if(operation === 'getModules')titles = deriveTitle(moduleData);
  const modulesNo = deriveModules(dashData);

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



  if (!dashData) return <Spinner/>;
  if (error) return <h2>Something went wrong....Try again</h2>;

  return (
    dashData && <section id="dashboard-user">
    <div className="background"></div>
     <nav>
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
      const lesson_set = new Set();
      const modules_obj = {};
        dataArr.forEach(d => lesson_set.add(d.lesson_name));

        lesson_set.forEach(lesson => {
            modules_obj[lesson] = {
              title:lesson,
              modules: []
            }
          });
          
          dataArr.forEach(d =>{
            modules_obj[d.lesson_name].modules.push(d.module_no)
          })
          
          return modules_obj
        // return dataArr.map(el => {
        //     return{
        //         lesson: el.lesson_name,
        //         module: el.module_no
        //     }
        // })
    }else return [];
}