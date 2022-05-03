// @ts-nocheck
import useAxios from "../customHooks/useAxios";
import { Navigate ,Link} from "react-router-dom";

export default function Dashboard({getAuth}) {
  const { data: auth, error, loading } = useAxios('auth');
  
  if (loading) return <h2>Loading</h2>;
  
  return (
    <div>
      {error && <Navigate to="/login" replace={true} />}
      <Link to={`/dashboard/${auth.fname+' '+ auth.lname}/${auth.user_id}`}>Go to dashboard</Link>
    </div>
  );
}
