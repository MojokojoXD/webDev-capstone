import logo from './images/logo.png'
import { Link } from 'react-router-dom'
import Nav from '../navigation/Nav'
import { Outlet } from 'react-router-dom'

export default function Landing(){
    return(
        <section id='landing'>
          <div className="main-landing">
            <Link to='/'>
                <img src={logo} alt='logo' className='logo'/>
            </Link>
            <Nav option={''} params={''}/>
            <section className='landing-outlet'>
                <Outlet/>
            </section>
          </div>
        </section>
    )
}