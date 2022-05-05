// @ts-nocheck
import useAxios from "../customHooks/useAxios";
import { Navigate ,Link} from "react-router-dom";
import Spinner from '../misc/Spinner'

export default function Dashboard({getAuth}) {
  const { data: auth, error, loading } = useAxios('auth');
  
  if (loading) return <Spinner/>;
  if (error)return <p>Session timeout</p>
  
  return (
    <div style={{display: 'flex',height: '100vh'}}>
      {error && <Navigate to="/login" replace={true} />}
      <Link to={`/dashboard/${auth.fname+' '+ auth.lname}/${auth.user_id}`} style={{margin: 'auto'}}>Go to dashboard</Link>
    </div>
  );
}
